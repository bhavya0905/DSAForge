import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TopicsPage = () => {
  const [topics, setTopics] = useState([]);
  const [progress, setProgress] = useState({});
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  // ✅ Fetch topics
  useEffect(() => {
    fetch('http://localhost:5000/api/topics')
      .then(res => res.json())
      .then(data => setTopics(data))
      .catch(err => console.error('❌ Failed to fetch topics', err));
  }, []);

  // ✅ Fetch user progress
  useEffect(() => {
    if (!user) return;

    fetch(`http://localhost:5000/api/progress/${user.id}`)
      .then(res => res.json())
      .then(data => {
        const progressMap = {};
        data.forEach(item => {
          progressMap[item.topic_slug] = item.solved_count;
        });
        setProgress(progressMap);
      })
      .catch(err => console.error('❌ Failed to fetch progress', err));
  }, [user]);

  // ✅ Loading fallback
  if (!topics.length) {
    return (
      <div style={{ backgroundColor: '#0f172a', color: '#dbeafe', minHeight: '100vh', padding: '2rem' }}>
        <p>⏳ Loading topics...</p>
      </div>
    );
  }

  return (
    <div style={{ backgroundColor: '#0f172a', color: '#dbeafe', minHeight: '100vh', padding: '2rem' }}>
      <h1>📚 DSA Topics</h1>
      <p>Click a topic to dive into explanations, visuals, and practice!</p>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginTop: '2rem'
        }}
      >
        {topics.map(topic => (
          <div
            key={topic.id}
            role="button"
            tabIndex={0}
            onClick={() => navigate(`/topics/${topic.slug}`)}
            onKeyDown={(e) => e.key === 'Enter' && navigate(`/topics/${topic.slug}`)}
            style={{
              backgroundColor: '#1e293b',
              padding: '1.5rem',
              borderRadius: '8px',
              cursor: 'pointer',
              border: '1px solid #38bdf8',
              transition: 'transform 0.3s, border-color 0.3s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.borderColor = '#0ea5e9';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.borderColor = '#38bdf8';
            }}
          >
            <h2>{topic.name}</h2>
            <p style={{ fontSize: '0.9rem', color: '#94a3b8' }}>{topic.description}</p>

            {user && (
              <p style={{ marginTop: '0.8rem', color: '#7dd3fc', fontWeight: 'bold' }}>
                ✅ Solved: {progress[topic.slug] || 0} / 50
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopicsPage;
