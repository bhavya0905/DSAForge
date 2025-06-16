import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Title,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Title);

const pseudocode = [
  "for i = 0 to n-1",
  "    for j = 0 to n-i-1",
  "        if arr[j] > arr[j+1]",
  "            swap(arr[j], arr[j+1])"
];

const ArrayVisualizer = () => {
  const [array, setArray] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [highlightIndex, setHighlightIndex] = useState(null);
  const [compareIndices, setCompareIndices] = useState([]);
  const [isSorting, setIsSorting] = useState(false);
  const [pseudocodeLine, setPseudocodeLine] = useState(null);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const playSound = () => {
    const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
    audio.play();
  };

  const addElement = () => {
    if (inputValue === '') return;
    const newArray = [...array, parseInt(inputValue)];
    setArray(newArray);
    setHighlightIndex(newArray.length - 1);
    setInputValue('');
    playSound();
    setTimeout(() => setHighlightIndex(null), 1000);
  };

  const removeLast = () => {
    setArray(array.slice(0, -1));
    playSound();
  };

  const resetArray = () => {
    setArray([]);
    setPseudocodeLine(null);
    setCompareIndices([]);
    setHighlightIndex(null);
  };

  const bubbleSort = async () => {
    setIsSorting(true);
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      setPseudocodeLine(0);
      for (let j = 0; j < arr.length - i - 1; j++) {
        setPseudocodeLine(1);
        setCompareIndices([j, j + 1]); // Yellow for comparison
        await new Promise((r) => setTimeout(r, 300));

        if (arr[j] > arr[j + 1]) {
          setPseudocodeLine(2);
          setHighlightIndex(j); // Red for swap
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
          playSound();
          setArray([...arr]);
          await new Promise((r) => setTimeout(r, 300));
        }

        setCompareIndices([]);
        setHighlightIndex(null);
      }
    }
    setPseudocodeLine(null);
    setIsSorting(false);
  };

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const styles = getStyles(darkMode);

  const chartData = {
    labels: array.map((_, idx) => `Index ${idx}`),
    datasets: [
      {
        label: 'Array Elements',
        data: array,
        backgroundColor: array.map((_, idx) => {
          if (compareIndices.includes(idx)) return '#facc15'; // Yellow (comparing)
          if (idx === highlightIndex) return '#ef4444';       // Red (swapping)
          return '#22c55e';                                   // Green (default)
        }),
        borderRadius: 5,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Value: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.navbar}>
        <button style={styles.backButton} onClick={() => navigate('/visualize')}>⟵ Back</button>
        <button style={styles.toggleMode} onClick={toggleDarkMode}>
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>

      <h1 style={styles.title}>Array Visualizer 🚀</h1>

      <p style={styles.description}>
        Arrays are linear data structures where elements are stored in contiguous memory locations.
        Arrays allow random access and are widely used for storing multiple values in a single variable.
      </p>

      <div style={styles.inputSection}>
        <input
          type="number"
          placeholder="Enter value"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={styles.input}
          disabled={isSorting}
        />
        <button onClick={addElement} style={styles.button} disabled={isSorting}>Add</button>
        <button onClick={removeLast} style={{ ...styles.button, backgroundColor: '#f44336' }} disabled={isSorting}>Remove</button>
        <button onClick={bubbleSort} style={{ ...styles.button, backgroundColor: '#007acc' }} disabled={isSorting || array.length < 2}>Sort</button>
        <button onClick={resetArray} style={{ ...styles.button, backgroundColor: '#6b7280' }} disabled={isSorting}>Reset</button>
      </div>

      <div style={styles.arrayContainer}>
        {array.map((val, idx) => (
          <div
            key={idx}
            title={`Index: ${idx}, Value: ${val}`}
            style={{
              ...styles.box,
              backgroundColor:
                highlightIndex === idx
                  ? '#ef4444' // Red if being swapped
                  : compareIndices.includes(idx)
                  ? '#facc15' // Yellow if comparing
                  : darkMode
                  ? '#21262d'
                  : '#ffffff',
              transform: (highlightIndex === idx || compareIndices.includes(idx)) ? 'scale(1.1)' : 'scale(1)',
              transition: 'all 0.3s ease',
            }}
          >
            {val}
          </div>
        ))}
      </div>

      <div style={{ maxWidth: '600px', margin: '40px auto' }}>
        <Bar data={chartData} options={chartOptions} />
      </div>

      <div style={styles.pseudocodeSection}>
        <h3>Pseudocode:</h3>
        <pre style={styles.codeBlock}>
          {pseudocode.map((line, i) => (
            <div key={i} style={{ backgroundColor: pseudocodeLine === i ? '#2563eb' : 'transparent', padding: '2px' }}>{line}</div>
          ))}
        </pre>
      </div>

      <div style={styles.complexityBox}>
        <h3>Time & Space Complexity:</h3>
        <p><strong>Time:</strong> O(n²) — Worst and Average Case<br /><strong>Space:</strong> O(1) — In-place algorithm</p>
      </div>
    </div>
  );
};

const getStyles = (dark) => ({
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    backgroundColor: dark ? '#0d1117' : '#f3f4f6',
    color: dark ? '#c9d1d9' : '#1f2937',
    padding: '20px',
    boxSizing: 'border-box',
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '20px',
  },
  backButton: {
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#2563eb',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  toggleMode: {
    padding: '10px 20px',
    borderRadius: '8px',
    backgroundColor: '#6b7280',
    color: '#fff',
    border: 'none',
    cursor: 'pointer',
  },
  title: {
    color: '#58a6ff',
    marginBottom: '10px',
  },
  description: {
    maxWidth: '800px',
    margin: '0 auto 20px',
    fontSize: '16px',
  },
  inputSection: {
    marginBottom: '20px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginRight: '10px',
    borderRadius: '8px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '0 5px',
    border: 'none',
    borderRadius: '8px',
    backgroundColor: '#238636',
    color: '#fff',
    cursor: 'pointer',
  },
  arrayContainer: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    gap: '10px',
    marginTop: '20px',
  },
  box: {
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '18px',
    fontWeight: 'bold',
    border: '2px solid #58a6ff',
    borderRadius: '8px',
  },
  pseudocodeSection: {
    marginTop: '40px',
    textAlign: 'left',
    maxWidth: '500px',
    marginInline: 'auto',
  },
  codeBlock: {
    backgroundColor: '#1e293b',
    color: '#f8fafc',
    padding: '10px',
    borderRadius: '8px',
    fontFamily: 'monospace',
  },
  complexityBox: {
    marginTop: '30px',
    fontSize: '16px',
  },
});

export default ArrayVisualizer;
