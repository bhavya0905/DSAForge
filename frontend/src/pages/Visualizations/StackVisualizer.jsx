import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const StackVisualizer = () => {
  const [stack, setStack] = useState([]);
  const [input, setInput] = useState("");
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);

  const handlePush = () => {
    if (input === "") return;
    setStack([...stack, input]);
    setInput("");
  };

  const handlePop = () => {
    setStack(stack.slice(0, -1));
  };

  const containerStyle = {
    backgroundColor: darkMode ? "#0f172a" : "#f9f9f9",
    color: darkMode ? "#e0f2fe" : "#1e293b",
    minHeight: "100vh",
    padding: "2rem",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    transition: "all 0.3s ease",
  };

  const boxStyle = {
    backgroundColor: darkMode ? "#1e293b" : "#e2e8f0",
    color: darkMode ? "#dbeafe" : "#1e293b",
    padding: "1rem 2rem",
    borderRadius: "8px",
    margin: "0.5rem",
    fontWeight: "bold",
    border: `2px solid ${darkMode ? "#38bdf8" : "#2563eb"}`,
  };

  return (
    <div style={containerStyle}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", width: "100%" }}>
        <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>🔙 Back</button>
        <button onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <h1>📚 Stack Visualization</h1>

      {/* Input & Actions */}
      <div style={{ margin: "1rem 0" }}>
        <input
          type="text"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px", marginRight: "1rem" }}
        />
        <button onClick={handlePush}>Push</button>
        <button onClick={handlePop} style={{ marginLeft: "0.5rem" }}>Pop</button>
      </div>

      {/* Stack Boxes */}
      <div style={{ display: "flex", flexDirection: "column-reverse", alignItems: "center" }}>
        <AnimatePresence>
          {stack.map((item, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.3 }}
              style={boxStyle}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pseudocode & Complexity */}
      <div style={{ marginTop: "2rem", width: "100%", maxWidth: "700px" }}>
        <h3>🧠 Pseudocode:</h3>
        <pre style={{ backgroundColor: darkMode ? "#1e293b" : "#e2e8f0", padding: "1rem", borderRadius: "8px" }}>
{`Push(x):
  stack[top + 1] = x
  top++

Pop():
  if top == -1:
    return "Stack Underflow"
  top--`}
        </pre>

        <h3>🕒 Time Complexity:</h3>
        <ul>
          <li>Push: O(1)</li>
          <li>Pop: O(1)</li>
          <li>Peek/Top: O(1)</li>
        </ul>

        <h3>📦 Space Complexity:</h3>
        <p>O(n), where n is the number of elements in the stack</p>
      </div>
    </div>
  );
};

export default StackVisualizer;
