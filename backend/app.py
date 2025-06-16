from flask import Flask, request, jsonify
from flask_cors import CORS
import mysql.connector
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
CORS(app)

# ✅ MySQL DB Config
db_config = {
    'host': 'localhost',
    'port': 3307,
    'user': 'root',
    'password': 'root123',
    'database': 'dsa_platform'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

@app.route('/')
def home():
    return "✅ Backend Running Successfully!"

# ✅ Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        if cursor.fetchone():
            return jsonify({"success": False, "message": "User already exists"}), 409
        hashed_password = generate_password_hash(password)
        username = email.split('@')[0]
        cursor.execute("INSERT INTO users (username, email, password) VALUES (%s, %s, %s)", (username, email, hashed_password))
        conn.commit()
        return jsonify({"success": True, "message": "Signup successful"}), 201
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    if not email or not password:
        return jsonify({"success": False, "message": "Email and password required"}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        if user and check_password_hash(user['password'], password):
            return jsonify({
                "success": True,
                "message": "Login successful",
                "user": {
                    "id": user['id'],
                    "username": user['username'],
                    "email": user['email']
                }
            })
        else:
            return jsonify({"success": False, "message": "Invalid credentials"}), 401
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Get All Questions with Filters
@app.route('/questions/all', methods=['GET'])
def get_all_questions():
    search = request.args.get('search', '').strip()
    sort_by = request.args.get('sort_by', 'id')
    order = request.args.get('order', 'asc')
    page = int(request.args.get('page', 1))
    limit = int(request.args.get('limit', 10))
    offset = (page - 1) * limit
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        query = "SELECT id, title, difficulty, link FROM questions WHERE 1=1"
        params = []
        if search:
            query += " AND title LIKE %s"
            params.append(f"%{search}%")
        count_query = f"SELECT COUNT(*) as total FROM ({query}) AS sub"
        cursor.execute(count_query, params)
        total = cursor.fetchone()['total']
        if sort_by not in ['id', 'title', 'difficulty']:
            sort_by = 'id'
        if order.lower() not in ['asc', 'desc']:
            order = 'asc'
        query += f" ORDER BY {sort_by} {order} LIMIT %s OFFSET %s"
        params += [limit, offset]
        cursor.execute(query, params)
        questions = cursor.fetchall()
        return jsonify({
            "questions": questions,
            "total": total,
            "page": page,
            "limit": limit
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Get All Topics
@app.route('/api/topics', methods=['GET'])
def get_all_topics():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM topics")
        topics = cursor.fetchall()
        return jsonify(topics)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route('/topics', methods=['GET'])
def alias_topics():
    return get_all_topics()

# ✅ Get Questions by Topic Slug
@app.route('/questions/<topic_slug>', methods=['GET'])
def get_questions_by_topic(topic_slug):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT id, title, difficulty, link FROM questions WHERE topic_slug = %s", (topic_slug,))
        questions = cursor.fetchall()
        return jsonify(questions)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Add/Update Explanation
@app.route('/explanation/<topic_slug>', methods=['POST'])
def add_explanation(topic_slug):
    data = request.get_json()
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO explanations (topic_slug, definition, discussion, example, types, visual)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
                definition = VALUES(definition),
                discussion = VALUES(discussion),
                example = VALUES(example),
                types = VALUES(types),
                visual = VALUES(visual)
        """, (
            topic_slug,
            data.get('definition'),
            data.get('discussion'),
            data.get('example'),
            data.get('types'),
            data.get('visual')
        ))
        conn.commit()
        return jsonify({"success": True, "message": "Explanation saved!"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ User Stats
@app.route("/user/stats/<int:user_id>", methods=["GET"])
def get_user_stats(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT COUNT(*) AS totalSolved FROM user_progress WHERE user_id = %s AND is_completed = 1", (user_id,))
        totalSolved = cursor.fetchone()['totalSolved']
        cursor.execute("SELECT COUNT(*) AS totalBookmarked FROM bookmarks WHERE user_id = %s", (user_id,))
        totalBookmarked = cursor.fetchone()['totalBookmarked']
        cursor.execute("""
            SELECT COUNT(*) AS hardSolved 
            FROM user_progress p
            JOIN questions q ON p.question_id = q.id
            WHERE p.user_id = %s AND q.difficulty = 'Hard' AND p.is_completed = 1
        """, (user_id,))
        hardSolved = cursor.fetchone()['hardSolved']
        avgTime = 15
        return jsonify({
            "totalSolved": totalSolved,
            "totalBookmarked": totalBookmarked,
            "hardSolved": hardSolved,
            "avgTime": avgTime
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Leaderboard
@app.route("/leaderboard", methods=["GET"])
def leaderboard():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT u.id, u.username, COUNT(p.id) AS totalSolved
            FROM users u
            LEFT JOIN user_progress p ON u.id = p.user_id AND p.is_completed = 1
            GROUP BY u.id
            ORDER BY totalSolved DESC
            LIMIT 50
        """)
        results = cursor.fetchall()
        return jsonify(results)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Update/Add Progress
@app.route("/user/progress", methods=["POST"])
def update_progress():
    data = request.get_json()
    user_id = data.get("user_id")
    topic_slug = data.get("topic_slug")
    question_id = data.get("question_id")
    if not user_id or not topic_slug or not question_id:
        return jsonify({"error": "Missing fields"}), 400
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO user_progress (user_id, topic_slug, question_id, is_completed, solved_at)
            VALUES (%s, %s, %s, 1, %s)
            ON DUPLICATE KEY UPDATE is_completed = 1, solved_at = VALUES(solved_at)
        """, (user_id, topic_slug, question_id, datetime.now()))
        conn.commit()
        return jsonify({"success": True, "message": "Progress updated!"})
    except Exception as e:
        return jsonify({"success": False, "message": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Get Progress per Topic
@app.route("/api/progress/<int:user_id>", methods=["GET"])
def get_user_progress(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT topic_slug, COUNT(*) AS solved_count
            FROM user_progress
            WHERE user_id = %s AND is_completed = 1
            GROUP BY topic_slug
        """, (user_id,))
        progress = cursor.fetchall()
        return jsonify(progress)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Get user profile
@app.route("/user/profile/<int:user_id>", methods=["GET"])
def get_profile(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("SELECT * FROM user_profiles WHERE user_id = %s", (user_id,))
        result = cursor.fetchone()
        return jsonify(result or {})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Save user profile
@app.route("/user/profile/<int:user_id>", methods=["POST"])
def save_profile(user_id):
    data = request.json
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        query = """
            INSERT INTO user_profiles (user_id, name, gender, location, birthday, summary, website_links, github, linkedin, twitter, experience, education, skills)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            ON DUPLICATE KEY UPDATE
            name=%s, gender=%s, location=%s, birthday=%s, summary=%s, website_links=%s, github=%s, linkedin=%s, twitter=%s, experience=%s, education=%s, skills=%s
        """
        values = (
            user_id,
            data.get("name", ""), data.get("gender", ""), data.get("location", ""), data.get("birthday", ""),
            data.get("summary", ""), data.get("website_links", ""), data.get("github", ""), data.get("linkedin", ""),
            data.get("twitter", ""), data.get("experience", ""), data.get("education", ""), data.get("skills", ""),
            data.get("name", ""), data.get("gender", ""), data.get("location", ""), data.get("birthday", ""),
            data.get("summary", ""), data.get("website_links", ""), data.get("github", ""), data.get("linkedin", ""),
            data.get("twitter", ""), data.get("experience", ""), data.get("education", ""), data.get("skills", "")
        )
        cursor.execute(query, values)
        conn.commit()
        return jsonify({"message": "Profile saved successfully."})
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Attempt Tracking
@app.route("/attempt", methods=["POST"])
def attempt_question():
    data = request.get_json()
    user_id = data.get("user_id")
    question_id = data.get("question_id")
    topic_slug = data.get("topic_slug")
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO progress (user_id, question_id, topic_slug)
            VALUES (%s, %s, %s)
            ON DUPLICATE KEY UPDATE topic_slug = VALUES(topic_slug)
        """, (user_id, question_id, topic_slug))
        conn.commit()
        return jsonify({"message": "Attempt recorded"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

@app.route("/progress/<int:user_id>", methods=["GET"])
def get_attempted_questions(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute(
            "SELECT question_id, topic_slug FROM progress WHERE user_id = %s",
            (user_id,)
        )
        data = cursor.fetchall()
        progress = {}
        for row in data:
            topic = row["topic_slug"]
            qid = row["question_id"]
            if topic not in progress:
                progress[topic] = []
            progress[topic].append(qid)
        return jsonify(progress)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Count questions per topic
@app.route('/api/questions/count-by-topic', methods=['GET'])
def count_questions_by_topic():
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)
        cursor.execute("""
            SELECT topic_slug, COUNT(*) as total
            FROM questions
            GROUP BY topic_slug
        """)
        data = cursor.fetchall()
        count_dict = {row['topic_slug']: row['total'] for row in data}
        return jsonify(count_dict)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ NEW: Topic-wise completed and attempted question count
@app.route("/api/user/<int:user_id>/progress", methods=["GET"])
def get_full_user_progress(user_id):
    try:
        conn = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute("""
            SELECT topic_slug, COUNT(*) AS completed
            FROM user_progress
            WHERE user_id = %s AND is_completed = 1
            GROUP BY topic_slug
        """, (user_id,))
        completed = {row['topic_slug']: row['completed'] for row in cursor.fetchall()}

        cursor.execute("""
            SELECT topic_slug, COUNT(*) AS attempted
            FROM progress
            WHERE user_id = %s
            GROUP BY topic_slug
        """, (user_id,))
        attempted = {row['topic_slug']: row['attempted'] for row in cursor.fetchall()}

        all_topics = set(completed.keys()) | set(attempted.keys())
        progress_summary = []
        for topic in all_topics:
            progress_summary.append({
                "topic_slug": topic,
                "completed": completed.get(topic, 0),
                "attempted": attempted.get(topic, 0)
            })

        return jsonify(progress_summary)
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()

# ✅ Run App
if __name__ == '__main__':
    app.run(debug=True, port=5000)
