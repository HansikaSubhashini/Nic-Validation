// Dashboard.js

import React from "react";
import "./Dashboard.css";
// 1. IMPORT THE NAVBAR COMPONENT AT THE TOP
import Navbar from "../components/Navbar"; // <-- ADD THIS LINE (Adjust path if needed)
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, XAxis, YAxis, Bar, ResponsiveContainer } from "recharts";

// ... (your genderData and ageData constants remain the same)
const genderData = [
  { name: "Male", value: 60 },
  { name: "Female", value: 40 },
];

const ageData = [
  { age: "18-25", count: 30 },
  { age: "26-35", count: 50 },
  { age: "36-45", count: 20 },
  { age: "46+", count: 10 },
];

const COLORS = ["#0088FE", "#FF8042"];


function Dashboard() {
  return (
    // Use a React Fragment <> to wrap both elements
    <>
      {/* 2. ADD THE NAVBAR COMPONENT HERE, BEFORE THE DASHBOARD CONTENT */}
      <Navbar /> 

      <div className="dashboard-container">
        {/* Cards Section */}
        <div className="card-container">
            {/*... your cards ...*/}
            <div className="card">
                <h3>Total Records</h3>
                <p>120</p>
            </div>
            <div className="card">
                <h3>Valid Records</h3>
                <p>95</p>
            </div>
            <div className="card">
                <h3>Invalid Records</h3>
                <p>25</p>
            </div>
            <div className="card">
                <h3>Files Uploaded</h3>
                <p>8</p>
            </div>
        </div>

        {/* Charts Section */}
        <div className="charts-container">
          {/* ... your charts ... */}
          <div className="chart-section">
            <h3>Gender Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={genderData} dataKey="value" outerRadius={100} label>
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h3>Age Distribution</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={ageData}>
                <XAxis dataKey="age" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;