import React from "react";
import { useNavigate } from "react-router-dom";

const TimeSpaceVisualizer = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <button style={styles.backButton} onClick={() => navigate("/visualize")}>
          ⟵ Back
        </button>

        <h1 style={styles.heading}>⏳ Time & 🧠 Space Complexity</h1>
        <p style={styles.description}>
          Learn how algorithms are analyzed in terms of their execution time and memory usage using **Asymptotic Notations**.
        </p>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>📘 What is Time Complexity?</h2>
          <p>
            Time complexity is the computational complexity that describes the amount of time it takes to run an algorithm as a function of the length of the input. It helps us predict the execution time of algorithms with increasing input sizes.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>📗 What is Space Complexity?</h2>
          <p>
            Space complexity is the total amount of memory space that the algorithm needs to run completely, including input storage, auxiliary space, and function call stack space.
          </p>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>📊 Common Time Complexities</h2>
          <ul>
            <li><strong>O(1):</strong> Constant Time – e.g., accessing array by index</li>
            <li><strong>O(log n):</strong> Logarithmic Time – e.g., Binary Search</li>
            <li><strong>O(n):</strong> Linear Time – e.g., Linear Search</li>
            <li><strong>O(n log n):</strong> Log-linear Time – e.g., Merge Sort</li>
            <li><strong>O(n²):</strong> Quadratic Time – e.g., Bubble Sort</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>📐 Asymptotic Notations</h2>
          <ul>
            <li><strong>Big-O (O):</strong> Describes the <u>upper bound</u> of the algorithm. Worst-case time complexity.</li>
            <li><strong>Big-Ω (Omega):</strong> Describes the <u>lower bound</u>. Best-case time complexity.</li>
            <li><strong>Big-Θ (Theta):</strong> Describes the <u>tight bound</u>. Average-case time complexity.</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>🧠 Space Complexity Examples</h2>
          <ul>
            <li><strong>O(1):</strong> No extra space used (in-place)</li>
            <li><strong>O(n):</strong> Uses space proportional to input size</li>
          </ul>
        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>📈 Complexity Graph (Visual)</h2>

          <img
            src="https://www.crio.do/blog/content/images/2022/02/BIG-O-COMPLEXITY.png"
            alt="Big-O Notation Graph"
            style={{ width: '100%', maxWidth: '700px', borderRadius: '10px', border: '1px solid #38bdf8' }}
            />

        </section>

        <section style={styles.section}>
          <h2 style={styles.subHeading}>💡 Optimization Tips</h2>
          <ul>
            <li>Use hash tables to reduce time complexity to O(1).</li>
            <li>Choose sorting algorithms based on input size.</li>
            <li>Avoid unnecessary loops and recursion when possible.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    backgroundColor: "#0f172a",
    color: "#f8fafc",
    padding: "2rem 1rem",
    boxSizing: "border-box",
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowX: "hidden",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  backButton: {
    backgroundColor: "#2563eb",
    color: "#ffffff",
    padding: "10px 18px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "1.5rem",
  },
  heading: {
    fontSize: "2.8rem",
    color: "#38bdf8",
    textAlign: "center",
    marginBottom: "0.5rem",
  },
  description: {
    textAlign: "center",
    fontSize: "1.2rem",
    color: "#cbd5e1",
    marginBottom: "2.5rem",
  },
  section: {
    backgroundColor: "#1e293b",
    padding: "1.5rem",
    borderRadius: "12px",
    marginBottom: "2rem",
    boxShadow: "0 0 10px rgba(56, 189, 248, 0.2)",
  },
  subHeading: {
    fontSize: "1.5rem",
    color: "#7dd3fc",
    marginBottom: "1rem",
  },
  image: {
    width: "100%",
    maxWidth: "700px",
    display: "block",
    margin: "20px auto 0",
    borderRadius: "8px",
    border: "1px solid #38bdf8",
  },
};

export default TimeSpaceVisualizer;
