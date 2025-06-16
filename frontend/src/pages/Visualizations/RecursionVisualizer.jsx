import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { saveAs } from "file-saver";

const RecursionVisualizer = () => {
  const [input, setInput] = useState(5);
  const [steps, setSteps] = useState([]);
  const [index, setIndex] = useState(0);
  const [started, setStarted] = useState(false);
  const [themeMode, setThemeMode] = useState("dark");
  const [selectedType, setSelectedType] = useState("factorial");
  const [tree, setTree] = useState(null);

  const themes = {
    dark: {
      background: "#0f172a",
      text: "#f1f5f9",
      node: "#1e293b",
      primary: "#3b82f6",
      baseCase: "#10b981",
      callCase: "#f59e0b",
      returnCase: "#8b5cf6",
    },
    light: {
      background: "#f8fafc",
      text: "#0f172a",
      node: "#e2e8f0",
      primary: "#2563eb",
      baseCase: "#059669",
      callCase: "#d97706",
      returnCase: "#7c3aed",
    },
  };

  const theme = themes[themeMode];

  const toggleTheme = () => {
    setThemeMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const handleVisualize = () => {
    const trace = [];

    const buildTree = (type, value, depth = 0) => {
      if (type === "factorial") {
        trace.push({ type: "call", value, depth, message: `Call: factorial(${value})` });
        const node = { value: `factorial(${value})`, children: [], depth };

        if (value === 0 || value === 1) {
          trace.push({ type: "base", value: 1, depth, message: "Return: 1 (base case)" });
          node.children.push({ value: "1", children: [], depth: depth + 1 });
          return [1, node];
        }

        const [res, childNode] = buildTree("factorial", value - 1, depth + 1);
        const result = value * res;

        trace.push({ type: "return", value: result, depth, message: `Return: ${value} * factorial(${value - 1}) = ${result}` });
        node.children.push(childNode);
        return [result, node];

      } else if (type === "fibonacci") {
        trace.push({ type: "call", value, depth, message: `Call: fibonacci(${value})` });
        const node = { value: `fibonacci(${value})`, children: [], depth };

        if (value <= 1) {
          trace.push({ type: "base", value, depth, message: `Return: ${value} (base case)` });
          node.children.push({ value: `${value}`, children: [], depth: depth + 1 });
          return [value, node];
        }

        const [left, leftNode] = buildTree("fibonacci", value - 1, depth + 1);
        const [right, rightNode] = buildTree("fibonacci", value - 2, depth + 1);
        const result = left + right;

        trace.push({ type: "return", value: result, depth, message: `Return: fibonacci(${value - 1}) + fibonacci(${value - 2}) = ${result}` });
        node.children.push(leftNode, rightNode);
        return [result, node];
      }
    };

    const [, builtTree] = buildTree(selectedType, input);
    setSteps(trace);
    setTree(builtTree);
    setIndex(0);
    setStarted(true);
  };

  const nextStep = () => {
    if (index < steps.length - 1) setIndex(index + 1);
  };

  const TreeNode = ({ node }) => {
    const [collapsed, setCollapsed] = useState(false);
    return (
      <div style={{ marginLeft: "1rem", marginTop: "0.5rem" }}>
        <div
          style={{
            backgroundColor: theme.node,
            padding: "0.6rem",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
          onClick={() => setCollapsed(!collapsed)}
        >
          {node.value} {node.children?.length > 0 && (collapsed ? "▶" : "▼")}
        </div>
        {!collapsed && node.children?.map((child, i) => <TreeNode key={i} node={child} />)}
      </div>
    );
  };

  const exportTrace = () => {
    const blob = new Blob([JSON.stringify(steps, null, 2)], { type: "application/json" });
    saveAs(blob, "recursion_trace.json");
  };

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        height: "100vh",
        width: "100vw",
        padding: "2rem",
        fontFamily: "Segoe UI, Tahoma, sans-serif",
        overflowY: "auto",
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <button onClick={() => window.history.back()} style={{ background: theme.primary, color: "white", padding: "0.4rem 1rem", border: "none", borderRadius: "6px" }}>
          ← Back
        </button>
        <button onClick={toggleTheme} style={{ background: theme.primary, color: "white", padding: "0.4rem 1rem", border: "none", borderRadius: "6px" }}>
          {themeMode === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      <h1 style={{ fontSize: "2rem", marginBottom: "1rem" }}>🌀 Recursion Visualizer</h1>

      {/* Input & Controls */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <select value={selectedType} onChange={(e) => setSelectedType(e.target.value)} style={{ padding: "0.6rem", borderRadius: "6px" }}>
          <option value="factorial">Factorial</option>
          <option value="fibonacci">Fibonacci</option>
        </select>
        <input type="number" value={input} onChange={(e) => setInput(Number(e.target.value))} style={{ padding: "0.6rem", borderRadius: "6px", width: "100px" }} />
        <button onClick={handleVisualize} style={{ backgroundColor: theme.primary, color: "white", padding: "0.6rem 1.2rem", borderRadius: "6px", border: "none", cursor: "pointer" }}>
          ▶ Visualize
        </button>
        <button onClick={nextStep} disabled={index >= steps.length - 1 || !started} style={{ backgroundColor: index >= steps.length - 1 ? "#6b7280" : theme.returnCase, color: "white", padding: "0.6rem 1.2rem", borderRadius: "6px", border: "none" }}>
          ⏭ Next
        </button>
        <button onClick={exportTrace} style={{ backgroundColor: theme.callCase, color: "white", padding: "0.6rem 1.2rem", borderRadius: "6px", border: "none" }}>
          📤 Export Trace
        </button>
      </div>

      {/* Step Viewer */}
      <motion.div layout style={{ minHeight: "120px" }}>
        <AnimatePresence mode="wait">
          {started && steps[index] && (
            <motion.div
              key={index}
              style={{
                backgroundColor:
                  steps[index].type === "base"
                    ? theme.baseCase
                    : steps[index].type === "call"
                    ? theme.callCase
                    : theme.returnCase,
                padding: "1rem",
                borderRadius: "12px",
                fontSize: "1.1rem",
                color: "#000",
                boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                marginTop: "1rem",
              }}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {steps[index].message}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Tree View */}
      <div style={{ marginTop: "2rem" }}>
        <h2>🌳 Recursion Tree View</h2>
        {tree ? <TreeNode node={tree} /> : <p>No recursion tree to display yet.</p>}
      </div>
    </div>
  );
};

export default RecursionVisualizer;
