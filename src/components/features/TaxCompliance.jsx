import React from "react";
import {
  BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042", "#8dd1e1", "#a4de6c"];

const TaxCompliance = ({ data, selectedChart }) => {
  // Group taxes by any available category column
  const groupTaxCategories = (data) => {
    const groupedData = data.reduce((acc, item) => {
      // Try to find a category from any relevant column
      const category = 
        item.Category || 
        item.TaxCategory || 
        item.CategoryType || 
        item.Type || 
        'Other';

      const amount = parseFloat(item.TaxAmount || 0);
      
      // Group into broader categories based on keywords
      let broadCategory = 'Other';
      
      if (category.toLowerCase().includes('income') || category.toLowerCase().includes('revenue')) {
        broadCategory = 'Income Tax';
      } else if (category.toLowerCase().includes('gst') || category.toLowerCase().includes('sales')) {
        broadCategory = 'GST/Sales Tax';
      } else if (category.toLowerCase().includes('property')) {
        broadCategory = 'Property Tax';
      } else if (category.toLowerCase().includes('corporate')) {
        broadCategory = 'Corporate Tax';
      } else if (category.toLowerCase().includes('service')) {
        broadCategory = 'Service Tax';
      } else if (category.toLowerCase().includes('custom') || category.toLowerCase().includes('import')) {
        broadCategory = 'Customs/Import Tax';
      }

      // Only add if amount is significant
      if (amount > 0) {
        acc[broadCategory] = (acc[broadCategory] || 0) + amount;
      }
      return acc;
    }, {});

    // Convert to array and sort by amount
    return Object.entries(groupedData)
      .map(([name, value]) => ({ name, amount: value }))
      .sort((a, b) => b.amount - a.amount)
      .filter(item => item.amount >= 1000); // Filter out small amounts
  };

  const chartData = selectedChart === "pie" ? 
    groupTaxCategories(data) : 
    data.map((item) => ({
      name: item.Category || item.TaxCategory || item.CategoryType || item.Type || 'Other',
      amount: parseFloat(item.TaxAmount) || 0
    }));

  const totalTax = chartData.reduce((sum, item) => sum + item.amount, 0);

  const renderChart = () => {
    switch (selectedChart) {
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
                innerRadius={80} // Add inner radius for donut chart
                label={({ name, percent }) => 
                  `${name} (${(percent * 100).toFixed(1)}%)`
                }
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
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
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
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="amount" stroke="#82ca9d" />
            </LineChart>
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
          <h3>Total Tax Liability</h3>
          <p>₹{totalTax.toFixed(2)}</p>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">
          {selectedChart === "pie" ? "Tax Distribution by Category" : "Tax Breakdown"}
        </h3>
        {data.length > 0 ? renderChart() : <p>No data to display.</p>}
      </div>
    </div>
  );
};

export default TaxCompliance;
