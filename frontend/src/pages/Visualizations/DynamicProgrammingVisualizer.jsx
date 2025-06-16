import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const dpTypes = [
  {
    title: '1️⃣ Memoization (Top-Down)',
    pseudocode: `function fib(n):
  if n <= 1:
    return n
  if dp[n] is not -1:
    return dp[n]
  dp[n] = fib(n-1) + fib(n-2)
  return dp[n]`,
    explanation: 'Memoization stores results of subproblems to avoid redundant calculations.'
  },
  {
    title: '2️⃣ Tabulation (Bottom-Up)',
    pseudocode: `function fib(n):
  create dp[0..n]
  dp[0] = 0
  dp[1] = 1
  for i from 2 to n:
    dp[i] = dp[i-1] + dp[i-2]
  return dp[n]`,
    explanation: 'Tabulation builds the solution iteratively using a bottom-up approach.'
  },
  {
    title: '3️⃣ Space Optimized DP',
    pseudocode: `function fib(n):
  a = 0
  b = 1
  for i from 2 to n:
    temp = a + b
    a = b
    b = temp
  return b`,
    explanation: 'Reduces space complexity from O(n) to O(1) by using two variables instead of an array.'
  }
];

const fibonacciCode = `function fib(n):
  if n <= 1:
    return n
  return fib(n - 1) + fib(n - 2)`;

const DynamicProgrammingVisualizer = () => {
  const navigate = useNavigate();
  const [darkMode, setDarkMode] = useState(true);
  const [fibInput, setFibInput] = useState(5);
  const [output, setOutput] = useState(null);
  const [steps, setSteps] = useState([]);

  const toggleTheme = () => setDarkMode(!darkMode);

  useEffect(() => {
    const storedTheme = localStorage.getItem('dp-theme');
    if (storedTheme) setDarkMode(storedTheme === 'dark');
  }, []);

  useEffect(() => {
    localStorage.setItem('dp-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const animatedFib = (n) => {
    const stepLog = [];
    const fib = (n) => {
      stepLog.push(`fib(${n}) called`);
      if (n <= 1) {
        stepLog.push(`return ${n}`);
        return n;
      }
      const result = fib(n - 1) + fib(n - 2);
      stepLog.push(`fib(${n}) = ${result}`);
      return result;
    };
    const result = fib(n);
    setSteps(stepLog);
    setOutput(result);
  };

  return (
    <div
      style={{
        backgroundColor: darkMode ? '#0f172a' : '#f1f5f9',
        color: darkMode ? '#dbeafe' : '#1e293b',
        minHeight: '100vh',
        padding: '2rem',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <button
          onClick={() => navigate(-1)}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#38bdf8', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}
        >
          ⬅ Back
        </button>
        <button
          onClick={toggleTheme}
          style={{ padding: '0.5rem 1rem', backgroundColor: '#1e293b', color: '#38bdf8', border: '1px solid #38bdf8', borderRadius: '8px', cursor: 'pointer' }}
        >
          {darkMode ? '🌞 Light Mode' : '🌙 Dark Mode'}
        </button>
      </div>

      <h1 style={{ fontSize: '2.5rem', textAlign: 'center', color: '#38bdf8' }}>🔢 Dynamic Programming Visualizer</h1>
      <p style={{ textAlign: 'center', maxWidth: '700px', margin: '1rem auto', fontSize: '1.2rem' }}>
        Visualize solving problems like Fibonacci using memoization, tabulation, and space optimization.
      </p>

      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginTop: '2rem' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ color: '#38bdf8' }}>⚙️ Choose a DP Technique</h2>
          <AnimatePresence>
            {dpTypes.map((type, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                style={{
                  backgroundColor: darkMode ? '#1e293b' : '#e2e8f0',
                  border: '1px solid #38bdf8',
                  borderRadius: '12px',
                  padding: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <h3 style={{ color: '#38bdf8', fontSize: '1.2rem' }}>{type.title}</h3>
                <pre
                  style={{
                    backgroundColor: darkMode ? '#0f172a' : '#cbd5e1',
                    padding: '1rem',
                    borderRadius: '8px',
                    overflowX: 'auto',
                    color: darkMode ? '#dbeafe' : '#1e293b',
                    fontSize: '0.9rem'
                  }}
                >
                  {type.pseudocode}
                </pre>
                <p>{type.explanation}</p>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div style={{ flex: 1, minWidth: '300px' }}>
          <h2 style={{ color: '#38bdf8' }}>🧪 Try Fibonacci</h2>
          <input
            type="number"
            value={fibInput}
            onChange={(e) => setFibInput(Number(e.target.value))}
            min="0"
            style={{
              padding: '0.5rem',
              fontSize: '1rem',
              marginBottom: '1rem',
              width: '100%',
              borderRadius: '8px',
              border: '1px solid #38bdf8',
              backgroundColor: darkMode ? '#1e293b' : '#e2e8f0',
              color: darkMode ? '#dbeafe' : '#1e293b'
            }}
          />
          <button
            onClick={() => animatedFib(fibInput)}
            style={{ padding: '0.6rem 1.2rem', fontSize: '1rem', borderRadius: '8px', border: 'none', backgroundColor: '#38bdf8', color: 'white', cursor: 'pointer' }}
          >
            ▶ Run Visualization
          </button>

          <div style={{ marginTop: '1.5rem' }}>
            <h3 style={{ color: '#38bdf8' }}>🧾 Steps</h3>
            <ul style={{ paddingLeft: '1rem' }}>
              {steps.map((step, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  style={{ marginBottom: '0.5rem' }}
                >
                  {step}
                </motion.li>
              ))}
            </ul>
            {output !== null && (
              <p style={{ marginTop: '1rem', fontWeight: 'bold', color: '#22c55e' }}>
                ✅ Output: {output}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicProgrammingVisualizer;
