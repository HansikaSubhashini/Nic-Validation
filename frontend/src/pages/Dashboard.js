import React from "react";
import "./Dashboard.css";
import Navbar from "../components/Navbar";
import { PieChart, Pie, Cell, Tooltip, BarChart, XAxis, YAxis, Bar, Legend } from "recharts";

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

const Dashboard = () => {
  // Example statistics
  const totalRecords = 160;
  const validRecords = 140;
  const invalidRecords = 20;
  const filesUploaded = 4;

  return (
    <div>
      <Navbar />
      <div className="dashboard-container">
        <h1>Dashboard</h1>

        {/* Cards */}
        <div className="cards">
          <div className="card">
            <h3>Total Records</h3>
            <p>{totalRecords}</p>
          </div>
          <div className="card">
            <h3>Valid Records</h3>
            <p>{validRecords}</p>
          </div>
          <div className="card">
            <h3>Invalid Records</h3>
            <p>{invalidRecords}</p>
          </div>
          <div className="card">
            <h3>Files Uploaded</h3>
            <p>{filesUploaded}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="charts">
          <div className="chart">
            <h3>Gender Distribution</h3>
            <PieChart width={300} height={300}>
              <Pie
                data={genderData}
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
                label
              >
                {genderData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>

          <div className="chart">
            <h3>Age Distribution</h3>
            <BarChart width={400} height={300} data={ageData}>
              <XAxis dataKey="age" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
