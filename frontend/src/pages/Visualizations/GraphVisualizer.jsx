// Enhanced GraphVisualizer Component with
// - Path Highlighting
// - Animation Speed Control
// - Directed/Undirected Graph Toggle
// - Prim's and Kruskal's MST Support

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const parseGraphInput = (input, isDirected) => {
  const graph = {};
  const lines = input.split('\n');
  lines.forEach(line => {
    const [node, neighbors] = line.split(':');
    if (!graph[node.trim()]) graph[node.trim()] = [];
    (neighbors || '').split(',').forEach(n => {
      const [label, weight] = n.split('-');
      if (!label) return;
      graph[node.trim()].push({ node: label.trim(), weight: weight ? parseInt(weight) : 1 });
      if (!isDirected) {
        if (!graph[label.trim()]) graph[label.trim()] = [];
        graph[label.trim()].push({ node: node.trim(), weight: weight ? parseInt(weight) : 1 });
      }
    });
  });
  return graph;
};

const GraphVisualizer = () => {
  const navigate = useNavigate();
  const [graphType, setGraphType] = useState('BFS');
  const [graphData, setGraphData] = useState('');
  const [output, setOutput] = useState([]);
  const [visitedNodes, setVisitedNodes] = useState([]);
  const [positions, setPositions] = useState({});
  const [theme, setTheme] = useState('dark');
  const [animationSpeed, setAnimationSpeed] = useState(500);
  const [isDirected, setIsDirected] = useState(true);
  const [highlightedEdges, setHighlightedEdges] = useState([]);

  const isDark = theme === 'dark';
  const colors = {
    bg: isDark ? '#0f172a' : '#f1f5f9',
    text: isDark ? '#dbeafe' : '#0f172a',
    accent: '#38bdf8',
    cardBg: isDark ? '#1e293b' : '#e2e8f0',
    border: '#38bdf8',
    inputText: isDark ? 'white' : '#0f172a',
  };

  const graph = parseGraphInput(graphData, isDirected);

  useEffect(() => {
    const keys = Object.keys(graph);
    const newPos = {};
    keys.forEach((node, i) => {
      newPos[node] = {
        x: 100 + 400 * Math.random(),
        y: 100 + 200 * Math.random()
      };
    });
    setPositions(newPos);
  }, [graphData, isDirected]);

  const handleVisualize = () => {
    setVisitedNodes([]);
    setHighlightedEdges([]);
    switch (graphType) {
      case 'BFS': runBFS(); break;
      case 'DFS': runDFS(); break;
      case 'Dijkstra': runDijkstra(); break;
      case 'Topological Sort': runTopologicalSort(); break;
      case "Prim's MST": runPrims(); break;
      case "Kruskal's MST": runKruskals(); break;
      default: setOutput(['Not implemented.']); break;
    }
  };

  const animateSteps = (steps, edges = []) => {
    steps.forEach((node, i) => {
      setTimeout(() => {
        setVisitedNodes(prev => [...prev, node]);
      }, i * animationSpeed);
    });
    edges.forEach(([from, to], i) => {
      setTimeout(() => {
        setHighlightedEdges(prev => [...prev, [from, to]]);
      }, i * animationSpeed);
    });
  };

  const runBFS = () => {
    const start = Object.keys(graph)[0];
    const visited = new Set();
    const queue = [start];
    const result = [];
    const steps = [];
    const edgePath = [];

    while (queue.length) {
      const node = queue.shift();
      if (!visited.has(node)) {
        visited.add(node);
        result.push(`Visited ${node}`);
        steps.push(node);
        graph[node]?.forEach(n => {
          if (!visited.has(n.node)) {
            queue.push(n.node);
            edgePath.push([node, n.node]);
          }
        });
      }
    }
    animateSteps(steps, edgePath);
    setOutput(result);
  };

  const runDFS = () => {
    const start = Object.keys(graph)[0];
    const visited = new Set();
    const result = [];
    const steps = [];
    const edgePath = [];

    const dfs = (node) => {
      visited.add(node);
      result.push(`Visited ${node}`);
      steps.push(node);
      graph[node]?.forEach(n => {
        if (!visited.has(n.node)) {
          edgePath.push([node, n.node]);
          dfs(n.node);
        }
      });
    };
    dfs(start);
    animateSteps(steps, edgePath);
    setOutput(result);
  };

  const runDijkstra = () => {
    // [Same as original]
  };

  const runTopologicalSort = () => {
    // [Same as original]
  };

  const runPrims = () => {
    const nodes = Object.keys(graph);
    if (!nodes.length) return;
    const visited = new Set();
    const result = [];
    const edges = [];
    visited.add(nodes[0]);

    while (visited.size < nodes.length) {
      let minEdge = null;
      let minWeight = Infinity;
      visited.forEach(node => {
        graph[node].forEach(neighbor => {
          if (!visited.has(neighbor.node) && neighbor.weight < minWeight) {
            minWeight = neighbor.weight;
            minEdge = [node, neighbor.node];
          }
        });
      });
      if (minEdge) {
        visited.add(minEdge[1]);
        edges.push(minEdge);
        result.push(`Edge ${minEdge[0]} - ${minEdge[1]} (${minWeight})`);
      } else break;
    }
    animateSteps([...visited], edges);
    setOutput(["Prim's MST:", ...result]);
  };

  const runKruskals = () => {
    const parent = {};
    const find = (x) => parent[x] === x ? x : parent[x] = find(parent[x]);
    const union = (x, y) => parent[find(x)] = find(y);
    const edges = [];

    Object.keys(graph).forEach(node => {
      parent[node] = node;
      graph[node].forEach(n => {
        edges.push([node, n.node, n.weight]);
      });
    });
    edges.sort((a, b) => a[2] - b[2]);
    const result = [];
    const mstEdges = [];

    edges.forEach(([u, v, w]) => {
      if (find(u) !== find(v)) {
        union(u, v);
        result.push(`Edge ${u} - ${v} (${w})`);
        mstEdges.push([u, v]);
      }
    });
    animateSteps([], mstEdges);
    setOutput(["Kruskal's MST:", ...result]);
  };

  const renderEdges = () => {
    const elements = [];
    Object.entries(graph).forEach(([node, neighbors]) => {
      neighbors.forEach(neighbor => {
        const from = positions[node];
        const to = positions[neighbor.node];
        if (from && to) {
          const isHighlighted = highlightedEdges.some(([f, t]) =>
            (f === node && t === neighbor.node) || (!isDirected && f === neighbor.node && t === node)
          );
          elements.push(
            <g key={`${node}-${neighbor.node}`}>
              <line
                x1={from.x + 20}
                y1={from.y + 20}
                x2={to.x + 20}
                y2={to.y + 20}
                stroke={isHighlighted ? "#16a34a" : "#94a3b8"}
                strokeWidth={isHighlighted ? 3 : 2}
              />
              <text
                x={(from.x + to.x) / 2 + 20}
                y={(from.y + to.y) / 2 + 20}
                fill="#e2e8f0"
                fontSize="14"
                textAnchor="middle"
              >
                {neighbor.weight}
              </text>
            </g>
          );
        }
      });
    });
    return elements;
  };

  const renderNodes = () => {
    return Object.keys(graph).map(node => {
      const pos = positions[node] || { x: 50, y: 50 };
      const isVisited = visitedNodes.includes(node);
      return (
        <motion.div
          key={node}
          initial={{ scale: 0.8 }}
          animate={{ scale: isVisited ? 1.2 : 1, backgroundColor: isVisited ? '#22c55e' : colors.cardBg }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'absolute',
            top: pos.y,
            left: pos.x,
            width: 40,
            height: 40,
            borderRadius: '50%',
            backgroundColor: colors.cardBg,
            border: `2px solid ${colors.accent}`,
            color: colors.text,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold'
          }}
        >
          {node}
        </motion.div>
      );
    });
  };

  return (
    <div style={{ backgroundColor: colors.bg, color: colors.text, padding: '2rem', minHeight: '100vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <button onClick={() => navigate(-1)} style={{ backgroundColor: colors.accent, padding: '0.5rem 1rem', borderRadius: 8, color: '#fff' }}>⬅ Back</button>
        <h1 style={{ color: colors.accent }}>📊 Graph Visualizer</h1>
        <button onClick={() => setTheme(isDark ? 'light' : 'dark')} style={{ backgroundColor: isDark ? '#facc15' : '#1e3a8a', color: '#fff', padding: '0.5rem 1rem', borderRadius: 8 }}>{isDark ? '🌞 Light' : '🌙 Dark'}</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label>Algorithm:</label>
        <select value={graphType} onChange={e => setGraphType(e.target.value)} style={{ marginLeft: '1rem', padding: '0.5rem' }}>
          <option value="BFS">BFS</option>
          <option value="DFS">DFS</option>
          <option value="Dijkstra">Dijkstra</option>
          <option value="Topological Sort">Topological Sort</option>
          <option value="Prim's MST">Prim's MST</option>
          <option value="Kruskal's MST">Kruskal's MST</option>
        </select>

        <label style={{ marginLeft: '2rem' }}>Speed:</label>
        <input type="range" min="100" max="2000" step="100" value={animationSpeed} onChange={e => setAnimationSpeed(+e.target.value)} />
        <span style={{ marginLeft: 8 }}>{animationSpeed}ms</span>

        <label style={{ marginLeft: '2rem' }}>Directed:</label>
        <input type="checkbox" checked={isDirected} onChange={e => setIsDirected(e.target.checked)} />
      </div>

      <textarea
        placeholder={`A:B-3,C-2\nB:D-1\nC:D-4\nD:`}
        value={graphData}
        onChange={e => setGraphData(e.target.value)}
        style={{ width: '100%', height: 120, marginBottom: '1rem', padding: '0.75rem', borderRadius: 8, backgroundColor: colors.cardBg, color: colors.inputText }}
      />

      <button onClick={handleVisualize} style={{ backgroundColor: colors.accent, padding: '0.6rem 1.2rem', color: '#fff', border: 'none', borderRadius: 8 }}>▶ Visualize</button>

      <div style={{ marginTop: '2rem' }}>
        <h2>🔍 Output:</h2>
        <ul style={{ lineHeight: '1.8', paddingLeft: '1rem' }}>
          {output.map((line, idx) => <li key={idx}>{line}</li>)}
        </ul>
      </div>

      <div style={{ marginTop: '3rem', position: 'relative', height: '500px', backgroundColor: isDark ? '#1e293b' : '#f1f5f9', borderRadius: 12 }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', top: 0, left: 0 }}>
          {renderEdges()}
        </svg>
        {renderNodes()}
      </div>
    </div>
  );
};

export default GraphVisualizer;
