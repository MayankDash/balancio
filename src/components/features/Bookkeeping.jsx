// src/components/features/Bookkeeping.jsx
import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

const Bookkeeping = ({ data, selectedChart }) => {
  // Group similar categories
  const groupSimilarCategories = (data) => {
    const categoryGroups = data.reduce((acc, item) => {
      // Get the main category by removing numbers and trimming
      const mainCategory = item.Category?.split(' ')[0] || item.name?.split(' ')[0] || 'Other';
      const amount = parseFloat(item.Amount) || 0;
      
      if (acc[mainCategory]) {
        acc[mainCategory] += amount;
      } else {
        acc[mainCategory] = amount;
      }
      return acc;
    }, {});

    // Convert to array format for charts
    return Object.entries(categoryGroups).map(([name, amount]) => ({
      name,
      amount
    }));
  };

  const chartData = groupSimilarCategories(data);

  const renderChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        );
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={150}
                innerRadius={80}
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
                labelLine={{ strokeWidth: 1, stroke: '#666' }}
              >
                {chartData.map((entry, index) => (
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
                      <div style={{ 
                        background: 'white', 
                        padding: '10px', 
                        border: '1px solid #ccc',
                        borderRadius: '4px',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                      }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>
                          {data.name}
                        </p>
                        <p style={{ margin: '5px 0 0 0' }}>
                          Amount: ₹{data.value.toFixed(2)}
                        </p>
                        <p style={{ margin: '5px 0 0 0', color: '#666' }}>
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
                wrapperStyle={{
                  paddingLeft: '20px'
                }}
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
          <h3>Total Transactions</h3>
          <p>{data.length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Amount</h3>
          <p>₹{chartData.reduce((sum, item) => sum + item.amount, 0).toFixed(2)}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">{selectedChart.charAt(0).toUpperCase() + selectedChart.slice(1)} Chart View</h3>
        {renderChart()}
      </div>
    </div>
  );
};

export default Bookkeeping;
