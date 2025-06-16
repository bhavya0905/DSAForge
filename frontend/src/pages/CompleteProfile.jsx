import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CompleteProfile = () => {
  const navigate = useNavigate();

  const [profile, setProfile] = useState({
    name: 'Bhavya Jain',
    gender: 'Female',
    location: 'India, Madhya Pradesh, Indore',
    birthday: '2004-05-09',
    summary: `I am a 3rd-year Computer Science Engineering student with a strong interest in data structures and algorithm and software development. I am proficient in C, C++, Python, Java, and JavaScript, and I enjoy solving coding problems on platforms like LeetCode. Currently, I am looking forward to internships where I can apply my skills and gain hands-on experience in the software development field. My ultimate goal is to contribute to innovative and impactful tech solutions.`,
    websites: [
      'https://github.com/bhavya0905/Watch-Store',
      'https://github.com/bhavya0905/Analog-clock',
      'https://github.com/bhavya0905/Tic-Tac-Toe'
    ],
    github: 'https://github.com/bhavya0905',
    linkedin: 'https://linkedin.com/in/bhavya-jain-2ba9b7301',
    twitter: '',
    experience: '',
    education: '',
    skills: 'python, java, html, css, javascript, DBMS, OOPS, MySQL, C, C++'
  });

  const handleChange = (field, value) => {
    setProfile({ ...profile, [field]: value });
  };

  const handleWebsiteChange = (index, value) => {
    const updated = [...profile.websites];
    updated[index] = value;
    setProfile({ ...profile, websites: updated });
  };

  const handleAddWebsite = () => {
    setProfile({ ...profile, websites: [...profile.websites, ''] });
  };

  const handleSave = () => {
    console.log("Saving profile:", profile);
    alert("✅ Profile saved successfully!");
    // Later: Send this data to backend via fetch/axios
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📝 Complete Your Profile</h1>

      {/* Basic Info */}
      <div style={styles.section}>
        <h2>Basic Info</h2>
        <label>Name:<input value={profile.name} onChange={e => handleChange('name', e.target.value)} /></label>
        <label>Gender:<input value={profile.gender} onChange={e => handleChange('gender', e.target.value)} /></label>
        <label>Location:<input value={profile.location} onChange={e => handleChange('location', e.target.value)} /></label>
        <label>Birthday:<input type="date" value={profile.birthday} onChange={e => handleChange('birthday', e.target.value)} /></label>
      </div>

      {/* Summary */}
      <div style={styles.section}>
        <h2>Summary</h2>
        <textarea rows="5" value={profile.summary} onChange={e => handleChange('summary', e.target.value)} />
      </div>

      {/* Websites */}
      <div style={styles.section}>
        <h2>Websites</h2>
        {profile.websites.map((url, index) => (
          <input key={index} value={url} onChange={e => handleWebsiteChange(index, e.target.value)} style={{ marginBottom: "0.5rem" }} />
        ))}
        <button style={styles.addBtn} onClick={handleAddWebsite}>+ Add Website</button>
      </div>

      {/* Links */}
      <div style={styles.section}>
        <h2>Links</h2>
        <label>GitHub:<input value={profile.github} onChange={e => handleChange('github', e.target.value)} /></label>
        <label>LinkedIn:<input value={profile.linkedin} onChange={e => handleChange('linkedin', e.target.value)} /></label>
        <label>Twitter:<input value={profile.twitter} onChange={e => handleChange('twitter', e.target.value)} /></label>
      </div>

      {/* Experience & Education */}
      <div style={styles.section}>
        <h2>Experience</h2>
        <textarea rows="3" value={profile.experience} onChange={e => handleChange('experience', e.target.value)} placeholder="Add your workplace or internships..." />
        <h2>Education</h2>
        <textarea rows="3" value={profile.education} onChange={e => handleChange('education', e.target.value)} placeholder="Add your school or university..." />
      </div>

      {/* Skills */}
      <div style={styles.section}>
        <h2>Technical Skills</h2>
        <input value={profile.skills} onChange={e => handleChange('skills', e.target.value)} placeholder="Comma-separated e.g. HTML, CSS, JS" />
      </div>

      {/* Buttons */}
      <div style={styles.buttonGroup}>
        <button style={styles.saveBtn} onClick={handleSave}>💾 Save Changes</button>
        <button style={styles.backBtn} onClick={() => navigate('/profile')}>← Back to Profile</button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#0f172a',
    color: '#dbeafe',
    fontFamily: 'sans-serif',
    minHeight: '100vh'
  },
  title: {
    fontSize: '2rem',
    marginBottom: '2rem',
    color: '#38bdf8'
  },
  section: {
    marginBottom: '2rem',
    backgroundColor: '#1e293b',
    padding: '1rem',
    borderRadius: '10px'
  },
  addBtn: {
    backgroundColor: '#334155',
    color: '#fff',
    padding: '0.5rem 1rem',
    border: 'none',
    borderRadius: '6px',
    marginTop: '0.5rem',
    cursor: 'pointer'
  },
  saveBtn: {
    backgroundColor: '#22c55e',
    color: '#0f172a',
    padding: '0.6rem 1.4rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer'
  },
  backBtn: {
    backgroundColor: '#38bdf8',
    color: '#0f172a',
    padding: '0.6rem 1.4rem',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    marginLeft: '1rem'
  },
  buttonGroup: {
    marginTop: '2rem'
  }
};

export default CompleteProfile;
