import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const BasicMathsPointersVisualizer = () => {
  const navigate = useNavigate();
  const [number, setNumber] = useState(15);
  const [operation, setOperation] = useState("Is Prime");
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [pointerArray, setPointerArray] = useState([]);
  const [highlightIndex, setHighlightIndex] = useState(-1);
  const [darkMode, setDarkMode] = useState(true);

  const handleOperation = () => {
    let newSteps = [];
    setPointerArray([]);
    setHighlightIndex(-1);

    switch (operation) {
      case "Is Prime": {
        if (number < 2) newSteps.push("Number is not prime (less than 2)");
        else {
          for (let i = 2; i <= Math.sqrt(number); i++) {
            if (number % i === 0) {
              newSteps.push(`${number} is divisible by ${i}, so not prime`);
              break;
            } else {
              newSteps.push(`${number} is not divisible by ${i}`);
            }
          }
          if (!newSteps.some((s) => s.includes("divisible")))
            newSteps.push(`${number} is prime! ✅`);
        }
        break;
      }

      case "GCD with 60": {
        let a = number, b = 60;
        while (b) {
          newSteps.push(`GCD(${a}, ${b})`);
          let temp = b;
          b = a % b;
          a = temp;
        }
        newSteps.push(`GCD is ${number === 0 ? 60 : a}`);
        break;
      }

      case "Factorial": {
        let result = 1;
        for (let i = 1; i <= number; i++) {
          result *= i;
          newSteps.push(`Step ${i}: Multiply by ${i} => ${result}`);
        }
        newSteps.push(`Factorial of ${number} is ${result}`);
        break;
      }

      case "Pointer Simulation": {
        const arr = [10, 20, 30, 40];
        setPointerArray(arr);
        setHighlightIndex(0);
        newSteps = arr.map((val, idx) => `Pointer at index ${idx}: Value = ${val}`);
        break;
      }

      default:
        newSteps = [];
    }

    setSteps(newSteps);
    setStepIndex(0);
  };

  const nextStep = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex(stepIndex + 1);
      if (operation === "Pointer Simulation") {
        setHighlightIndex(stepIndex + 1);
      }
    }
  };

  const theme = {
    background: darkMode ? "#0f172a" : "#f9fafb",
    text: darkMode ? "#f1f5f9" : "#111827",
    primary: darkMode ? "#3b82f6" : "#2563eb",
    secondary: darkMode ? "#1e3a8a" : "#dbeafe",
    pointerHighlight: darkMode ? "#facc15" : "#fde047",
    boxShadow: "0 4px 12px rgba(0,0,0,0.3)",
  };

  return (
    <div
      style={{
        backgroundColor: theme.background,
        color: theme.text,
        height: "100vh",
        width: "100vw",
        padding: "2rem",
        boxSizing: "border-box",
        overflow: "auto",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          marginBottom: "2rem",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            backgroundColor: "transparent",
            border: `1px solid ${theme.primary}`,
            color: theme.primary,
            padding: "0.5rem 1rem",
            borderRadius: "6px",
          }}
        >
          ← Back
        </button>
        <h1 style={{ fontSize: "2rem", textAlign: "center", flex: 1 }}>
          🧮 Basic Maths & Pointers Visualizer
        </h1>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "0.5rem 1rem",
            borderRadius: "6px",
            backgroundColor: darkMode ? "#facc15" : "#1e3a8a",
            color: darkMode ? "#000" : "#fff",
            border: "none",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* Controls */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1rem",
          justifyContent: "center",
          marginBottom: "2rem",
        }}
      >
        <input
          type="number"
          value={number}
          onChange={(e) => setNumber(Number(e.target.value))}
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            border: "none",
            width: "100px",
          }}
        />
        <select
          value={operation}
          onChange={(e) => setOperation(e.target.value)}
          style={{
            padding: "0.6rem",
            borderRadius: "6px",
            border: "none",
            minWidth: "180px",
          }}
        >
          <option>Is Prime</option>
          <option>GCD with 60</option>
          <option>Factorial</option>
          <option>Pointer Simulation</option>
        </select>
        <button
          onClick={handleOperation}
          style={{
            backgroundColor: theme.primary,
            color: "white",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            border: "none",
            cursor: "pointer",
          }}
        >
          ▶ Start
        </button>
        <button
          onClick={nextStep}
          disabled={stepIndex >= steps.length - 1}
          style={{
            backgroundColor: "#10b981",
            color: "white",
            padding: "0.6rem 1.2rem",
            borderRadius: "6px",
            border: "none",
            cursor: stepIndex >= steps.length - 1 ? "not-allowed" : "pointer",
            opacity: stepIndex >= steps.length - 1 ? 0.6 : 1,
          }}
        >
          ➡ Next Step
        </button>
      </div>

      {/* Pointer Simulation */}
      {operation === "Pointer Simulation" && pointerArray.length > 0 && (
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
          {pointerArray.map((val, idx) => (
            <motion.div
              key={idx}
              style={{
                padding: "1rem 1.5rem",
                backgroundColor:
                  highlightIndex === idx
                    ? theme.pointerHighlight
                    : theme.secondary,
                color: highlightIndex === idx ? "#000" : theme.text,
                borderRadius: "8px",
                fontSize: "1.2rem",
              }}
              animate={{ scale: highlightIndex === idx ? 1.1 : 1 }}
              transition={{ duration: 0.4 }}
            >
              {val}
            </motion.div>
          ))}
        </div>
      )}

      {/* Step Output */}
      <motion.div layout style={{ minHeight: "100px", marginTop: "2rem" }}>
        <AnimatePresence mode="wait">
          {steps[stepIndex] && (
            <motion.div
              key={stepIndex}
              style={{
                backgroundColor: theme.secondary,
                padding: "1rem",
                borderRadius: "10px",
                fontSize: "1.2rem",
                marginTop: "1rem",
                boxShadow: theme.boxShadow,
                textAlign: "center",
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5 }}
            >
              {steps[stepIndex]}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default BasicMathsPointersVisualizer;
