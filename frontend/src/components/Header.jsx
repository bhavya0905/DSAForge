import React from "react";
import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header
      style={{
        backgroundColor: "#111827",
        padding: "1rem 2rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        color: "white",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* Logo / Brand Name */}
      <h2 style={{ color: "#38bdf8", fontWeight: "bold", margin: 0 }}>
        DSAForge
      </h2>

      {/* Navigation Links */}
      <nav>
        {[
          { to: "/", label: "Home" },
          { to: "/topics", label: "Topics" },
          { to: "/practice", label: "Practice" },
          { to: "/visualize", label: "Visualize" },
          { to: "/leaderboard", label: "Leaderboard" },
          { to: "/analytics", label: "Analytics" },
        ].map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            style={({ isActive }) => ({
              color: isActive ? "#facc15" : "#ffffff",
              textDecoration: "none",
              margin: "0 1rem",
              fontSize: "0.95rem",
              fontWeight: 500,
              transition: "color 0.3s ease",
            })}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
};

export default Header;
