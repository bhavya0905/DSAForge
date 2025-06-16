import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const algorithmDetails = {
  'Bubble Sort': {
    pseudocode: `for i = 0 to n-1:
  for j = 0 to n-i-1:
    if arr[j] > arr[j+1]:
      swap(arr[j], arr[j+1])`,
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
  },
  'Selection Sort': {
    pseudocode: `for i = 0 to n-1:
  minIndex = i
  for j = i+1 to n:
    if arr[j] < arr[minIndex]:
      minIndex = j
  swap(arr[i], arr[minIndex])`,
    complexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
  },
  'Insertion Sort': {
    pseudocode: `for i = 1 to n-1:
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key:
    arr[j+1] = arr[j]
    j--
  arr[j+1] = key`,
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
  },
  'Gnome Sort': {
    pseudocode: `index = 0
while index < n:
  if index == 0 or arr[index] >= arr[index-1]:
    index++
  else:
    swap(arr[index], arr[index-1])
    index--`,
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
  },
  'Cocktail Sort': {
    pseudocode: `do:
  swapped = false
  for i = start to end:
    if arr[i] > arr[i+1]:
      swap(arr[i], arr[i+1])
      swapped = true
  if !swapped: break
  swapped = false
  end--
  for i = end to start:
    if arr[i] > arr[i+1]:
      swap(arr[i], arr[i+1])
      swapped = true
  start++
while swapped`,
    complexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)',
      space: 'O(1)',
    },
  },
};

const sortingAlgorithms = {
  'Bubble Sort': async (arr, visualize, speed) => {
    let array = [...arr];
    for (let i = 0; i < array.length - 1; i++) {
      for (let j = 0; j < array.length - i - 1; j++) {
        visualize(array, [j, j + 1]);
        await new Promise((res) => setTimeout(res, speed));
        if (array[j] > array[j + 1]) [array[j], array[j + 1]] = [array[j + 1], array[j]];
      }
    }
    visualize(array, []);
  },
  'Selection Sort': async (arr, visualize, speed) => {
    let array = [...arr];
    for (let i = 0; i < array.length; i++) {
      let min = i;
      for (let j = i + 1; j < array.length; j++) {
        visualize(array, [min, j]);
        await new Promise((res) => setTimeout(res, speed));
        if (array[j] < array[min]) min = j;
      }
      [array[i], array[min]] = [array[min], array[i]];
    }
    visualize(array, []);
  },
  'Insertion Sort': async (arr, visualize, speed) => {
    let array = [...arr];
    for (let i = 1; i < array.length; i++) {
      let key = array[i];
      let j = i - 1;
      while (j >= 0 && array[j] > key) {
        array[j + 1] = array[j];
        visualize(array, [j, j + 1]);
        await new Promise((res) => setTimeout(res, speed));
        j--;
      }
      array[j + 1] = key;
    }
    visualize(array, []);
  },
  'Gnome Sort': async (arr, visualize, speed) => {
    let array = [...arr];
    let index = 0;
    while (index < array.length) {
      if (index === 0 || array[index] >= array[index - 1]) {
        index++;
      } else {
        [array[index], array[index - 1]] = [array[index - 1], array[index]];
        visualize(array, [index, index - 1]);
        await new Promise((res) => setTimeout(res, speed));
        index--;
      }
    }
    visualize(array, []);
  },
  'Cocktail Sort': async (arr, visualize, speed) => {
    let array = [...arr];
    let swapped = true;
    let start = 0, end = array.length - 1;
    while (swapped) {
      swapped = false;
      for (let i = start; i < end; i++) {
        visualize(array, [i, i + 1]);
        await new Promise((res) => setTimeout(res, speed));
        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }
      if (!swapped) break;
      swapped = false;
      end--;
      for (let i = end - 1; i >= start; i--) {
        visualize(array, [i, i + 1]);
        await new Promise((res) => setTimeout(res, speed));
        if (array[i] > array[i + 1]) {
          [array[i], array[i + 1]] = [array[i + 1], array[i]];
          swapped = true;
        }
      }
      start++;
    }
    visualize(array, []);
  },
};

