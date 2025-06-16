import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const algorithmDetails = {
  'Merge Sort': {
    definition: 'Merge Sort is a divide and conquer algorithm that splits the array in halves, recursively sorts them and merges them back.',
    pseudocode: `function mergeSort(arr):
  if length of arr <= 1:
    return arr
  mid = length / 2
  left = mergeSort(arr[0:mid])
  right = mergeSort(arr[mid:])
  return merge(left, right)`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)'
    }
  },
  'Quick Sort': {
    definition: 'Quick Sort selects a pivot and partitions the array around the pivot, sorting recursively.',
    pseudocode: `function quickSort(arr):
  if length <= 1:
    return arr
  pivot = arr[end]
  partition into < pivot and > pivot
  return quickSort(left) + pivot + quickSort(right)`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n^2)',
      space: 'O(log n)'
    }
  },
  'Heap Sort': {
    definition: 'Heap Sort builds a heap from the array and repeatedly extracts the maximum element.',
    pseudocode: `function heapSort(arr):
  buildMaxHeap(arr)
  for i from end to start:
    swap arr[0] and arr[i]
    heapify(arr, 0, i)`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(1)'
    }
  },
  'Radix Sort': {
    definition: 'Radix Sort processes digits of numbers starting from least significant to most significant.',
    pseudocode: `function radixSort(arr):
  for digit from LSD to MSD:
    apply counting sort based on digit`,
    complexity: {
      best: 'O(nk)',
      average: 'O(nk)',
      worst: 'O(nk)',
      space: 'O(n + k)'
    }
  },
  'Shell Sort': {
    definition: 'Shell Sort is a generalization of insertion sort that allows exchanges far apart.',
    pseudocode: `function shellSort(arr):
  gap = n / 2
  while gap > 0:
    for i = gap to n:
      temp = arr[i]
      while j >= gap and arr[j - gap] > temp:
        arr[j] = arr[j - gap]
        j -= gap
      arr[j] = temp
    gap /= 2`,
    complexity: {
      best: 'O(n log n)',
      average: 'O(n^(3/2))',
      worst: 'O(n^2)',
      space: 'O(1)'
    }
  },
  'Tim Sort': {
    definition: 'Tim Sort is a hybrid sorting algorithm combining merge sort and insertion sort.',
    pseudocode: `function timSort(arr):
  for i in range(0, n, RUN):
    insertionSort(arr, i, min(i+RUN-1, n-1))
  for size = RUN to n:
    for start in range(0, n, 2*size):
      merge(arr, start, start+size-1, min(start+2*size-1, n-1))`,
    complexity: {
      best: 'O(n)',
      average: 'O(n log n)',
      worst: 'O(n log n)',
      space: 'O(n)'
    }
  }
};

const AdvanceSortingVisualizer = () => {
  const [algorithm, setAlgorithm] = useState('Merge Sort');
  const [array, setArray] = useState([]);
  const [speed, setSpeed] = useState(500);
  const [darkMode, setDarkMode] = useState(true);
  const navigate = useNavigate();

  const handleReset = () => {
    const newArr = Array.from({ length: 20 }, () => Math.floor(Math.random() * 100));
    setArray(newArr);
  };

  useEffect(() => {
    handleReset();
  }, []);

  const handleCustomArray = (e) => {
    const input = e.target.value;
    const arr = input.split(',').map(Number).filter(n => !isNaN(n));
    setArray(arr);
  };

  const details = algorithmDetails[algorithm];

  return (
    <div className={`visualizer-container ${darkMode ? 'dark' : 'light'}`}>
      <div className="header">
        <button className="back-btn" onClick={() => navigate('/visualize')}>⬅ Back</button>
        <h1>Advance Sorting Visualizer</h1>
        <button className="mode-btn" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? '🌞 Light' : '🌙 Dark'}
        </button>
      </div>

      <div className="controls">
        <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
          {Object.keys(algorithmDetails).map((algo) => (
            <option key={algo} value={algo}>{algo}</option>
          ))}
        </select>
        <input
          type="range"
          min="100"
          max="2000"
          step="100"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
        <input
          type="text"
          placeholder="Enter comma separated values"
          onBlur={handleCustomArray}
        />
        <button onClick={handleReset}>Reset</button>
        <button>Play</button>
      </div>

      <div className="bars">
        {array.map((value, index) => (
          <div
            key={index}
            className="bar"
            style={{ height: `${value * 3}px`, width: `${100 / array.length}%` }}
          ></div>
        ))}
      </div>

      <div className="details">
        <h2>{algorithm}</h2>
        <p><strong>Definition:</strong> {details.definition}</p>
        <pre><code>{details.pseudocode}</code></pre>
        <p><strong>Time Complexity:</strong></p>
        <ul>
          <li>Best: {details.complexity.best}</li>
          <li>Average: {details.complexity.average}</li>
          <li>Worst: {details.complexity.worst}</li>
          <li>Space: {details.complexity.space}</li>
        </ul>
      </div>

      <style>{`
        .visualizer-container {
          width: 100vw;
          height: 100vh;
          padding: 20px;
          box-sizing: border-box;
          overflow: auto;
          transition: background 0.3s ease;
        }

        .visualizer-container.dark {
          background: #0f172a;
          color: white;
        }

        .visualizer-container.light {
          background: #f3f4f6;
          color: #1e293b;
        }

        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
          gap: 1rem;
        }

        .back-btn, .mode-btn {
          background: #3b82f6;
          color: white;
          border: none;
          padding: 8px 14px;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.9rem;
        }

        .mode-btn:hover, .back-btn:hover {
          background: #2563eb;
        }

        .controls {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
          margin-bottom: 20px;
        }

        select, input[type='range'], input[type='text'], button {
          padding: 6px 10px;
          border-radius: 5px;
          border: 1px solid #ccc;
          outline: none;
        }

        button {
          background-color: #3b82f6;
          color: white;
          cursor: pointer;
        }

        button:hover {
          background-color: #2563eb;
        }

        .bars {
          display: flex;
          align-items: flex-end;
          height: 300px;
          background: #1e293b;
          margin-bottom: 20px;
          border-radius: 10px;
          overflow: hidden;
        }

        .bar {
          background: #3b82f6;
          margin: 0 1px;
          transition: height 0.3s ease;
        }

        .details {
          background: #1e293b;
          padding: 15px;
          border-radius: 10px;
        }

        .details pre {
          background: #0f172a;
          padding: 10px;
          border-radius: 5px;
          overflow-x: auto;
        }
      `}</style>
    </div>
  );
};

export default AdvanceSortingVisualizer;
