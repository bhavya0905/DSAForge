import React, { useState } from "react";

const Controls = ({ onInsert, onDelete, onSearch, onTraverse }) => {
  const [value, setValue] = useState("");

  return (
    <div style={styles.controls}>
      <input
        type="number"
        placeholder="Enter a number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        style={styles.input}
      />
      <button onClick={() => { onInsert(value); setValue(""); }} style={styles.button}>Insert</button>
      <button onClick={() => { onDelete(value); setValue(""); }} style={styles.button}>Delete</button>
      <button onClick={() => { onSearch(value); setValue(""); }} style={styles.button}>Search</button>
      <select onChange={(e) => onTraverse(e.target.value)} style={styles.select}>
        <option value="">-- Traversal --</option>
        <option value="inorder">Inorder</option>
        <option value="preorder">Preorder</option>
        <option value="postorder">Postorder</option>
      </select>
    </div>
  );
};

const styles = {
  controls: {
    display: "flex",
    gap: "0.5rem",
    flexWrap: "wrap",
    justifyContent: "center",
    marginBottom: "1rem",
  },
  input: {
    padding: "8px",
    width: "150px",
    border: "1px solid #94a3b8",
    borderRadius: "4px",
  },
  button: {
    padding: "8px 12px",
    border: "none",
    backgroundColor: "#0ea5e9",
    color: "white",
    borderRadius: "4px",
    cursor: "pointer",
  },
  select: {
    padding: "8px",
    border: "1px solid #94a3b8",
    borderRadius: "4px",
  },
};

export default Controls;
