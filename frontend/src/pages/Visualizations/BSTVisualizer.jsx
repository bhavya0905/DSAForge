import React, { useState } from "react";
import Controls from "./Controls";
import TreeRenderer from "./TreeRenderer";
import { insertNode, deleteNode, searchNode, getTraversal } from "./treeUtils";

const BSTVisualizer = () => {
  const [root, setRoot] = useState(null);
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [traversalResult, setTraversalResult] = useState([]);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleInsert = (value) => {
    const newRoot = insertNode(root, parseInt(value));
    setRoot(newRoot);
    setHighlightedNode(null);
  };

  const handleDelete = (value) => {
    const newRoot = deleteNode(root, parseInt(value));
    setRoot(newRoot);
    setHighlightedNode(null);
  };

  const handleSearch = (value) => {
    const found = searchNode(root, parseInt(value));
    setHighlightedNode(found ? parseInt(value) : null);
  };

  const handleTraversal = (type) => {
    const result = getTraversal(root, type);
    setTraversalResult(result);
    setHighlightedNode(null);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const themeStyles = isDarkMode ? darkStyles : lightStyles;

  return (
    <div style={{ ...themeStyles.page }}>
      <header style={themeStyles.header}>
        <button style={themeStyles.backBtn} onClick={() => window.history.back()}>
          ← Back
        </button>
        <h1 style={themeStyles.title}>🌳 Binary Search Tree Visualizer</h1>
        <button onClick={toggleTheme} style={themeStyles.toggleBtn}>
          {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </header>

      <Controls
        onInsert={handleInsert}
        onDelete={handleDelete}
        onSearch={handleSearch}
        onTraverse={handleTraversal}
      />

      <div style={themeStyles.canvas}>
        <TreeRenderer root={root} highlightedNode={highlightedNode} />
      </div>

      {traversalResult.length > 0 && (
        <div style={themeStyles.result}>
          <strong>Traversal Result:</strong> {traversalResult.join(" → ")}
        </div>
      )}
    </div>
  );
};

// 🎨 Themes
const common = {
  fontFamily: "Segoe UI, sans-serif",
  borderRadius: "10px",
};

const darkStyles = {
  page: {
    ...common,
    backgroundColor: "#0f172a",
    color: "#dbeafe",
    minHeight: "100vh",
    padding: "1rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  backBtn: {
    background: "#38bdf8",
    color: "#0f172a",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  toggleBtn: {
    background: "#1e293b",
    color: "#dbeafe",
    border: "1px solid #38bdf8",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#38bdf8",
  },
  canvas: {
    overflowX: "auto",
    padding: "1.2rem",
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "10px",
    marginTop: "1rem",
  },
  result: {
    marginTop: "1.5rem",
    padding: "0.75rem 1rem",
    backgroundColor: "#1e293b",
    border: "1px solid #334155",
    borderRadius: "8px",
    fontSize: "1.1rem",
  },
};

const lightStyles = {
  page: {
    ...common,
    backgroundColor: "#f8fafc",
    color: "#0f172a",
    minHeight: "100vh",
    padding: "1rem",
  },
  header: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "1.5rem",
  },
  backBtn: {
    background: "#0f172a",
    color: "#f8fafc",
    border: "none",
    padding: "8px 14px",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer",
  },
  toggleBtn: {
    background: "#e2e8f0",
    color: "#0f172a",
    border: "1px solid #94a3b8",
    padding: "8px 14px",
    borderRadius: "8px",
    cursor: "pointer",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "bold",
    color: "#0f172a",
  },
  canvas: {
    overflowX: "auto",
    padding: "1.2rem",
    backgroundColor: "#fff",
    border: "1px solid #94a3b8",
    borderRadius: "10px",
    marginTop: "1rem",
  },
  result: {
    marginTop: "1.5rem",
    padding: "0.75rem 1rem",
    backgroundColor: "#e2e8f0",
    border: "1px solid #94a3b8",
    borderRadius: "8px",
    fontSize: "1.1rem",
  },
};

export default BSTVisualizer;
