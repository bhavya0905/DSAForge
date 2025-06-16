import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const topics = [
  { slug: 'intro', name: '📘 Introduction to DSA' },
  { slug: 'array', name: '🧱 Arrays' },
  { slug: 'time-complexity', name: '⏱️ Time & Space Complexity' },
  { slug: 'searching', name: '🔎 Searching' },
  { slug: 'sorting', name: '🧮 Sorting' },
  { slug: 'basic-sorting', name: '📊 Basic Sorting Techniques' },
  { slug: 'advance', name: '🚀 Advance Sorting' },
  { slug: 'char-arrays-strings', name: '🔤 Char, Arrays & Strings' },
  { slug: 'basic-maths-pointers', name: '➕ Basic Maths & Pointers' },
  { slug: 'recursion', name: '🔁 Recursion' },
  { slug: 'backtracking-dnc', name: '🧠 Backtracking & Divide & Conquer' },
  { slug: 'linked-list', name: '🔗Linked Lists' },
  { slug: 'stack', name: '📚 Stack' }, 
  { slug: 'queue', name: '📥 Queue' }, 
  { slug: 'tree', name: '🌳 Generic & Binary Trees' },
  { slug: 'bst', name: '🌲 Binary Search Tree' },
  { slug: 'heap', name: '📦 Heaps' }, 
  { slug: 'maps-tries', name: '🗺️ Maps & Tries' },
  { slug: 'dynamic-programming', name: '📐 Dynamic Programming' },
  { slug: 'graph', name: '🧠 Graphs' },




  

  

];

const VisualizePage = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState('');

  // 🔍 Filter topics based on user search input
  const filteredTopics = topics.filter(topic =>
    topic.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📊 Visualize DSA Concepts</h1>
        <p style={styles.description}>
          Select a topic to watch animations, read pseudocode, and understand core logic visually.
        </p>

        {/* 🔍 Search Input */}
        <input
          type="text"
          placeholder="Search a topic..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.grid}>
          {filteredTopics.map((topic) => (
            <div
              key={topic.slug}
              style={styles.card}
              onClick={() => navigate(`/visualize/${topic.slug}`)}
              title={`Click to visualize ${topic.name.replace(/^[^\w]+/, '')}`}
            >
              {topic.name}
            </div>
          ))}
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
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  container: {
    width: '100%',
    maxWidth: '1200px',
  },
  heading: {
    fontSize: '2.8rem',
    textAlign: 'center',
    color: '#38bdf8',
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
    fontSize: '1.25rem',
    marginBottom: '2rem',
    color: '#cbd5e1',
  },
  searchInput: {
    padding: '12px',
    width: '100%',
    maxWidth: '400px',
    margin: '0 auto 2rem auto',
    display: 'block',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #38bdf8',
    backgroundColor: '#1e293b',
    color: '#dbeafe',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
  },
  card: {
    backgroundColor: '#1e293b',
    padding: '1.7rem',
    borderRadius: '12px',
    cursor: 'pointer',
    textAlign: 'center',
    fontSize: '1.1rem',
    fontWeight: '500',
    border: '1px solid #38bdf8',
    transition: 'all 0.3s ease',
    boxShadow: '0 0 10px rgba(56, 189, 248, 0.2)',
    transform: 'scale(1)',
  },
};

export default VisualizePage;
