import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const SortingVisualizer = () => {
  const [array, setArray] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [algorithm, setAlgorithm] = useState("bubble");
  const [isSorting, setIsSorting] = useState(false);
  const stopRequested = useRef(false);
  const navigate = useNavigate();

  useEffect(() => {
    generateArray();
  }, []);

  const generateArray = () => {
    const arr = Array.from({ length: 20 }, () =>
      Math.floor(Math.random() * 100)
    );
    setArray(arr);
    setCurrentIndex(null);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    stopRequested.current = false;
    const arr = [...array];

    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (stopRequested.current) return setIsSorting(false);
        setCurrentIndex(j);
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          setArray([...arr]);
        }
        await new Promise((res) => setTimeout(res, 200));
      }
    }
    setCurrentIndex(null);
    setIsSorting(false);
  };

  const selectionSort = async () => {
    setIsSorting(true);
    stopRequested.current = false;
    const arr = [...array];

    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (stopRequested.current) return setIsSorting(false);
        setCurrentIndex(j);
        if (arr[j] < arr[minIdx]) minIdx = j;
        await new Promise((res) => setTimeout(res, 200));
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
      setArray([...arr]);
    }
    setCurrentIndex(null);
    setIsSorting(false);
  };

  const handleSort = () => {
    if (algorithm === "bubble") bubbleSort();
    else selectionSort();
  };

  const handleStop = () => {
    stopRequested.current = true;
    setCurrentIndex(null);
    setIsSorting(false);
  };

  return (
    <div style={styles.container}>
      {/* Back Button */}
      <button style={styles.backButton} onClick={() => navigate("/visualize")}>
        ⬅ Back
      </button>

      <h1 style={styles.heading}>📦 Sorting Visualizer</h1>
      <p style={styles.description}>
        Sorting is the process of arranging elements in a particular order (ascending or descending). 
        Below you can explore sorting algorithms like Bubble Sort and Selection Sort step-by-step.
      </p>

      {/* Controls */}
      <div style={styles.controls}>
        <select
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value)}
          disabled={isSorting}
          style={styles.select}
        >
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
        </select>

        <button onClick={generateArray} disabled={isSorting} style={styles.button}>
          🔄 New Array
        </button>

        <button onClick={handleSort} disabled={isSorting} style={styles.button}>
          ▶️ Start Sorting
        </button>

        <button onClick={handleStop} disabled={!isSorting} style={{ ...styles.button, backgroundColor: "#ef4444" }}>
          🔴 Stop
        </button>
      </div>

      {/* Array Bars */}
      <div style={styles.arrayContainer}>
        {array.map((value, idx) => (
          <div
            key={idx}
            style={{
              ...styles.bar,
              height: `${value * 3}px`,
              backgroundColor: idx === currentIndex ? "#facc15" : "#3b82f6",
            }}
          >
            {value}
          </div>
        ))}
      </div>

      {/* Info Section */}
      <div style={styles.infoSection}>
        <h2>🧠 Pseudocode</h2>
        <pre style={styles.codeBox}>
          {algorithm === "bubble"
            ? `for i in 0 to n-1:
  for j in 0 to n-i-1:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`
            : `for i in 0 to n-1:
  minIndex = i
  for j in i+1 to n:
    if arr[j] < arr[minIndex]:
      minIndex = j
  swap(arr[i], arr[minIndex])`}
        </pre>

        <div style={styles.complexityBox}>
          <p><strong>Time Complexity:</strong> Best: O(n), Average/Worst: O(n²)</p>
          <p><strong>Space Complexity:</strong> O(1)</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    backgroundColor: "#0f172a",
    color: "#dbeafe",
    padding: "2rem",
    boxSizing: "border-box",
    fontFamily: "sans-serif",
    position: "relative",
  },
  backButton: {
    position: "absolute",
    top: "1rem",
    left: "1rem",
    padding: "0.5rem 1rem",
    backgroundColor: "#1e293b",
    color: "#38bdf8",
    border: "1px solid #38bdf8",
    borderRadius: "6px",
    cursor: "pointer",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.5rem",
    marginTop: "1rem",
    color: "#38bdf8",
  },
  description: {
    textAlign: "center",
    fontSize: "1.2rem",
    marginBottom: "2rem",
    color: "#cbd5e1",
  },
  controls: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2rem",
  },
  select: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#1e293b",
    color: "#dbeafe",
    border: "1px solid #38bdf8",
    borderRadius: "5px",
  },
  button: {
    padding: "0.5rem 1rem",
    fontSize: "1rem",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  arrayContainer: {
    display: "flex",
    alignItems: "end",
    justifyContent: "center",
    height: "300px",
    gap: "5px",
    marginBottom: "2rem",
  },
  bar: {
    width: "20px",
    backgroundColor: "#3b82f6",
    textAlign: "center",
    color: "#fff",
    borderRadius: "4px 4px 0 0",
  },
  infoSection: {
    backgroundColor: "#1e293b",
    padding: "1.5rem",
    borderRadius: "10px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  codeBox: {
    backgroundColor: "#0f172a",
    padding: "1rem",
    color: "#fef9c3",
    borderRadius: "5px",
    marginBottom: "1rem",
    fontSize: "0.95rem",
    overflowX: "auto",
  },
  complexityBox: {
    color: "#dbeafe",
    fontSize: "1rem",
  },
};

export default SortingVisualizer;
