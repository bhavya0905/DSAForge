import React, { useEffect, useState } from "react";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await axios.get("http://localhost:5000/leaderboard");
        setLeaderboard(res.data);
      } catch (err) {
        console.error("Error fetching leaderboard", err);
      }
    };
    fetchLeaderboard();
  }, []);

  // Inline styles
  const containerStyle = {
    maxWidth: "800px",
    margin: "50px auto",
    backgroundColor: "#101820",
    padding: "30px",
    borderRadius: "20px",
    boxShadow: "0 0 15px rgba(0, 123, 255, 0.3)",
    color: "#ffffff",
    textAlign: "center",
  };

  const headingStyle = {
    fontSize: "32px",
    marginBottom: "20px",
    color: "#00bfff",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "10px",
  };

  const thStyle = {
    backgroundColor: "#1a1a2e",
    color: "#00bfff",
    padding: "15px",
    borderBottom: "1px solid #333",
    fontSize: "18px",
  };

  const tdStyle = {
    padding: "15px",
    borderBottom: "1px solid #333",
    fontSize: "18px",
  };

  const rowHoverStyle = {
    backgroundColor: "#222",
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>🏆 Leaderboard</h2>
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Rank</th>
            <th style={thStyle}>Username</th>
            <th style={thStyle}>Questions Solved</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr
              key={user.id}
              style={index % 2 === 0 ? {} : rowHoverStyle} // alternating row style
            >
              <td style={tdStyle}>#{index + 1}</td>
              <td style={tdStyle}>{user.username}</td>
              <td style={tdStyle}>{user.totalSolved}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
