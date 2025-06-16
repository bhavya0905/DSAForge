import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const ProfileEditor = () => {
  const [profile, setProfile] = useState({
    name: "",
    gender: "",
    location: "",
    birthday: "",
    summary: "",
    website_links: "",
    github: "",
    linkedin: "",
    twitter: "",
    experience: "",
    education: "",
    skills: ""
  });

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/user/profile/${user.id}`)
      .then((res) => res.json())
      .then((data) => {
        if (data) setProfile(data);
      })
      .catch((err) => console.error("Failed to fetch profile:", err));
  }, [user.id]);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    fetch(`http://localhost:5000/user/profile/${user.id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(profile)
    })
      .then((res) => res.json())
      .then((data) => alert("✅ Profile updated successfully!"))
      .catch((err) => alert("❌ Failed to update profile."));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      style={styles.container}
    >
      <h2 style={styles.heading}>📝 Complete Your Profile</h2>

      {[
        "name", "gender", "location", "birthday", "summary",
        "website_links", "github", "linkedin", "twitter",
        "experience", "education", "skills"
      ].map((field) => (
        <div key={field} style={styles.inputGroup}>
          <label style={styles.label}>{field.replace(/_/g, " ").toUpperCase()}</label>
          <textarea
            name={field}
            value={profile[field]}
            onChange={handleChange}
            style={styles.input}
            rows={field === "summary" || field === "experience" || field === "education" ? 3 : 1}
          />
        </div>
      ))}

      <motion.button
        style={styles.button}
        onClick={handleSave}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        Save Profile
      </motion.button>
    </motion.div>
  );
};

const styles = {
  container: {
    padding: "2rem",
    backgroundColor: "#0f172a",
    color: "#dbeafe",
    minHeight: "100vh",
    fontFamily: "sans-serif"
  },
  heading: {
    fontSize: "2rem",
    color: "#38bdf8",
    marginBottom: "1.5rem"
  },
  inputGroup: {
    marginBottom: "1rem"
  },
  label: {
    display: "block",
    fontWeight: "bold",
    marginBottom: "0.4rem"
  },
  input: {
    width: "100%",
    padding: "0.6rem",
    backgroundColor: "#1e293b",
    color: "#dbeafe",
    border: "1px solid #38bdf8",
    borderRadius: "8px",
    resize: "vertical"
  },
  button: {
    marginTop: "1.5rem",
    padding: "0.8rem 1.6rem",
    backgroundColor: "#38bdf8",
    color: "#0f172a",
    border: "none",
    borderRadius: "8px",
    fontWeight: "bold",
    cursor: "pointer"
  }
};

export default ProfileEditor;
