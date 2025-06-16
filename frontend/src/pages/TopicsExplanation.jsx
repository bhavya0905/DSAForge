import React, { useEffect, useState } from "react";
import axios from "axios";

const TopicsExplanation = () => {
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/topics");
        setTopics(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching topics:", error);
        setLoading(false);
      }
    };

    fetchTopics();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📘 Topics Explanation</h1>
        {loading ? (
          <p style={styles.loading}>Loading topics...</p>
        ) : (
          topics.map((topic) => (
            <div key={topic.id} style={styles.card}>
              <h2 style={styles.topicTitle}>{topic.name}</h2>
              <p><strong>🧾 Definition:</strong> {topic.definition}</p>
              <p><strong>💬 Discussion:</strong> {topic.discussion}</p>
              <p><strong>🧪 Example:</strong> {topic.example}</p>
              <p><strong>🧱 Types:</strong> {topic.types}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    width: '100vw',
    minHeight: '100vh',
    backgroundColor: '#0e0e1a',
    overflowX: 'hidden',
    boxSizing: 'border-box',
  },
  container: {
    padding: "2rem",
    maxWidth: "1000px",
    margin: "0 auto",
    fontFamily: "Arial, sans-serif",
    color: "#dbeafe",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginBottom: "2rem",
    color: "#7dd3fc",
  },
  loading: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#93c5fd",
  },
  card: {
    backgroundColor: "#1e293b",
    border: "1px solid #38bdf8",
    borderRadius: "12px",
    padding: "1.5rem",
    marginBottom: "2rem",
    boxShadow: "0 0 10px rgba(56, 189, 248, 0.2)",
  },
  topicTitle: {
    fontSize: "1.8rem",
    marginBottom: "1rem",
    color: "#bae6fd",
  },
};

export default TopicsExplanation;
