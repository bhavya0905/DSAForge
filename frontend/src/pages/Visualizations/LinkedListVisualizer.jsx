import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Moon, Sun, ArrowLeft } from "lucide-react";

const LinkedListVisualizer = () => {
  const [type, setType] = useState("singly");
  const [list, setList] = useState([]);
  const [theme, setTheme] = useState("dark");
  const [operation, setOperation] = useState("insert-begin");
  const [step, setStep] = useState(0);
  const [currentValue, setCurrentValue] = useState(1);
  const [logs, setLogs] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    setList([]);
    setCurrentValue(1);
    setStep(0);
  }, [type]);

  const nextStep = () => {
    const newList = [...list];
    const val = currentValue;

    switch (operation) {
      case "insert-begin":
        if (step === 0) setLogs([`Creating node ${val}`]);
        if (step === 1) {
          if (type === "doubly") {
            if (newList[0]) newList[0].prev = val;
            newList.unshift({ value: val, next: newList[0]?.value || null, prev: null });
          } else {
            newList.unshift({ value: val, next: newList[0]?.value || null });
          }
          setLogs([`Inserted node ${val} at beginning`]);
          setCurrentValue(val + 1);
        }
        break;
      case "insert-end":
        if (step === 0) setLogs([`Creating node ${val}`]);
        if (step === 1) {
          if (type === "doubly") {
            newList.push({ value: val, prev: newList[newList.length - 1]?.value || null, next: null });
            if (newList.length > 1) newList[newList.length - 2].next = val;
          } else {
            newList.push({ value: val });
          }
          setLogs([`Inserted node ${val} at end`]);
          setCurrentValue(val + 1);
        }
        break;
      case "delete-begin":
        if (step === 0) setLogs([`Deleting first node`]);
        if (step === 1) {
          if (newList.length > 0) {
            newList.shift();
            setLogs([`Deleted node at beginning`]);
          } else setLogs([`List is already empty`]);
        }
        break;
      case "delete-end":
        if (step === 0) setLogs([`Deleting last node`]);
        if (step === 1) {
          if (newList.length > 0) {
            newList.pop();
            setLogs([`Deleted node at end`]);
          } else setLogs([`List is already empty`]);
        }
        break;
      default:
        break;
    }

    if (step === 1) setStep(0);
    else setStep(step + 1);

    setList(newList);
  };

  const bg = theme === "dark" ? "#0f172a" : "#f1f5f9";
  const color = theme === "dark" ? "#e2e8f0" : "#0f172a";

  return (
    <div
      style={{
        backgroundColor: bg,
        color,
        height: "100vh",
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        overflow: "hidden"
      }}
    >
      {/* Header */}
      <div style={{ padding: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => window.history.back()} style={styles.iconBtn}>
          <ArrowLeft size={20} /> Back
        </button>
        <h1 style={{ fontSize: "1.8rem" }}>Linked List Visualizer</h1>
        <button onClick={() => setTheme(theme === "dark" ? "light" : "dark")} style={styles.iconBtn}>
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>

      {/* Controls */}
      <div style={{ padding: "0 1rem", display: "flex", gap: "1rem", flexWrap: "wrap" }}>
        <select onChange={(e) => setType(e.target.value)} value={type} style={styles.select}>
          <option value="singly">Singly Linked List</option>
          <option value="doubly">Doubly Linked List</option>
          <option value="circular">Circular Linked List</option>
        </select>
        <select onChange={(e) => setOperation(e.target.value)} value={operation} style={styles.select}>
          <option value="insert-begin">Insert at Beginning</option>
          <option value="insert-end">Insert at End</option>
          <option value="delete-begin">Delete from Beginning</option>
          <option value="delete-end">Delete from End</option>
        </select>
        <button onClick={nextStep} style={styles.nextBtn}>Next Step</button>
        <button onClick={() => setShowInfo(!showInfo)} style={styles.toggleBtn}>
          {showInfo ? "Hide Info" : "Show Pseudocode & Complexity"}
        </button>
      </div>

      {/* Logs */}
      <p style={{ padding: "0 1rem", fontStyle: "italic" }}>{logs[0]}</p>

      {/* Visualization */}
      <div style={{
        flexGrow: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1rem",
        padding: "1rem",
        overflowY: "auto"
      }}>
        {list.map((node, i) => (
          <motion.div key={node.value} style={styles.node} initial={{ scale: 0 }} animate={{ scale: 1 }}>
            <div style={styles.circle}>{node.value}</div>
            <div style={styles.pointer}>
              {type === "doubly" && <span>⇦</span>} → {type === "doubly" && <span>⇨</span>}
            </div>
          </motion.div>
        ))}
        {type === "circular" && list.length > 0 && <span style={{ fontSize: "1.5rem" }}>↩️</span>}
      </div>

      {/* Info Section */}
      {showInfo && (
        <div style={styles.infoBox}>
          <h2>Pseudocode & Complexity</h2>
          <pre style={styles.codeBlock}>
{`Insert at Beginning:
  Time: O(1) | Space: O(1)

Insert at End:
  Time: O(n) | Space: O(1)

Delete from Beginning:
  Time: O(1) | Space: O(1)

Delete from End:
  Time: O(n) | Space: O(1)`}
          </pre>
        </div>
      )}
    </div>
  );
};

const styles = {
  iconBtn: {
    background: "none",
    border: "none",
    color: "inherit",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    fontSize: "1rem",
  },
  select: {
    padding: "0.5rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    fontSize: "1rem",
  },
  nextBtn: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "none",
    backgroundColor: "#3b82f6",
    color: "white",
    fontWeight: "bold",
    cursor: "pointer",
  },
  toggleBtn: {
    padding: "0.5rem 1rem",
    borderRadius: "6px",
    border: "1px solid #ccc",
    backgroundColor: "#fcd34d",
    color: "#0f172a",
    fontWeight: "bold",
    cursor: "pointer",
  },
  node: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  circle: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#0ea5e9",
    color: "white",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "1.2rem",
  },
  pointer: {
    marginTop: "0.3rem",
    fontSize: "1.2rem",
  },
  infoBox: {
    padding: "1rem",
    backgroundColor: "#1e293b",
    color: "#f1f5f9",
    fontSize: "0.9rem",
    overflowX: "auto",
    whiteSpace: "pre-wrap",
  },
  codeBlock: {
    fontFamily: "monospace",
    marginTop: "0.5rem",
  },
};

export default LinkedListVisualizer;
