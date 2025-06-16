import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntroDSA = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>📌 Introduction to DSA</h1>

        <div style={styles.definitionBox}>
          <strong>What is DSA?</strong><br />
          Data Structures and Algorithms (DSA) is the backbone of efficient programming. It involves organizing data and using step-by-step methods to solve problems effectively.
        </div>

        <div style={styles.videoWrapper}>
          <iframe
            src="https://www.youtube.com/embed/qj7pbhlo8VA?si=UUoGV--lb_ebUa86"
            title="Introduction to DSA - Explained"
            style={styles.video}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        </div>

        <div style={styles.section}>
          <h2>📌 Pseudocode</h2>
          <pre style={styles.code}>
{`// Basic DSA Workflow
Start
|
|--> Choose Data Structure
|--> Apply Algorithm (Insert, Delete, Search, Sort)
|--> Analyze Time & Space Complexity
End`}
          </pre>
        </div>

        <div style={styles.section}>
          <h2>📌 Algorithm (Conceptual Steps)</h2>
          <ol>
            <li>Understand the problem and its constraints.</li>
            <li>Select the most efficient data structure.</li>
            <li>Design an algorithm to solve the problem.</li>
            <li>Analyze and optimize time and space complexity.</li>
          </ol>
        </div>

        <div style={styles.section}>
          <h2>📚 Real-Life Applications</h2>
          <ul>
            <li>Search Engines (Google, Bing)</li>
            <li>Social Media Feed Sorting</li>
            <li>Route Optimization (Google Maps)</li>
            <li>Recommendation Systems (Netflix, Amazon)</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>💡 Why Learn DSA?</h2>
          <ul>
            <li>It improves problem-solving skills.</li>
            <li>Crucial for cracking coding interviews.</li>
            <li>Builds the foundation for competitive programming.</li>
            <li>Helps write optimized and scalable code.</li>
          </ul>
        </div>

        <div style={styles.section}>
          <h2>🧠 DSA Roadmap</h2>
          <img
            src="https://media2.dev.to/dynamic/image/width=1600,height=900,fit=cover,gravity=auto,format=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fdvs1m6qt8035a4wbr54j.png"
            alt="DSA Roadmap"
            style={styles.roadmapImage}
          />
        </div>

        <div style={styles.section}>
          <h2>🚀 Getting Started Checklist</h2>
          <ul>
            <li>✅ Learn Arrays</li>
            <li>✅ Understand Time & Space Complexity</li>
            <li>🔲 Start Sorting Algorithms</li>
            <li>🔲 Learn Recursion</li>
          </ul>
        </div>

        <div style={styles.section}>
          <p>
            Ready to begin? 👉{' '}
            <span
              style={styles.link}
              onClick={() => navigate('/visualize/arrays')}
            >
              Start with Arrays
            </span>
          </p>
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
    alignItems: 'flex-start',
    padding: '2rem',
    boxSizing: 'border-box',
  },
  container: {
    width: '100%',
    maxWidth: '960px',
  },
  heading: {
    fontSize: '2.5rem',
    marginBottom: '1.5rem',
    color: '#38bdf8',
    textAlign: 'center',
  },
  definitionBox: {
    backgroundColor: '#1e3a8a',
    padding: '1rem',
    borderRadius: '10px',
    marginBottom: '2rem',
    color: '#f1f5f9',
    fontSize: '1rem',
    lineHeight: '1.6',
  },
  videoWrapper: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,
    overflow: 'hidden',
    borderRadius: '12px',
    marginBottom: '2rem',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    border: 'none',
  },
  section: {
    marginTop: '2rem',
  },
  code: {
    backgroundColor: '#1e293b',
    padding: '1rem',
    borderRadius: '8px',
    fontSize: '1rem',
    overflowX: 'auto',
    lineHeight: 1.6,
    whiteSpace: 'pre-wrap',
  },
  roadmapImage: {
    width: '100%',
    borderRadius: '12px',
    marginTop: '1rem',
  },
  link: {
    color: '#38bdf8',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default IntroDSA;
