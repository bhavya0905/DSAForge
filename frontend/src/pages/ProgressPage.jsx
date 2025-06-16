import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

const topicProgress = [
  { topic: "Arrays", completion: 80 },
  { topic: "Searching", completion: 60 },
  { topic: "Sorting", completion: 45 },
  { topic: "Graphs", completion: 30 },
  { topic: "Recursion", completion: 70 },
  { topic: "DP", completion: 25 },
];

const difficultyData = [
  { name: "Easy", value: 20 },
  { name: "Medium", value: 40 },
  { name: "Hard", value: 10 },
];

const COLORS = ["#22c55e", "#eab308", "#ef4444"];

const ProgressPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <h1 style={styles.header}>📍 Track Your Progress</h1>

        {loading ? (
          <div style={styles.loading}>Fetching your progress...</div>
        ) : (
          <>
            <div style={styles.summary}>
              <p>Here's how you're doing in each topic and overall difficulty distribution.</p>
            </div>

            {/* Circular Progress for Each Topic */}
            <div style={styles.circularSection}>
              {topicProgress.map((item, index) => (
                <div key={index} style={styles.circleContainer}>
                  <svg width="100" height="100" viewBox="0 0 36 36" style={{ transform: "rotate(-90deg)" }}>
                    <path
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#334155"
                      strokeWidth="3.8"
                    />
                    <path
                      d="M18 2.0845
                         a 15.9155 15.9155 0 0 1 0 31.831
                         a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="3.8"
                      strokeDasharray={`${item.completion}, 100`}
                      strokeLinecap="round"
                    />
                    <text
                      x="18"
                      y="20.35"
                      style={{
                        fill: "#dbeafe",
                        fontSize: "0.5rem",
                        textAnchor: "middle",
                        dominantBaseline: "middle",
                        transform: "rotate(90deg)",
                      }}
                    >
                      {item.completion}%
                    </text>
                  </svg>
                  <p style={styles.circleLabel}>{item.topic}</p>
                </div>
              ))}
            </div>

            {/* Pie Chart Section */}
            <div style={styles.pieSection}>
              <h3 style={styles.pieTitle}>🧠 Difficulty Level Breakdown</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={difficultyData}
                    dataKey="value"
                    nameKey="name"
                    outerRadius={80}
                    label
                  >
                    {difficultyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const styles = {
  page: {
    backgroundColor: "#0f172a",
    color: "#dbeafe",
    minHeight: "100vh",
    padding: "2rem",
    fontFamily: "sans-serif",
  },
  container: {
    maxWidth: "1100px",
    margin: "0 auto",
  },
  header: {
    color: "#38bdf8",
    fontSize: "2rem",
    marginBottom: "1rem",
  },
  loading: {
    textAlign: "center",
    color: "#facc15",
    fontSize: "1.2rem",
  },
  summary: {
    marginBottom: "2rem",
    fontSize: "1.1rem",
    color: "#94a3b8",
  },
  circularSection: {
    display: "flex",
    flexWrap: "wrap",
    gap: "2rem",
    justifyContent: "center",
    marginBottom: "3rem",
  },
  circleContainer: {
    textAlign: "center",
    width: "120px",
  },
  circleLabel: {
    marginTop: "0.5rem",
    fontSize: "0.9rem",
    color: "#cbd5e1",
  },
  pieSection: {
    backgroundColor: "#1e293b",
    padding: "1rem",
    borderRadius: "10px",
    border: "1px solid #334155",
  },
  pieTitle: {
    color: "#7dd3fc",
    marginBottom: "1rem",
    textAlign: "center",
  },
};

export default ProgressPage;
