import React from "react";

const Node = ({ value, x, y, isHighlighted }) => {
  return (
    <g>
      <circle cx={x} cy={y} r="20" fill={isHighlighted ? "#facc15" : "#38bdf8"} />
      <text x={x} y={y + 5} textAnchor="middle" fontSize="14" fill="#fff">{value}</text>
    </g>
  );
};

const drawTree = (node, x, y, level = 1, spacing = 200, result = [], parent = null) => {
  if (!node) return;

  result.push({ value: node.value, x, y, parent });

  const childY = y + 80;
  if (node.left) drawTree(node.left, x - spacing / level, childY, level + 1, spacing, result, { x, y });
  if (node.right) drawTree(node.right, x + spacing / level, childY, level + 1, spacing, result, { x, y });

  return result;
};

const TreeRenderer = ({ root, highlightedNode }) => {
  const nodes = drawTree(root, 400, 50) || [];

  return (
    <svg width="100%" height="400">
      {nodes.map((node, i) =>
        node.parent ? (
          <line
            key={i}
            x1={node.parent.x}
            y1={node.parent.y}
            x2={node.x}
            y2={node.y}
            stroke="#334155"
            strokeWidth="2"
          />
        ) : null
      )}
      {nodes.map((node, i) => (
        <Node key={i} value={node.value} x={node.x} y={node.y} isHighlighted={node.value === highlightedNode} />
      ))}
    </svg>
  );
};

export default TreeRenderer;
