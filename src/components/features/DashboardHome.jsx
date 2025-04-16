// src/features/DashboardHome.jsx
import React, { useEffect } from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const isValidDate = (dateStr) => {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date) && dateStr !== 'Unknown';
};

const formatDate = (dateStr) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric'
  });
};

const DashboardHome = ({ data }) => {
  // Add debug logging
  useEffect(() => {
    console.log('Raw data sample:', data.slice(0, 5));
    console.log('Data columns:', data[0] ? Object.keys(data[0]) : 'No data');
  }, [data]);

  // Prepare data for different visualizations
  const bookkeepingData = data.reduce((acc, item) => {
    const category = item.Category || 'Other';
    acc[category] = (acc[category] || 0) + parseFloat(item.Amount || 0);
    return acc;
  }, {});

  const taxData = data.map(item => ({
    name: item.TaxCategory || 'General',
    amount: parseFloat(item.TaxAmount || 0)
  }));

  const cashFlowData = data
    .filter(item => isValidDate(item.Date))
    .map(item => ({
      name: item.Date,
      amount: parseFloat(item.CashInflow || 0) - parseFloat(item.CashOutflow || 0)
    }))
    .sort((a, b) => new Date(a.name) - new Date(b.name));

  // Update expense data mapping to use CashOutflow
  const expenseData = data
    .filter(item => {
      const outflowValue = parseFloat(item.CashOutflow || 0);
      return outflowValue > 0 && isValidDate(item.Date);
    })
    .map(item => ({
      name: item.Date,
      amount: parseFloat(item.CashOutflow || 0),
    }))
    .sort((a, b) => new Date(a.name) - new Date(b.name));

  console.log('Processed expense data:', expenseData);

  return (
    <div className="dashboard-overview">
      {/* Stats Summary Row */}
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Income</h3>
          <p>₹{data.reduce((sum, item) => sum + parseFloat(item.CashInflow || 0), 0).toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p>₹{data.reduce((sum, item) => sum + parseFloat(item.CashOutflow || 0), 0).toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Tax</h3>
          <p>₹{data.reduce((sum, item) => sum + parseFloat(item.TaxAmount || 0), 0).toFixed(2)}</p>
        </div>
      </div>

      {/* Charts Grid */}
      <div className="dashboard-grid">
        {/* Category Distribution */}
        <div className="dashboard-card">
          <h3>Category Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <PieChart>
              <Pie
                data={Object.entries(bookkeepingData)
                  .map(([name, value]) => ({ name, value }))
                  .filter(item => item.value > 0)
                  .sort((a, b) => b.value - a.value)
                  .slice(0, 8)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={120}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(1)}%)`}
              >
                {Object.entries(bookkeepingData).map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend layout="vertical" align="right" verticalAlign="middle" />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Tax Distribution */}
        <div className="dashboard-card">
          <h3>Tax Distribution</h3>
          <ResponsiveContainer width="100%" height={350}>
            <BarChart data={taxData.filter(item => item.amount > 0)}>
              <XAxis dataKey="name" angle={-45} textAnchor="end" height={60} />
              <YAxis />
              <Tooltip formatter={(value) => `₹${value.toFixed(2)}`} />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" name="Tax Amount" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Cash Flow Trend */}
        <div className="dashboard-card">
          <h3>Cash Flow Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={cashFlowData} margin={{ top: 5, right: 30, left: 20, bottom: 45 }}>
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short'
                  });
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#82ca9d" 
                name="Net Cash Flow"
                strokeWidth={2} 
                dot={{ r: 3 }} 
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Expense Trend */}
        <div className="dashboard-card">
          <h3>Expense Trend</h3>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={expenseData} margin={{ top: 5, right: 30, left: 20, bottom: 45 }}>
              <XAxis 
                dataKey="name" 
                angle={-45}
                textAnchor="end"
                height={60}
                tickFormatter={(value) => {
                  const date = new Date(value);
                  return date.toLocaleDateString('en-IN', {
                    day: '2-digit',
                    month: 'short'
                  });
                }}
              />
              <YAxis />
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                labelFormatter={(label) => formatDate(label)}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                name="Expenses"
                stroke="#ff6b6b" 
                strokeWidth={2}
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
