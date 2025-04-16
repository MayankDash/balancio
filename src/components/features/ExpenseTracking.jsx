import React from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

// Add this helper function at the top after imports
const isValidDate = (dateStr) => {
  const date = new Date(dateStr);
  return date instanceof Date && !isNaN(date) && dateStr !== 'Unknown';
};

const ExpenseTracking = ({ data, selectedChart }) => {
  // Update groupExpensesByCategory to only include valid dates
  const groupExpensesByCategory = (data) => {
    const grouped = data
      .filter(item => isValidDate(item.Date))
      .reduce((acc, item) => {
        const category = item.Category || item.ExpenseType || 'Other';
        const amount = parseFloat(item.CashOutflow || 0);
        
        if (amount > 0) {
          acc[category] = (acc[category] || 0) + amount;
        }
        return acc;
      }, {});

    return Object.entries(grouped)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  };

  // Update the total expenses calculation to match dashboard
  const totalExpenses = data.reduce((sum, item) => sum + parseFloat(item.CashOutflow || 0), 0);

  // Update chartData to use the same filtering logic but keep the total consistent
  const chartData = data
    .filter(item => {
      const amount = parseFloat(item.CashOutflow || 0);
      return amount > 0 && isValidDate(item.Date);
    })
    .map((item) => ({
      date: new Date(item.Date),
      name: new Date(item.Date).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
      }),
      category: item.Category || item.ExpenseType || 'Other',
      amount: parseFloat(item.CashOutflow || 0)
    }))
    .sort((a, b) => a.date - b.date);

  const renderChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                label={{ 
                  value: 'Date',
                  position: 'bottom',
                  offset: 50
                }}
              />
              <YAxis
                label={{ 
                  value: 'Amount (₹)',
                  angle: -90,
                  position: 'insideLeft'
                }}
              />
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                labelFormatter={(label) => `Date: ${label}`}
                content={({ payload, label }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="custom-tooltip">
                        <p className="date">Date: {label}</p>
                        <p className="amount">Amount: ₹{payload[0].value.toFixed(2)}</p>
                        <p className="category">Category: {payload[0].payload.category}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Bar 
                dataKey="amount" 
                fill="#a4de6c" 
                name="Expense Amount"
              />
            </BarChart>
          </ResponsiveContainer>
        );

      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
              <XAxis 
                dataKey="name"
                angle={-45}
                textAnchor="end"
                height={60}
                interval={0}
                label={{ 
                  value: 'Date',
                  position: 'bottom',
                  offset: 50
                }}
              />
              <YAxis
                label={{ 
                  value: 'Amount (₹)',
                  angle: -90,
                  position: 'insideLeft'
                }}
              />
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                labelFormatter={(label) => `Date: ${label}`}
                content={({ payload, label }) => {
                  if (payload && payload.length) {
                    return (
                      <div className="custom-tooltip">
                        <p className="date">Date: {label}</p>
                        <p className="amount">Amount: ₹{payload[0].value.toFixed(2)}</p>
                        <p className="category">Category: {payload[0].payload.category}</p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="amount" 
                stroke="#8dd1e1" 
                name="Expense Amount"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        );

      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={groupExpensesByCategory(data)}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={80}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
              >
                {groupExpensesByCategory(data).map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={COLORS[index % COLORS.length]} 
                  />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                content={({ payload }) => {
                  if (payload && payload.length) {
                    const data = payload[0];
                    return (
                      <div className="custom-tooltip">
                        <p className="category">{data.name}</p>
                        <p className="amount">₹{data.value.toFixed(2)}</p>
                        <p className="percent">
                          {`${(data.percent * 100).toFixed(1)}% of total`}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend 
                layout="vertical"
                align="right"
                verticalAlign="middle"
              />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <p>Select a valid chart type.</p>;
    }
  };

  return (
    <div className="feature-display">
      <div className="stats-summary">
        <div className="stat-card">
          <h3>Total Expenses</h3>
          <p>₹{totalExpenses.toFixed(2)}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">
          {selectedChart === "pie" ? "Expense Distribution by Category" : "Expense Trend"}
        </h3>
        {data.length > 0 ? renderChart() : <p>No data to display.</p>}
      </div>
    </div>
  );
};

export default ExpenseTracking;
