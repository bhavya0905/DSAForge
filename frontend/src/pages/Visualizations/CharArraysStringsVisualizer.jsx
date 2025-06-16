import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const CharArraysStringsVisualizer = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState("hello");
  const [operation, setOperation] = useState("Reverse");
  const [result, setResult] = useState("");
  const [highlighted, setHighlighted] = useState([]);
  const [theme, setTheme] = useState("dark");

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const performOperation = () => {
    const chars = input.split("");
    let res = "";
    let highlight = [];

    switch (operation) {
      case "Reverse":
        res = chars.reverse().join("");
        break;
      case "Is Palindrome":
        const reversed = chars.slice().reverse().join("");
        res = input === reversed ? "Yes" : "No";
        highlight = chars.map((char, i) => (char === reversed[i] ? i : -1)).filter(i => i !== -1);
        break;
      case "Char Frequency":
        const freq = {};
        for (let ch of input) freq[ch] = (freq[ch] || 0) + 1;
        res = JSON.stringify(freq, null, 2);
        break;
      case "To Uppercase":
        res = input.toUpperCase();
        break;
      case "To Lowercase":
        res = input.toLowerCase();
        break;
      default:
        res = "Invalid";
    }

    setResult(res);
    setHighlighted(highlight);
  };

  return (
    <div className={`container ${theme}`}>
      <div className="header">
        <button onClick={() => navigate(-1)} className="back">← Back</button>
        <h1>Char, Arrays & Strings Visualizer</h1>
        <button onClick={toggleTheme} className="theme-toggle">
          {theme === "dark" ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      <div className="controls">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter a string"
        />
        <select value={operation} onChange={(e) => setOperation(e.target.value)}>
          <option>Reverse</option>
          <option>Is Palindrome</option>
          <option>Char Frequency</option>
          <option>To Uppercase</option>
          <option>To Lowercase</option>
        </select>
        <button onClick={performOperation}>Play</button>
        <button onClick={() => { setInput(""); setResult(""); setHighlighted([]); }}>Reset</button>
      </div>

      <motion.div className="visual" layout>
        <AnimatePresence>
          {input.split("").map((char, index) => (
            <motion.div
              className={`char-box ${highlighted.includes(index) ? "highlight" : ""}`}
              key={char + index}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {char}
              <span className="index">{index}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <motion.div
        className="details"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h3>Operation: {operation}</h3>
        <pre><strong>Result:</strong> {result}</pre>
      </motion.div>

      <style>{`
        .container {
          min-height: 100vh;
          width: 100vw;
          padding: 20px;
          box-sizing: border-box;
          font-family: sans-serif;
          transition: all 0.3s ease;
        }

        .container.dark {
          background-color: #0f172a;
          color: #f1f5f9;
        }

        .container.light {
          background-color: #f8fafc;
          color: #1e293b;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
        }

        .back, .theme-toggle {
          padding: 8px 12px;
          border: none;
          border-radius: 5px;
          background: #3b82f6;
          color: white;
          cursor: pointer;
        }

        .controls {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          align-items: center;
          margin-bottom: 2rem;
        }

        input, select, button {
          padding: 8px;
          font-size: 1rem;
          border-radius: 6px;
          border: none;
        }

        button {
          background: #3b82f6;
          color: white;
          cursor: pointer;
        }

        button:hover {
          background: #2563eb;
        }

        .visual {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
          min-height: 60px;
        }

        .char-box {
          background: #1e40af;
          padding: 10px;
          border-radius: 8px;
          color: white;
          font-size: 1.2rem;
          position: relative;
          min-width: 40px;
          text-align: center;
        }

        .char-box.highlight {
          background-color: #16a34a;
        }

        .char-box .index {
          position: absolute;
          bottom: -1.2rem;
          left: 50%;
          transform: translateX(-50%);
          font-size: 0.75rem;
          color: #94a3b8;
        }

        .details {
          padding: 1rem;
          background: rgba(59,130,246,0.1);
          border-radius: 10px;
          white-space: pre-wrap;
        }
      `}</style>
    </div>
  );
};

export default CharArraysStringsVisualizer;
