import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const GenericAndBinaryTreeVisualizer = () => {
  const navigate = useNavigate();
  const [treeType, setTreeType] = useState('Generic Tree');

  const handleTreeTypeChange = (e) => {
    setTreeType(e.target.value);
  };

  return (
    <div style={styles.page}>
      <div style={styles.header}>
        <button onClick={() => navigate('/visualize')} style={styles.backBtn}>
          ← Back
        </button>
        <h1 style={styles.heading}>
          {treeType === 'Generic Tree' ? '🌳 Generic Tree Visualizer' : '🌲 Binary Tree Visualizer'}
        </h1>
        <select value={treeType} onChange={handleTreeTypeChange} style={styles.dropdown}>
          <option>Generic Tree</option>
          <option>Binary Tree</option>
        </select>
      </div>

      <div style={styles.operationSection}>
        <h2 style={styles.operationTitle}>{treeType} Operations</h2>
        <div style={styles.operationsGrid}>
          <div style={styles.card}>➕ Add Node / Child</div>
          <div style={styles.card}>🧭 Traverse: DFS / BFS</div>
          <div style={styles.card}>❌ Delete Subtree</div>
          <div style={styles.card}>🌐 Visualize Tree</div>
        </div>
      </div>

      <div style={styles.visualSection}>
        <h2 style={styles.visualTitle}>🧬 Tree Visualization</h2>
        <div style={styles.visualBox}>
          <p style={styles.placeholderText}>Tree diagram will be rendered here based on operations.</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#0f172a',
    color: '#dbeafe',
    padding: '2rem',
    boxSizing: 'border-box',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem',
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#38bdf8',
    textAlign: 'center',
    flexGrow: 1,
  },
  backBtn: {
    backgroundColor: '#1e293b',
    color: '#fff',
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginRight: '1rem',
    fontSize: '1rem',
  },
  dropdown: {
    backgroundColor: '#1e293b',
    color: '#dbeafe',
    padding: '10px',
    border: '1px solid #38bdf8',
    borderRadius: '8px',
    fontSize: '1rem',
  },
  operationSection: {
    marginBottom: '3rem',
  },
  operationTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  operationsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '1.5rem',
    borderRadius: '12px',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    border: '1px solid #38bdf8',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
  visualSection: {
    marginTop: '2rem',
  },
  visualTitle: {
    fontSize: '1.5rem',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  visualBox: {
    minHeight: '300px',
    backgroundColor: '#1e293b',
    borderRadius: '12px',
    border: '1px dashed #38bdf8',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#94a3b8',
    fontSize: '1rem',
  },
};

export default GenericAndBinaryTreeVisualizer;
