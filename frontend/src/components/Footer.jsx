import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaGithub,
  FaLinkedin,
  FaTwitter,
  FaInstagram,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "#1f1f1f",
        color: "#ffffff",
        padding: "2rem 1rem",
        marginTop: "3rem",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-around",
          maxWidth: "1200px",
          margin: "auto",
        }}
      >
        {/* Tutorials */}
        <div style={{ flex: "1 1 200px", margin: "1rem" }}>
          <h4 style={{ color: "#60a5fa" }}>Top Tutorials</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem" }}>
            <li><NavLink to="/topics" style={linkStyle}>DSA Basics</NavLink></li>
            <li><NavLink to="/topics" style={linkStyle}>Time Complexity</NavLink></li>
            <li><NavLink to="/topics" style={linkStyle}>Sorting</NavLink></li>
            <li><NavLink to="/topics" style={linkStyle}>Searching</NavLink></li>
            <li><NavLink to="/topics" style={linkStyle}>Recursion</NavLink></li>
            <li><NavLink to="/topics" style={linkStyle}>Dynamic Programming</NavLink></li>
          </ul>
        </div>

        {/* References */}
        <div style={{ flex: "1 1 200px", margin: "1rem" }}>
          <h4 style={{ color: "#60a5fa" }}>Top References</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem" }}>
            <li><NavLink to="/visualize" style={linkStyle}>Array Reference</NavLink></li>
            <li><NavLink to="/visualize" style={linkStyle}>Linked List Reference</NavLink></li>
            <li><NavLink to="/visualize" style={linkStyle}>Tree Reference</NavLink></li>
            <li><NavLink to="/visualize" style={linkStyle}>Graph Reference</NavLink></li>
            <li><NavLink to="/visualize" style={linkStyle}>HashMap Reference</NavLink></li>
          </ul>
        </div>

        {/* Examples */}
        <div style={{ flex: "1 1 200px", margin: "1rem" }}>
          <h4 style={{ color: "#60a5fa" }}>Top Examples</h4>
          <ul style={{ listStyle: "none", padding: 0, fontSize: "0.85rem" }}>
            <li><NavLink to="/practice" style={linkStyle}>Two Sum Problem</NavLink></li>
            <li><NavLink to="/practice" style={linkStyle}>Binary Search</NavLink></li>
            <li><NavLink to="/practice" style={linkStyle}>Merge Sort</NavLink></li>
            <li><NavLink to="/practice" style={linkStyle}>Fibonacci (Memo)</NavLink></li>
            <li><NavLink to="/practice" style={linkStyle}>Top K Elements</NavLink></li>
          </ul>
        </div>
      </div>

      {/* Contact & Socials */}
      <div style={{ textAlign: "center", marginTop: "2rem" }}>
        <p style={{ fontSize: "0.9rem", marginBottom: "0.5rem" }}>
          📧 <a href="mailto:dsaforge.platform@gmail.com" style={linkStyle}>dsaforge.platform@gmail.com</a> | 📍{" "}
          <a href="https://maps.google.com?q=India" target="_blank" rel="noopener noreferrer" style={linkStyle}>India</a>
        </p>

        {/* Social Icons */}
        <div style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          <a href="https://github.com/dsaforge" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaGithub /></a>
          <a href="https://linkedin.com/in/dsaforge" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaLinkedin /></a>
          <a href="https://twitter.com/dsaforge" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaTwitter /></a>
          <a href="https://instagram.com/dsaforge" target="_blank" rel="noopener noreferrer" style={iconStyle}><FaInstagram /></a>
        </div>
      </div>

      {/* Copyright */}
      <div
        style={{
          borderTop: "1px solid #444",
          marginTop: "2rem",
          paddingTop: "1rem",
          textAlign: "center",
          fontSize: "0.8rem",
          color: "#aaaaaa",
        }}
      >
        © {new Date().getFullYear()} <strong style={{ color: "#facc15" }}>DSAForge</strong>. All rights reserved.
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 600px) {
          footer {
            padding: 1.5rem 1rem;
          }
          footer div {
            text-align: center;
          }
        }

        a:hover {
          color: #38bdf8 !important;
        }

        li:hover {
          color: #38bdf8;
          cursor: pointer;
        }
      `}</style>
    </footer>
  );
};

// Styles
const linkStyle = {
  color: "#ffffff",
  textDecoration: "none",
  transition: "color 0.3s ease",
};

const iconStyle = {
  color: "#ffffff",
  margin: "0 10px",
  transition: "color 0.3s",
};

export default Footer;
