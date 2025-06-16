import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const ProfilePage = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const initials = user?.username?.slice(0, 2).toUpperCase() || "👤";

  return (
    <motion.div
      style={styles.page}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div style={styles.container}>
        {/* Header Section */}
        <motion.div style={styles.headerBox}>
          <div style={styles.avatar}>{initials}</div>
          <div>
            <h1 style={styles.header}>👤 {user?.username || "Guest"}</h1>
            <p style={styles.subtext}>Welcome back to DSAForge!</p>
          </div>
          
          {/* Track Progress Button - Top Right */}
          <motion.button
            style={styles.trackButtonTop}
            onClick={() => navigate("/progress")}
            whileHover={{ scale: 1.05 }}
          >
            📍 Track Progress
          </motion.button>
        </motion.div>

        {/* Redirect to Edit Profile Section */}
        <motion.div style={styles.editCard}>
          <h2 style={styles.sectionTitle}>✏️ Edit Your Profile</h2>
          <p style={styles.subtext}>Keep your profile updated to improve your experience.</p>

          <motion.button
            style={styles.editButton}
            onClick={() => navigate("/complete-profile")}
            whileHover={{ scale: 1.05 }}
          >
            Go to Edit Profile
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

const styles = {
  page: {
    backgroundColor: '#0f172a',
    color: '#dbeafe',
    minHeight: '100vh',
    padding: '2rem',
    fontFamily: 'sans-serif',
    display: 'flex',
    justifyContent: 'center'
  },
  container: {
    maxWidth: '600px',
    width: '100%',
  },
  headerBox: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '2rem',
    gap: '1rem',
    position: 'relative'
  },
  avatar: {
    backgroundColor: '#38bdf8',
    color: '#0f172a',
    width: '64px',
    height: '64px',
    borderRadius: '50%',
    fontSize: '1.5rem',
    fontWeight: 'bold',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  header: {
    fontSize: '1.8rem',
    margin: 0,
    color: '#38bdf8'
  },
  subtext: {
    marginTop: '0.2rem',
    color: '#94a3b8'
  },
  editCard: {
    backgroundColor: '#1e293b',
    padding: '2rem',
    borderRadius: '12px',
    border: '1px solid #334155',
    boxShadow: '0 0 10px rgba(56, 189, 248, 0.1)',
    textAlign: 'center'
  },
  sectionTitle: {
    color: '#7dd3fc',
    marginBottom: '1rem'
  },
  editButton: {
    backgroundColor: '#38bdf8',
    color: '#0f172a',
    padding: '0.6rem 1.4rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer',
    marginTop: '1rem'
  },
  trackButtonTop: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#9333ea',
    color: '#fff',
    padding: '0.5rem 1.1rem',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    cursor: 'pointer'
  }
};

export default ProfilePage;
