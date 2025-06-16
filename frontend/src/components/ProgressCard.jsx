// src/components/ProgressCard.jsx
import React from 'react';
import { motion } from 'framer-motion';

const ProgressCard = ({ topic, solvedCount, totalCount, percentage }) => {
  return (
    <motion.div
      style={styles.card}
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 120 }}
    >
      <h2 style={styles.title}>{topic.name}</h2>
      <p style={styles.slug}>({topic.slug})</p>
      <p style={styles.solved}>
        ✅ Solved: <strong>{solvedCount}</strong> / {totalCount}
        <span style={styles.percent}> — {percentage}%</span>
      </p>

      <div style={styles.progressContainer}>
        <motion.div
          style={{
            ...styles.progressBar,
            width: `${percentage}%`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
};

const styles = {
  card: {
    backgroundColor: '#1e293b',
    border: '1px solid #334155',
    borderRadius: '12px',
    padding: '1.2rem',
    boxShadow: '0 0 8px rgba(255, 255, 255, 0.05)',
    display: 'flex',
    flexDirection: 'column',
    gap: '0.5rem',
  },
  title: {
    fontSize: '1.2rem',
    color: '#facc15',
  },
  slug: {
    fontSize: '0.85rem',
    color: '#94a3b8',
  },
  solved: {
    fontSize: '1rem',
    color: '#10b981',
  },
  percent: {
    color: '#38bdf8',
    marginLeft: '0.4rem',
  },
  progressContainer: {
    height: '8px',
    backgroundColor: '#334155',
    borderRadius: '10px',
    overflow: 'hidden',
    marginTop: '0.4rem',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#38bdf8',
    borderRadius: '10px',
  },
};

export default ProgressCard;
