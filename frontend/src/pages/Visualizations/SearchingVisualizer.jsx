import React, { useState } from "react";

const SearchingVisualizer = () => {
  const [algorithm, setAlgorithm] = useState("linear");
  const [array, setArray] = useState([3, 8, 12, 18, 24, 31, 42]);
  const [target, setTarget] = useState(18);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [foundIndex, setFoundIndex] = useState(null);
  const [isSearching, setIsSearching] = useState(false);

  const resetSearch = () => {
    setCurrentIndex(null);
    setFoundIndex(null);
    setIsSearching(false);
  };

  const handleSearch = async () => {
    resetSearch();
    setIsSearching(true);
    if (algorithm === "linear") {
      for (let i = 0; i < array.length; i++) {
        setCurrentIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (array[i] === target) {
          setFoundIndex(i);
          break;
        }
      }
    } else {
      let left = 0,
        right = array.length - 1;
      while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        setCurrentIndex(mid);
        await new Promise((resolve) => setTimeout(resolve, 700));
        if (array[mid] === target) {
          setFoundIndex(mid);
          break;
        } else if (array[mid] < target) {
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
    }
    setIsSearching(false);
  };

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.heading}>🔍 Searching Visualizer</h1>

        {/* Toggle Buttons */}
        <div style={styles.toggle}>
          <button
            onClick={() => setAlgorithm("linear")}
            style={{
              ...styles.toggleBtn,
              backgroundColor: algorithm === "linear" ? "#38bdf8" : "#1e293b",
            }}
          >
            Linear Search
          </button>
          <button
            onClick={() => setAlgorithm("binary")}
            style={{
              ...styles.toggleBtn,
              backgroundColor: algorithm === "binary" ? "#38bdf8" : "#1e293b",
            }}
          >
            Binary Search
          </button>
        </div>

        {/* Array */}
        <div style={styles.arrayBox}>
          {array.map((num, index) => (
            <div
              key={index}
              style={{
                ...styles.box,
                backgroundColor:
                  index === foundIndex
                    ? "#16a34a"
                    : index === currentIndex
                    ? "#facc15"
                    : "#1e293b",
              }}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Controls */}
        <div style={styles.inputRow}>
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(Number(e.target.value))}
            style={styles.input}
            disabled={isSearching}
          />
          <button style={styles.searchBtn} onClick={handleSearch} disabled={isSearching}>
            Start Search
          </button>
        </div>

        {/* Pseudocode + Complexity */}
        <div style={styles.infoBox}>
          <h3>Pseudocode</h3>
          <pre style={styles.code}>
            {algorithm === "linear"
              ? `for i in 0 to n-1:\n  if arr[i] == target:\n    return i`
              : `low = 0, high = n-1\nwhile low <= high:\n  mid = (low + high) / 2\n  if arr[mid] == target:\n    return mid\n  else if arr[mid] < target:\n    low = mid + 1\n  else:\n    high = mid - 1`}
          </pre>
          <h4>Time Complexity</h4>
          <p>
            {algorithm === "linear"
              ? "Best: O(1), Avg/Worst: O(n)"
              : "Best: O(1), Avg/Worst: O(log n)"}
          </p>
          <h4>Space Complexity</h4>
          <p>O(1)</p>
        </div>

        {/* Info */}
        <div style={styles.theory}>
          <h2>About Searching</h2>
          <p>
            Searching is the process of locating a target value within a dataset.
            Common techniques include:
          </p>
          <ul>
            <li><strong>Linear Search</strong>: Check each element sequentially.</li>
            <li><strong>Binary Search</strong>: Divide and conquer. Efficient on sorted arrays.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

const styles = {
  page: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0f172a",
    color: "#dbeafe",
    padding: "2rem",
    boxSizing: "border-box",
  },
  container: {
    width: "100%",
    maxWidth: "1300px",
  },
  heading: {
    textAlign: "center",
    fontSize: "2.7rem",
    color: "#38bdf8",
    marginBottom: "1.5rem",
  },
  toggle: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
  },
  toggleBtn: {
    padding: "0.6rem 1.5rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #38bdf8",
    color: "#fff",
    cursor: "pointer",
    transition: "0.3s",
  },
  arrayBox: {
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    gap: "1rem",
    marginBottom: "2rem",
  },
  box: {
    width: "60px",
    height: "60px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    backgroundColor: "#1e293b",
    border: "2px solid #38bdf8",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "0.3s",
  },
  inputRow: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "2rem",
  },
  input: {
    padding: "0.5rem",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #38bdf8",
    width: "100px",
  },
  searchBtn: {
    padding: "0.5rem 1.2rem",
    fontSize: "1rem",
    borderRadius: "8px",
    backgroundColor: "#38bdf8",
    border: "none",
    color: "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  },
  infoBox: {
    backgroundColor: "#1e293b",
    padding: "1rem",
    borderRadius: "10px",
    marginBottom: "2rem",
  },
  code: {
    backgroundColor: "#0f172a",
    padding: "1rem",
    borderRadius: "8px",
    color: "#facc15",
    fontFamily: "monospace",
    fontSize: "0.9rem",
    marginBottom: "1rem",
    whiteSpace: "pre-line",
  },
  theory: {
    backgroundColor: "#1e293b",
    padding: "1.5rem",
    borderRadius: "10px",
  },
};

export default SearchingVisualizer;
