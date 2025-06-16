import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const pseudocodes = {
  simple: `
function enqueue(queue, item):
    queue[rear] = item
    rear = rear + 1

function dequeue(queue):
    if front == rear:
        return "Queue is Empty"
    item = queue[front]
    front = front + 1
    return item
`,
  circular: `
function enqueue(queue, item):
    if (rear + 1) % size == front:
        return "Queue is Full"
    queue[rear] = item
    rear = (rear + 1) % size

function dequeue(queue):
    if front == rear:
        return "Queue is Empty"
    item = queue[front]
    front = (front + 1) % size
    return item
`,
  priority: `
function enqueue(queue, item, priority):
    Insert item based on priority

function dequeue(queue):
    Remove item with highest priority
`,
  stack: `
function push(stack, item):
    stack[top] = item
    top = top + 1

function pop(stack):
    if top == 0:
        return "Stack is Empty"
    top = top - 1
    return stack[top]
`,
  deque: `
function insertFront(deque, item):
    Add item to front

function insertRear(deque, item):
    Add item to rear

function deleteFront(deque):
    Remove item from front

function deleteRear(deque):
    Remove item from rear
`
};

const complexities = {
  simple: ["Enqueue: O(1)", "Dequeue: O(1)", "Peek: O(1)", "Space: O(n)"],
  circular: ["Enqueue: O(1)", "Dequeue: O(1)", "Peek: O(1)", "Space: O(n)"],
  priority: ["Enqueue: O(n)", "Dequeue: O(1)", "Peek: O(1)", "Space: O(n)"],
  stack: ["Push: O(1)", "Pop: O(1)", "Peek: O(1)", "Space: O(n)"],
  deque: [
    "Insert Front/Rear: O(1)",
    "Delete Front/Rear: O(1)",
    "Peek Front/Rear: O(1)",
    "Space: O(n)"
  ]
};

const QueueStackDequeVisualizer = () => {
  const [data, setData] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("");
  const [mode, setMode] = useState("dark");
  const [type, setType] = useState("simple"); // simple | circular | priority | stack | deque
  const navigate = useNavigate();
  const size = 5; // for circular queue

  const isDark = mode === "dark";

  const handleInsert = (direction = "rear") => {
    if (input.trim() === "") return;

    if (type === "simple" || type === "circular") {
      if (type === "circular" && data.length === size) {
        alert("Circular Queue is Full");
        return;
      }
      setData((prev) => [...prev, input]);
    } else if (type === "priority") {
      if (priority.trim() === "") return alert("Enter priority");
      const newItem = { value: input, priority: parseInt(priority) };
      const newQueue = [...data, newItem].sort((a, b) => a.priority - b.priority);
      setData(newQueue);
      setPriority("");
    } else if (type === "stack") {
      setData((prev) => [...prev, input]);
    } else if (type === "deque") {
      if (direction === "front") {
        setData((prev) => [input, ...prev]);
      } else {
        setData((prev) => [...prev, input]);
      }
    }

    setInput("");
  };

  const handleRemove = (direction = "front") => {
    if (data.length === 0) return;

    if (type === "stack") {
      setData((prev) => prev.slice(0, -1));
    } else if (type === "deque") {
      if (direction === "front") {
        setData((prev) => prev.slice(1));
      } else {
        setData((prev) => prev.slice(0, -1));
      }
    } else {
      setData((prev) => prev.slice(1));
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: isDark ? "#0f172a" : "#f8fafc",
        color: isDark ? "#dbeafe" : "#0f172a",
        padding: "2rem",
        transition: "all 0.3s ease"
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
        <button onClick={() => navigate("/visualize")}>⬅ Back</button>
        <button onClick={toggleMode}>{isDark ? "🌞 Light Mode" : "🌙 Dark Mode"}</button>
      </div>

      <h1 style={{ textAlign: "center" }}>📊 Queue | Stack | Deque Visualizer</h1>

      {/* Type Selector */}
      <div style={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px" }}
        >
          <option value="simple">Simple Queue</option>
          <option value="circular">Circular Queue</option>
          <option value="priority">Priority Queue</option>
          <option value="deque">Deque</option>
        </select>
      </div>

      {/* Controls */}
      <div style={{ display: "flex", justifyContent: "center", gap: "1rem", flexWrap: "wrap" }}>
        <input
          type="text"
          placeholder="Enter value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={{ padding: "0.5rem", borderRadius: "8px" }}
        />
        {type === "priority" && (
          <input
            type="number"
            placeholder="Priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={{ padding: "0.5rem", borderRadius: "8px", width: "100px" }}
          />
        )}

        {type === "deque" ? (
          <>
            <button onClick={() => handleInsert("front")}>Insert Front</button>
            <button onClick={() => handleInsert("rear")}>Insert Rear</button>
            <button onClick={() => handleRemove("front")}>Delete Front</button>
            <button onClick={() => handleRemove("rear")}>Delete Rear</button>
          </>
        ) : (
          <>
            <button onClick={() => handleInsert()}>{
              type === "stack" ? "Push" : "Enqueue"
            }</button>
            <button onClick={() => handleRemove()}>
              {type === "stack" ? "Pop" : "Dequeue"}
            </button>
          </>
        )}
      </div>

      {/* Animation */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "2rem",
          gap: "1rem",
          flexWrap: "wrap"
        }}
      >
        <AnimatePresence>
          {data.map((item, index) => (
            <motion.div
              key={type === "priority" ? item.value + item.priority : item + index}
              initial={{ opacity: 0, y: -40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
              style={{
                padding: "1rem 1.5rem",
                background: isDark ? "#1e3a8a" : "#bfdbfe",
                borderRadius: "10px",
                fontWeight: "bold",
                boxShadow: "0 0 10px rgba(0,0,0,0.2)"
              }}
            >
              {type === "priority" ? `${item.value} (P:${item.priority})` : item}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Pseudocode & Complexity */}
      <div
        style={{
          marginTop: "3rem",
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "2rem"
        }}
      >
        <div style={{ flex: 1, minWidth: "280px" }}>
          <h3>Pseudocode:</h3>
          <pre
            style={{
              background: isDark ? "#1e293b" : "#e2e8f0",
              padding: "1rem",
              borderRadius: "8px",
              fontSize: "0.9rem",
              whiteSpace: "pre-wrap"
            }}
          >
            {pseudocodes[type]}
          </pre>
        </div>

        <div style={{ flex: 1 }}>
          <h3>Time & Space Complexity</h3>
          <ul style={{ lineHeight: "1.8" }}>
            {complexities[type].map((line, idx) => (
              <li key={idx}>{line}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default QueueStackDequeVisualizer;
