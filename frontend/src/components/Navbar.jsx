import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen((prev) => !prev);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    checkLogin();
    window.addEventListener("storage", checkLogin);
    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    navigate("/login");
  };

  const linkStyle = {
    color: "white",
    textDecoration: "none",
    fontSize: "0.9rem",
    fontWeight: "500",
  };

  const activeLinkStyle = {
    color: "gold",
    textDecoration: "underline",
  };

  const navItems = [
    { to: "/", label: "Home 🧩" },
    { to: "/topics", label: "Topics 📚" },
    { to: "/practice", label: "Practice 🧠" },
    { to: "/visualize", label: "Visualize 📊" },
    { to: "/leaderboard", label: "Leaderboard 🏆" },
    { to: "/analytics", label: "Analytics 📈" },
  ];

  return (
    <nav
      style={{
        backgroundColor: "#1f1f1f",
        padding: "0.8rem 1rem",
        position: "sticky",
        top: 0,
        zIndex: 999,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {/* ✅ Updated Project Name: DSAForge with Two-Tone Style */}
        <div style={{ fontSize: "1.3rem", fontWeight: "bold" }}>
          <span style={{ color: "#0ea5e9" }}>DSA</span>
          <span style={{ color: "#facc15" }}>Forge</span>
        </div>

        {!isMobile && (
          <ul
            style={{
              listStyle: "none",
              display: "flex",
              gap: "14px",
              margin: 0,
              marginLeft: "auto",
              marginRight: "8rem",
              padding: 0,
            }}
          >
            {navItems.map(({ to, label }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  style={({ isActive }) =>
                    isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
                  }
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {!isMobile && (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            {isLoggedIn && (
              <button
                onClick={() => navigate("/profile")}
                style={{ ...buttonStyle, backgroundColor: "#22c55e" }}
              >
                Profile
              </button>
            )}
            {!isLoggedIn ? (
              <>
                <button onClick={() => navigate("/login")} style={buttonStyle}>
                  Login
                </button>
                <button
                  onClick={() => navigate("/signup")}
                  style={{ ...buttonStyle, backgroundColor: "#3b82f6" }}
                >
                  Sign Up
                </button>
              </>
            ) : (
              <button onClick={handleLogout} style={buttonStyle}>
                Logout
              </button>
            )}
          </div>
        )}

        {isMobile && (
          <div
            onClick={toggleMenu}
            style={{
              cursor: "pointer",
              fontSize: "1.6rem",
              color: "white",
              userSelect: "none",
              marginLeft: "auto",
            }}
          >
            {menuOpen ? "✖" : "☰"}
          </div>
        )}
      </div>

      {isMobile && menuOpen && (
        <ul
          style={{
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            backgroundColor: "#1f1f1f",
            position: "absolute",
            top: "60px",
            left: 0,
            width: "100%",
            padding: "0.8rem 0",
            margin: 0,
            zIndex: 998,
            borderTop: "1px solid #444",
          }}
        >
          {navItems.map(({ to, label }) => (
            <li key={to} style={{ padding: "0.4rem 1.2rem" }}>
              <NavLink
                to={to}
                style={({ isActive }) =>
                  isActive ? { ...linkStyle, ...activeLinkStyle } : linkStyle
                }
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </NavLink>
            </li>
          ))}

          {isLoggedIn && (
            <li style={{ padding: "0.4rem 1.2rem" }}>
              <button
                onClick={() => {
                  navigate("/profile");
                  setMenuOpen(false);
                }}
                style={{ ...buttonStyle, backgroundColor: "#22c55e", width: "100%" }}
              >
                Profile
              </button>
            </li>
          )}

          <li style={{ padding: "0.4rem 1.2rem" }}>
            {!isLoggedIn ? (
              <button
                onClick={() => {
                  navigate("/login");
                  setMenuOpen(false);
                }}
                style={{ ...buttonStyle, width: "100%" }}
              >
                Login
              </button>
            ) : (
              <button
                onClick={() => {
                  handleLogout();
                  setMenuOpen(false);
                }}
                style={{ ...buttonStyle, width: "100%" }}
              >
                Logout
              </button>
            )}
          </li>

          {!isLoggedIn && (
            <li style={{ padding: "0.4rem 1.2rem" }}>
              <button
                onClick={() => {
                  navigate("/signup");
                  setMenuOpen(false);
                }}
                style={{
                  ...buttonStyle,
                  backgroundColor: "#3b82f6",
                  width: "100%",
                }}
              >
                Sign Up
              </button>
            </li>
          )}
        </ul>
      )}
    </nav>
  );
};

const buttonStyle = {
  padding: "0.3rem 0.6rem",
  backgroundColor: "#38bdf8",
  color: "#0f172a",
  border: "none",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "600",
  fontSize: "0.85rem",
};

export default Navbar;
