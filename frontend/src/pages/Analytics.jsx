import React from 'react';
import {
  PieChart, Pie, Cell,
  BarChart, Bar, XAxis, YAxis, Tooltip,
  LineChart, Line, CartesianGrid, Legend,
  ResponsiveContainer
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const topicProgress = [
  { name: 'Arrays', value: 40 },
  { name: 'Graphs', value: 20 },
  { name: 'DP', value: 15 },
  { name: 'Trees', value: 25 },
];

const practiceStats = [
  { topic: 'Arrays', solved: 30 },
  { topic: 'Graphs', solved: 15 },
  { topic: 'DP', solved: 10 },
  { topic: 'Trees', solved: 20 },
];

const dailyActivity = [
  { date: 'Mon', problems: 4 },
  { date: 'Tue', problems: 6 },
  { date: 'Wed', problems: 3 },
  { date: 'Thu', problems: 5 },
  { date: 'Fri', problems: 8 },
  { date: 'Sat', problems: 2 },
  { date: 'Sun', problems: 7 },
];

const Analytics = () => {
  const containerStyle = {
    padding: '2rem',
    backgroundColor: '#0a0a0a',
    color: '#ffffff',
    minHeight: '100vh',
    fontFamily: 'Arial, sans-serif',
  };

  const headingStyle = {
    textAlign: 'center',
    marginBottom: '3rem',
    fontSize: '2.5rem',
    color: '#00bfff',
  };

  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '2rem',
  };

  const cardStyle = {
    background: '#111',
    padding: '1.5rem',
    borderRadius: '15px',
    boxShadow: '0 0 10px rgba(0, 123, 255, 0.3)',
  };

  const chartTitleStyle = {
    textAlign: 'center',
    marginBottom: '1rem',
    fontSize: '1.25rem',
    color: '#00bfff',
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>📊 User Analytics Dashboard</h2>

      <div style={gridStyle}>
        {/* Topic Progress - Pie Chart */}
        <div style={cardStyle}>
          <h3 style={chartTitleStyle}>Topic Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={topicProgress}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {topicProgress.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Practice Stats - Bar Chart */}
        <div style={cardStyle}>
          <h3 style={chartTitleStyle}>Practice Stats</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={practiceStats}>
              <XAxis dataKey="topic" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Bar dataKey="solved" fill="#00C49F" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Daily Activity - Line Chart */}
        <div style={cardStyle}>
          <h3 style={chartTitleStyle}>Daily Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={dailyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#555" />
              <XAxis dataKey="date" stroke="#fff" />
              <YAxis stroke="#fff" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="problems" stroke="#FF8042" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
