import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "null");

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  // ✅ Update screen size on resize
  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ Redirect if profile is incomplete
  useEffect(() => {
    if (user && (!user.username || !user.email)) {
      navigate("/complete-profile");
    }
  }, [user, navigate]);

  // 🔁 Backend connectivity check
  useEffect(() => {
    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:5000";
    fetch(BACKEND_URL)
      .then((res) => res.text())
      .then((data) => {
        console.log("✅ Backend Response:", data);
      })
      .catch((err) => {
        console.error("❌ Error connecting to backend:", err);
      });
  }, []);

  // ✅ Responsive font and layout sizes
  const isMobile = screenWidth <= 480;
  const isTablet = screenWidth > 480 && screenWidth <= 768;

  const styles = {
    page: {
      width: '100vw',
      minHeight: '100vh',
      overflowX: 'hidden',
      backgroundColor: '#0e0e1a',
      color: '#dbeafe',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: isMobile ? '1rem' : '2rem',
      textAlign: 'center',
      boxSizing: 'border-box',
    },
    heading: {
      fontSize: isMobile ? '1.8rem' : isTablet ? '2.2rem' : '2.5rem',
      marginBottom: '0.5rem',
    },
    subheading: {
      fontSize: isMobile ? '1rem' : '1.1rem',
      marginBottom: '2rem',
      color: '#7dd3fc',
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: isMobile ? 'column' : 'row',
      gap: '1rem',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginBottom: '2rem',
      width: '100%',
      alignItems: 'center',
    },
    button: {
      backgroundColor: '#1e293b',
      border: '1px solid #38bdf8',
      color: '#dbeafe',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      borderRadius: '8px',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      width: isMobile ? '100%' : 'auto',
      maxWidth: '250px',
    },
    getStartedButton: {
      backgroundColor: '#38bdf8',
      color: '#0f172a',
      fontWeight: 'bold',
      padding: '0.75rem 1.5rem',
      fontSize: '1rem',
      borderRadius: '8px',
      border: 'none',
      cursor: 'pointer',
      transition: 'all 0.3s ease-in-out',
      marginTop: '1rem',
      width: isMobile ? '100%' : 'auto',
      maxWidth: '250px',
    },
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.heading}>👋 Welcome to DSAForge</h1>

      {/* Removed: "You're not logged in" line */}

      <p style={styles.subheading}>
        Your Ultimate DSA Companion!
        <br />
        Visualize, Practice, and Master DSA – all in one place!
      </p>

      <div style={styles.buttonContainer}>
        <button onClick={() => navigate('/topics')} style={styles.button}>📚 Learn Topics</button>
        <button onClick={() => navigate('/visualize')} style={styles.button}>📊 Visualize</button>
        <button onClick={() => navigate('/practice')} style={styles.button}>🧠 Practice</button>
      </div>

      <button
        onClick={() => navigate('/topics')}
        style={styles.getStartedButton}
      >
        🚀 Get Started
      </button>
    </div>
  );
};

export default HomePage;
