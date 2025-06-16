import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  insert(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) node.children[char] = new TrieNode();
      node = node.children[char];
    }
    node.isEndOfWord = true;
  }

  search(word) {
    let node = this.root;
    for (let char of word) {
      if (!node.children[char]) return false;
      node = node.children[char];
    }
    return node.isEndOfWord;
  }

  delete(word) {
    const deleteHelper = (node, word, depth) => {
      if (!node) return false;
      if (depth === word.length) {
        if (!node.isEndOfWord) return false;
        node.isEndOfWord = false;
        return Object.keys(node.children).length === 0;
      }
      const char = word[depth];
      if (deleteHelper(node.children[char], word, depth + 1)) {
        delete node.children[char];
        return !node.isEndOfWord && Object.keys(node.children).length === 0;
      }
      return false;
    };
    deleteHelper(this.root, word, 0);
  }

  getSuggestions(prefix) {
    const suggestions = [];
    const findNode = (node, pre) => {
      for (let char of pre) {
        if (!node.children[char]) return null;
        node = node.children[char];
      }
      return node;
    };
    const collect = (node, path) => {
      if (node.isEndOfWord) suggestions.push(path);
      for (let char in node.children) collect(node.children[char], path + char);
    };
    const node = findNode(this.root, prefix);
    if (node) collect(node, prefix);
    return suggestions;
  }

  getPath(word) {
    let node = this.root;
    const path = [];
    for (let char of word) {
      if (!node.children[char]) break;
      node = node.children[char];
      path.push(char);
    }
    return path;
  }
}

const MapsAndTriesVisualizer = () => {
  const navigate = useNavigate();
  const [map, setMap] = useState(() => JSON.parse(localStorage.getItem("map") || "{}"));
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");
  const [trie] = useState(new Trie());
  const [trieInput, setTrieInput] = useState("");
  const [trieResult, setTrieResult] = useState(null);
  const [trieWords, setTrieWords] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [highlightPath, setHighlightPath] = useState([]);
  const [darkMode, setDarkMode] = useState(() => JSON.parse(localStorage.getItem("darkMode") || "true"));

  useEffect(() => {
    localStorage.setItem("map", JSON.stringify(map));
  }, [map]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

  const addKeyValue = () => {
    if (key.trim() && value.trim()) {
      setMap((prev) => ({ ...prev, [key]: value }));
      setKey("");
      setValue("");
    }
  };

  const insertInTrie = () => {
    if (trieInput.trim()) {
      trie.insert(trieInput);
      setTrieWords((prev) => [...new Set([...prev, trieInput])]);
      setTrieResult(null);
      setTrieInput("");
    }
  };

  const searchInTrie = () => {
    const found = trie.search(trieInput);
    setTrieResult(found);
    setHighlightPath(trie.getPath(trieInput));
  };

  const deleteFromTrie = () => {
    trie.delete(trieInput);
    setTrieWords((prev) => prev.filter((w) => w !== trieInput));
    setTrieResult(null);
    setTrieInput("");
  };

  const handleAutocomplete = (e) => {
    const val = e.target.value;
    setTrieInput(val);
    if (val.length) setSuggestions(trie.getSuggestions(val));
    else setSuggestions([]);
  };

  const clearAll = () => {
    setMap({});
    setTrieWords([]);
    localStorage.removeItem("map");
  };

  const exportData = () => {
    const blob = new Blob([JSON.stringify({ map, trieWords }, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "maps_and_tries.json";
    a.click();
  };

  const toggleTheme = () => setDarkMode((prev) => !prev);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        backgroundColor: darkMode ? "#0f172a" : "#f1f5f9",
        color: darkMode ? "#f8fafc" : "#0f172a",
        minHeight: "100vh",
        padding: "2rem",
        transition: "all 0.5s ease-in-out",
      }}
    >
      <button onClick={() => navigate(-1)} style={{ marginBottom: "1rem" }}>⬅ Back</button>
      <button onClick={toggleTheme} style={{ float: "right", marginBottom: "1rem" }}>🌓 Toggle Theme</button>
      <h1>🧭 Maps & Tries Visualizer</h1>

      <section>
        <h2>🗺️ Map (Key-Value Pairs)</h2>
        <input value={key} onChange={(e) => setKey(e.target.value)} placeholder="Key" />
        <input value={value} onChange={(e) => setValue(e.target.value)} placeholder="Value" />
        <button onClick={addKeyValue}>Add</button>
        <div>{Object.entries(map).map(([k, v]) => <div key={k}>{k}: {v}</div>)}</div>
      </section>

      <section>
        <h2>🌲 Trie (Prefix Tree)</h2>
        <input value={trieInput} onChange={handleAutocomplete} placeholder="Insert/Search Word" />
        <button onClick={insertInTrie}>Insert</button>
        <button onClick={searchInTrie}>Search</button>
        <button onClick={deleteFromTrie}>Delete</button>
        {suggestions.length > 0 && (
          <ul>{suggestions.map((s, i) => <li key={i} onClick={() => setTrieInput(s)}>{s}</li>)}</ul>
        )}
        {trieResult !== null && (
          <div>🔍 Result: {trieResult ? "Found ✅" : "Not Found ❌"}</div>
        )}
        <SVGTrie words={trieWords} highlightPath={highlightPath} />
      </section>

      <section>
        <h3>📘 Pseudocode: Trie Insertion</h3>
        <pre>
function insert(word):
  node = root
  for char in word:
    if char not in node.children:
      node.children[char] = new TrieNode()
    node = node.children[char]
  node.isEndOfWord = true
        </pre>
        <h3>📗 Algorithm Explanation:</h3>
        <p>We iterate over each character of the input word. If the character is not already present in the children of the current node, we create a new TrieNode for it. Finally, we mark the last node as the end of a valid word.</p>
      </section>

      <div>
        <button onClick={clearAll}>🧹 Clear All</button>
        <button onClick={exportData}>📤 Export JSON</button>
      </div>
    </motion.div>
  );
};

const SVGTrie = ({ words, highlightPath }) => {
  const radius = 20;
  const spacingX = 60;
  const spacingY = 70;
  const renderNode = (node, x, y, depth, path = []) => {
    const entries = Object.entries(node.children);
    return (
      <g key={path.join("")}>...
      </g>
    );
  };

  const root = new Trie();
  words.forEach((word) => root.insert(word));

  return (
    <svg width="100%" height="400">
      <motion.circle
        cx="50%"
        cy="30"
        r="20"
        fill="#1e293b"
        stroke="#38bdf8"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
      <text x="50%" y="35" textAnchor="middle" fill="#f8fafc">root</text>
      {renderNode(root.root, 400, 50, 0)}
    </svg>
  );
};

export default MapsAndTriesVisualizer;