const BasicSortingVisualizer = () => {
  const navigate = useNavigate();
  const [array, setArray] = useState([]);
  const [highlight, setHighlight] = useState([]);
  const [algorithm, setAlgorithm] = useState('Bubble Sort');
  const [speed, setSpeed] = useState(300);
  const [userInput, setUserInput] = useState('');
  const isRunning = useRef(false);

  useEffect(() => generateNewArray(), []);

  const generateNewArray = () => {
    const newArr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(newArr);
    setHighlight([]);
    setUserInput('');
    isRunning.current = false;
  };

  const visualize = (arr, indices) => {
    setArray([...arr]);
    setHighlight(indices);
  };

  const handleStart = async () => {
    if (isRunning.current) return;
    isRunning.current = true;
    await sortingAlgorithms[algorithm](array, visualize, speed);
    isRunning.current = false;
  };

  const handleUserInput = () => {
    const parsed = userInput
      .split(',')
      .map((val) => parseInt(val.trim()))
      .filter((num) => !isNaN(num));
    setArray(parsed);
  };

  return (
    <div style={styles.wrapper}>
      <button style={styles.backBtn} onClick={() => navigate('/visualize')}>⬅ Back</button>
      <h1 style={styles.heading}>🌀 Basic Sorting Visualizer</h1>

      <div style={styles.controls}>
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)} style={styles.dropdown}>
          {Object.keys(sortingAlgorithms).map((algo) => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>

        <input
          type="range"
          min="50"
          max="1000"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
          style={styles.slider}
        />

        <input
          type="text"
          placeholder="Enter numbers e.g. 10,25,4"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onBlur={handleUserInput}
          style={styles.inputBox}
        />

        <button style={styles.playBtn} onClick={handleStart}>▶ Play</button>
        <button style={styles.stopBtn} onClick={generateNewArray}>⏹ Reset</button>
      </div>

      <div style={styles.visualArea}>
        {array.map((value, i) => (
          <div
            key={i}
            style={{
              ...styles.bar,
              height: `${value * 3}px`,
              backgroundColor: highlight.includes(i) ? '#f43f5e' : '#3b82f6',
            }}
          >
            <span style={styles.barText}>{value}</span>
          </div>
        ))}
      </div>

      <div style={styles.details}>
        <h2>{algorithm}</h2>
        <pre style={styles.codeBox}>{algorithmDetails[algorithm].pseudocode}</pre>
        <p><strong>Best Case:</strong> {algorithmDetails[algorithm].complexity.best}</p>
        <p><strong>Average Case:</strong> {algorithmDetails[algorithm].complexity.average}</p>
        <p><strong>Worst Case:</strong> {algorithmDetails[algorithm].complexity.worst}</p>
        <p><strong>Space Complexity:</strong> {algorithmDetails[algorithm].complexity.space}</p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    backgroundColor: '#0f172a',
    color: '#e0f2fe',
    width: '100vw',
    height: '100vh',
    overflowY: 'auto',
    padding: '2rem',
    boxSizing: 'border-box',
    position: 'relative',
  },
  backBtn: {
    position: 'absolute',
    top: 20,
    left: 20,
    backgroundColor: '#1e293b',
    border: '1px solid #38bdf8',
    color: '#38bdf8',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  heading: {
    textAlign: 'center',
    fontSize: '2.5rem',
    color: '#38bdf8',
    marginBottom: '2rem',
  },
  controls: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
    marginBottom: '1.5rem',
    flexWrap: 'wrap',
  },
  dropdown: {
    padding: '0.6rem',
    fontSize: '1rem',
    borderRadius: '6px',
    minWidth: '180px',
  },
  slider: {
    width: '160px',
  },
  inputBox: {
    padding: '0.5rem',
    width: '200px',
    borderRadius: '6px',
    fontSize: '0.9rem',
  },
  playBtn: {
    backgroundColor: '#10b981',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  stopBtn: {
    backgroundColor: '#ef4444',
    color: 'white',
    border: 'none',
    padding: '0.6rem 1.2rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  visualArea: {
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: '5px',
    height: '55vh',
    margin: '2rem 0',
    border: '2px dashed #38bdf8',
    padding: '1rem',
    borderRadius: '10px',
    backgroundColor: '#1e293b',
    overflowX: 'auto',
  },
  bar: {
    width: '22px',
    backgroundColor: '#3b82f6',
    borderRadius: '4px 4px 0 0',
    textAlign: 'center',
    color: 'white',
    fontSize: '0.7rem',
    position: 'relative',
  },
  barText: {
    position: 'absolute',
    bottom: '-1.2rem',
    fontSize: '0.6rem',
  },
  details: {
    maxWidth: '700px',
    margin: 'auto',
    padding: '1rem',
    backgroundColor: '#1e293b',
    border: '1px solid #38bdf8',
    borderRadius: '10px',
    marginTop: '2rem',
  },
  codeBox: {
    backgroundColor: '#0f172a',
    color: '#fefefe',
    padding: '1rem',
    borderRadius: '6px',
    overflowX: 'auto',
  },
};

export default BasicSortingVisualizer;
