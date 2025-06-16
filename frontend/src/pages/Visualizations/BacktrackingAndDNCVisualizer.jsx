// BacktrackingAndDNCVisualizer.jsx
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const BacktrackingAndDNCVisualizer = () => {
  const navigate = useNavigate();
  const [view, setView] = useState("nqueen");
  const [darkMode, setDarkMode] = useState(true);

  // ----- N-Queens State -----
  const [boardSize, setBoardSize] = useState(4);
  const [solutions, setSolutions] = useState([]);
  const [current, setCurrent] = useState(0);

  // ----- Merge Sort State -----
  const [mergeArray, setMergeArray] = useState([38, 27, 43, 3, 9, 82, 10]);
  const [mergeSteps, setMergeSteps] = useState([]);
  const [mergeIndex, setMergeIndex] = useState(0);

  // ----- N-Queens Logic -----
  useEffect(() => {
    if (view !== "nqueen") return;
    const res = [];
    const board = Array.from({ length: boardSize }, () => Array(boardSize).fill("."));

    const isSafe = (row, col) => {
      for (let i = 0; i < row; i++) {
        if (board[i][col] === "Q") return false;
        if (col - (row - i) >= 0 && board[i][col - (row - i)] === "Q") return false;
        if (col + (row - i) < boardSize && board[i][col + (row - i)] === "Q") return false;
      }
      return true;
    };

    const solve = (row) => {
      if (row === boardSize) {
        res.push(board.map((r) => [...r]));
        return;
      }
      for (let col = 0; col < boardSize; col++) {
        if (isSafe(row, col)) {
          board[row][col] = "Q";
          solve(row + 1);
          board[row][col] = ".";
        }
      }
    };

    solve(0);
    setSolutions(res);
    setCurrent(0);
  }, [boardSize, view]);

  useEffect(() => {
    if (view !== "nqueen" || solutions.length === 0) return;
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % solutions.length);
    }, 1500);
    return () => clearInterval(interval);
  }, [solutions, view]);

  // ----- Merge Sort Logic -----
  useEffect(() => {
    if (view !== "merge") return;
    const steps = [];

    const mergeSort = (arr) => {
      if (arr.length <= 1) return arr;
      const mid = Math.floor(arr.length / 2);
      const left = mergeSort(arr.slice(0, mid));
      const right = mergeSort(arr.slice(mid));
      return merge(left, right);
    };

    const merge = (left, right) => {
      let result = [], i = 0, j = 0;
      while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
          result.push(left[i++]);
        } else {
          result.push(right[j++]);
        }
        steps.push([...result, ...left.slice(i), ...right.slice(j)]);
      }
      result = result.concat(left.slice(i)).concat(right.slice(j));
      steps.push([...result]);
      return result;
    };

    mergeSort([...mergeArray]);
    setMergeSteps(steps);
    setMergeIndex(0);
  }, [mergeArray, view]);

  useEffect(() => {
    if (view !== "merge" || mergeSteps.length === 0) return;
    const interval = setInterval(() => {
      setMergeIndex((prev) => (prev + 1 < mergeSteps.length ? prev + 1 : prev));
    }, 1500);
    return () => clearInterval(interval);
  }, [mergeSteps, view]);

  const bgColor = darkMode ? "#0a0f2c" : "#f9fafb";
  const textColor = darkMode ? "white" : "#111827";

  return (
    <div style={{ ...styles.container, backgroundColor: bgColor, color: textColor }}>
      <div style={styles.topBar}>
        <button onClick={() => navigate(-1)} style={styles.navButton}>⬅ Back</button>
        <h1 style={styles.title}>Backtracking & D&C Visualizer</h1>
        <button onClick={() => setDarkMode(!darkMode)} style={styles.navButton}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div style={styles.buttonGroup}>
        <button onClick={() => setView("nqueen")} style={styles.button}>
          N-Queens (Backtracking)
        </button>
        <button onClick={() => setView("merge")} style={styles.button}>
          Merge Sort (D&C)
        </button>
      </div>

      {view === "nqueen" && (
        <div style={styles.section}>
          <label>
            Board Size:
            <input
              type="number"
              min="4"
              max="8"
              value={boardSize}
              onChange={(e) => setBoardSize(Number(e.target.value))}
              style={styles.input}
            />
          </label>
          <div
            style={{
              ...styles.board,
              gridTemplateColumns: `repeat(${boardSize}, 50px)`
            }}
          >
            {solutions.length > 0 &&
              solutions[current].map((row, i) =>
                row.map((cell, j) => (
                  <motion.div
                    key={`${i}-${j}`}
                    style={{
                      ...styles.cell,
                      backgroundColor: cell === "Q" ? "#3f51b5" : (darkMode ? "#1c1f3f" : "#e2e8f0"),
                      color: darkMode ? "white" : "#111827",
                    }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {cell === "Q" ? "♛" : ""}
                  </motion.div>
                ))
              )}
          </div>
        </div>
      )}

      {view === "merge" && (
        <div style={styles.section}>
          <div style={styles.arrayContainer}>
            {mergeSteps.length > 0 &&
              mergeSteps[mergeIndex].map((num, i) => (
                <motion.div
                  key={i}
                  style={{
                    ...styles.arrayBox,
                    backgroundColor: darkMode ? "#39418a" : "#cbd5e1",
                    color: darkMode ? "white" : "#111827",
                  }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {num}
                </motion.div>
              ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    padding: "1rem",
    fontFamily: "sans-serif",
    boxSizing: "border-box",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "1rem",
  },
  navButton: {
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "0.5rem 1rem",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  title: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "center",
    gap: "1rem",
    marginBottom: "1.5rem",
    flexWrap: "wrap",
  },
  button: {
    backgroundColor: "#3f51b5",
    color: "white",
    padding: "0.5rem 1.2rem",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  input: {
    marginLeft: "0.5rem",
    padding: "0.3rem",
    fontSize: "1rem",
    borderRadius: "4px",
    border: "1px solid #3f51b5",
    backgroundColor: "#1c1f3f",
    color: "white",
  },
  board: {
    display: "grid",
    gap: "4px",
    marginTop: "1rem",
    justifyContent: "center",
  },
  cell: {
    width: "50px",
    height: "50px",
    border: "1px solid #39418a",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  section: {
    marginTop: "2rem",
  },
  arrayContainer: {
    display: "flex",
    justifyContent: "center",
    marginTop: "1rem",
    gap: "10px",
    flexWrap: "wrap",
  },
  arrayBox: {
    width: "50px",
    height: "50px",
    borderRadius: "6px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "1.2rem",
    fontWeight: "bold",
  },
};

export default BacktrackingAndDNCVisualizer;
