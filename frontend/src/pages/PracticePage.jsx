import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PracticePage = () => {
  const [questions, setQuestions] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [order, setOrder] = useState('asc');
  const [page, setPage] = useState(1);
  const [limit] = useState(10);
  const [total, setTotal] = useState(0);
  const [attempted, setAttempted] = useState([]);
  const userId = 1; // TODO: Replace with dynamic user ID after auth

  const fetchQuestions = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/questions/all?search=${search}&sort_by=${sortBy}&order=${order}&page=${page}&limit=${limit}`
      );
      setQuestions(res.data.questions);
      setTotal(res.data.total);
    } catch (err) {
      console.error('Failed to fetch questions:', err);
    }
  };

  const fetchProgress = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/progress/${userId}`);
      setAttempted(res.data.all || []);
    } catch (err) {
      console.error('Failed to fetch progress:', err);
    }
  };

  const markAttempted = async (questionId) => {
    if (attempted.includes(questionId)) return;
    try {
      await axios.post(`http://localhost:5000/attempt`, {
        user_id: userId,
        question_id: questionId,
        topic_slug: 'all'
      });
      setAttempted(prev => [...prev, questionId]);
    } catch (err) {
      console.error('Failed to mark question attempted:', err);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, [search, sortBy, order, page]);

  useEffect(() => {
    fetchProgress();
  }, []);

  const totalPages = Math.ceil(total / limit);
  const progressPercent = total ? Math.round((attempted.length / total) * 100) : 0;

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>📈 Your Practice Progress</h2>

      {/* Summary Section */}
      <div style={styles.summary}>
        <span>{attempted.length} of {total} questions completed</span>
        <div style={styles.progressBarContainer}>
          <div style={{ ...styles.progressBarFill, width: `${progressPercent}%` }}>
            <span style={styles.progressText}>{progressPercent}%</span>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div style={styles.controls}>
        <input
          type="text"
          placeholder="🔍 Search question..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          style={styles.input}
        />

        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={styles.select}>
          <option value="id">Sort by ID</option>
          <option value="title">Sort by Title</option>
          <option value="difficulty">Sort by Difficulty</option>
        </select>

        <select value={order} onChange={(e) => setOrder(e.target.value)} style={styles.select}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      {/* Questions Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>ID</th>
            <th style={styles.th}>Title</th>
            <th style={styles.th}>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((q) => (
            <tr key={q.id} style={attempted.includes(q.id) ? styles.attemptedRow : {}}>
              <td style={styles.td}>{q.id}</td>
              <td style={styles.td}>
                <a
                  href={q.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={styles.link}
                  onClick={() => markAttempted(q.id)}
                >
                  {q.title}
                </a>
              </td>
              <td style={{ ...styles.td, color: getColor(q.difficulty) }}>{q.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div style={styles.pagination}>
        <button onClick={() => setPage((p) => Math.max(p - 1, 1))} style={styles.pageBtn}>⬅ Prev</button>
        <span style={{ margin: '0 1rem' }}>Page {page} of {totalPages}</span>
        <button onClick={() => setPage((p) => Math.min(p + 1, totalPages))} style={styles.pageBtn}>Next ➡</button>
      </div>
    </div>
  );
};

// Utility
const getColor = (level) => {
  switch (level) {
    case 'Easy': return '#10b981';
    case 'Medium': return '#f59e0b';
    case 'Hard': return '#ef4444';
    default: return '#dbeafe';
  }
};

const styles = {
  container: {
    width: '100vw',
    minHeight: '100vh',
    overflowX: 'hidden',
    backgroundColor: '#0e0e1a',
    color: '#dbeafe',
    padding: '2rem',
    fontFamily: 'Arial, sans-serif',
    boxSizing: 'border-box',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1rem',
    textAlign: 'center',
    color: '#38bdf8',
  },
  summary: {
    marginBottom: '1.5rem',
    textAlign: 'center',
    fontSize: '1.2rem',
  },
  progressBarContainer: {
    width: '80%',
    height: '20px',
    backgroundColor: '#1e293b',
    borderRadius: '10px',
    margin: '0.5rem auto',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#38bdf8',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'width 0.3s ease',
    borderRadius: '10px',
  },
  progressText: {
    color: '#0f172a',
    fontWeight: 'bold',
    fontSize: '0.9rem',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    marginBottom: '1.5rem',
    gap: '1rem',
    flexWrap: 'wrap',
  },
  input: {
    padding: '0.5rem 1rem',
    borderRadius: '8px',
    border: '1px solid #38bdf8',
    backgroundColor: '#1e293b',
    color: '#dbeafe',
    width: '200px',
  },
  select: {
    padding: '0.5rem',
    borderRadius: '8px',
    backgroundColor: '#1e293b',
    color: '#dbeafe',
    border: '1px solid #38bdf8',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: '#1e293b',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  th: {
    padding: '1rem',
    borderBottom: '1px solid #334155',
    textAlign: 'left',
    backgroundColor: '#0f172a',
  },
  td: {
    padding: '0.75rem 1rem',
    borderBottom: '1px solid #334155',
  },
  attemptedRow: {
    backgroundColor: '#134e4a', // greenish highlight
  },
  link: {
    textDecoration: 'none',
    color: '#38bdf8',
  },
  pagination: {
    marginTop: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '1rem',
  },
  pageBtn: {
    backgroundColor: '#1e293b',
    color: '#dbeafe',
    padding: '0.5rem 1rem',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    cursor: 'pointer',
  },
};

export default PracticePage;
