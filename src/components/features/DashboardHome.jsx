// src/components/features/DashboardHome.jsx
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = ({ data }) => {
  return (
    <div>
      <h2>Dashboard Overview</h2>
      {data.length === 0 ? (
        <p>No data available. Please upload a CSV file.</p>
      ) : (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="income" fill="#4CAF50" />
            <Bar dataKey="expenses" fill="#F44336" />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};

export default DashboardHome;
