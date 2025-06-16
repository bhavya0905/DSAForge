import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const HeapVisualizer = () => {
  const [heap, setHeap] = useState([]);
  const [value, setValue] = useState("");
  const [heapType, setHeapType] = useState("min");
  const [darkMode, setDarkMode] = useState(true);
  const [animationSteps, setAnimationSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const navigate = useNavigate();

  const swap = (arr, i, j) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  const recordStep = (arr, highlight) => {
    setAnimationSteps((prev) => [...prev, { arr: [...arr], highlight }]);
  };

  const heapifyUp = (arr, type) => {
    let index = arr.length - 1;
    while (index > 0) {
      const parent = Math.floor((index - 1) / 2);
      const shouldSwap =
        (type === "min" && arr[index] < arr[parent]) ||
        (type === "max" && arr[index] > arr[parent]);
      if (shouldSwap) {
        swap(arr, index, parent);
        recordStep(arr, [index, parent]);
        index = parent;
      } else break;
    }
  };

  const heapifyDown = (arr, type) => {
    let index = 0;
    const length = arr.length;
    while (index < length) {
      const left = 2 * index + 1;
      const right = 2 * index + 2;
      let target = index;

      if (
        left < length &&
        ((type === "min" && arr[left] < arr[target]) ||
          (type === "max" && arr[left] > arr[target]))
      ) {
        target = left;
      }

      if (
        right < length &&
        ((type === "min" && arr[right] < arr[target]) ||
          (type === "max" && arr[right] > arr[target]))
      ) {
        target = right;
      }

      if (target !== index) {
        swap(arr, index, target);
        recordStep(arr, [index, target]);
        index = target;
      } else break;
    }
  };

  const insertValue = () => {
    const num = parseInt(value);
    if (isNaN(num)) return;
    const newHeap = [...heap, num];
    recordStep(newHeap, []);
    heapifyUp(newHeap, heapType);
    setHeap(newHeap);
    setValue("");
  };

  const deleteRoot = () => {
    if (heap.length === 0) return;
    const newHeap = [...heap];
    newHeap[0] = newHeap[newHeap.length - 1];
    newHeap.pop();
    recordStep(newHeap, []);
    heapifyDown(newHeap, heapType);
    setHeap(newHeap);
  };

  const toggleHeap = () => {
    const newType = heapType === "min" ? "max" : "min";
    const newHeap = [];
    heap.forEach((val) => {
      newHeap.push(val);
      heapifyUp(newHeap, newType);
    });
    recordStep(newHeap, []);
    setHeap(newHeap);
    setHeapType(newType);
  };

  const nextStep = () => {
    if (currentStep < animationSteps.length) {
      setHeap(animationSteps[currentStep].arr);
      setCurrentStep((prev) => prev + 1);
    }
  };

  useEffect(() => {
    let timer;
    if (isPlaying && currentStep < animationSteps.length) {
      timer = setTimeout(() => {
        nextStep();
      }, 800);
    } else {
      setIsPlaying(false);
    }
    return () => clearTimeout(timer);
  }, [isPlaying, currentStep, animationSteps]);

  const exportHeap = () => {
    const text = heap.join(", ");
    navigator.clipboard.writeText(text);
    alert("Heap data copied to clipboard!");
  };

  const styles = {
    page: {
      minHeight: "100vh",
      padding: "1.5rem",
      backgroundColor: darkMode ? "#0f172a" : "#f8fafc",
      color: darkMode ? "#f1f5f9" : "#0f172a",
      fontFamily: "Segoe UI, sans-serif",
      transition: "all 0.3s",
    },
    header: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "1rem",
    },
    button: {
      background: "#3b82f6",
      color: "#fff",
      border: "none",
      borderRadius: "6px",
      padding: "8px 16px",
      margin: "0 8px",
      cursor: "pointer",
    },
    input: {
      padding: "8px",
      borderRadius: "6px",
      border: "1px solid #ccc",
      width: "100px",
    },
    heapContainer: {
      marginTop: "2rem",
      display: "flex",
      flexWrap: "wrap",
      gap: "16px",
      justifyContent: "center",
    },
    node: (isHighlighted) => ({
      background: isHighlighted ? "#facc15" : darkMode ? "#1e293b" : "#e2e8f0",
      padding: "14px 20px",
      borderRadius: "8px",
      fontWeight: "bold",
      border: "2px solid #3b82f6",
      color: darkMode ? "#f8fafc" : "#0f172a",
      boxShadow: "0 0 10px rgba(59, 130, 246, 0.4)",
    }),
    back: {
      position: "absolute",
      left: "1rem",
      top: "1rem",
      cursor: "pointer",
      fontSize: "1.2rem",
      color: "#3b82f6",
    },
  };

  const currentHighlight = animationSteps[currentStep - 1]?.highlight || [];

  return (
    <div style={styles.page}>
      <div style={styles.back} onClick={() => navigate("/visualize")}>⬅ Back</div>

      <div style={styles.header}>
        <h1>🔺 Heap Visualizer ({heapType.toUpperCase()} HEAP)</h1>
        <button style={styles.button} onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? "🌞 Light" : "🌙 Dark"}
        </button>
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Enter number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          style={styles.input}
        />
        <button style={styles.button} onClick={insertValue}>Insert</button>
        <button style={styles.button} onClick={deleteRoot}>Delete Root</button>
        <button style={styles.button} onClick={toggleHeap}>
          Toggle to {heapType === "min" ? "Max" : "Min"} Heap
        </button>
        <button style={styles.button} onClick={() => setIsPlaying(true)}>▶ Play All</button>
        <button style={styles.button} onClick={nextStep}>➡ Next Step</button>
        <button style={styles.button} onClick={exportHeap}>📋 Export</button>
      </div>

      <div style={styles.heapContainer}>
        {heap.map((node, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            style={styles.node(currentHighlight.includes(index))}
          >
            {node}
          </motion.div>
        ))}
      </div>

      <div style={{ marginTop: "3rem", textAlign: "center", color: darkMode ? "#cbd5e1" : "#334155" }}>
        <h3>🧠 Time Complexity:</h3>
        <p>Insert: O(log N) | Delete Root: O(log N)</p>
        <h3>🧠 Space Complexity:</h3>
        <p>O(N) – for storing the heap as an array</p>
      </div>
    </div>
  );
};

export default HeapVisualizer;
