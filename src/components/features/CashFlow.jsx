import React from "react";
import {
  BarChart, Bar, LineChart, Line, AreaChart, Area,
  XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const COLORS = ["#82ca9d", "#ff8042", "#8884d8"];

const CashFlow = ({ data, selectedChart }) => {
  // Process data without dates
  const processedData = data
    .map(item => ({
      name: "", // Empty string instead of Entry number
      inflow: parseFloat(item.CashInflow || 0),
      outflow: parseFloat(item.CashOutflow || 0),
      netFlow: parseFloat(item.CashInflow || 0) - parseFloat(item.CashOutflow || 0)
    }));

  const totalInflow = processedData.reduce((sum, item) => sum + item.inflow, 0);
  const totalOutflow = processedData.reduce((sum, item) => sum + item.outflow, 0);
  const netCashFlow = totalInflow - totalOutflow;

  const renderChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={false} /> {/* Hide ticks */}
              <YAxis />
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                labelFormatter={() => ""} // Remove label in tooltip
              />
              <Legend />
              <Bar dataKey="inflow" name="Cash Inflow" fill="#82ca9d" />
              <Bar dataKey="outflow" name="Cash Outflow" fill="#ff8042" />
            </BarChart>
          </ResponsiveContainer>
        );
      
      case "pie": // Trend view
        return (
          <ResponsiveContainer width="100%" height={400}>
            <AreaChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <defs>
                <linearGradient id="colorInflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                </linearGradient>
                <linearGradient id="colorOutflow" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ff8042" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ff8042" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="name" tick={false} /> {/* Hide ticks */}
              <YAxis />
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                labelFormatter={() => ""} // Remove label in tooltip
              />
              <Legend />
              <Area 
                type="monotone" 
                dataKey="inflow" 
                name="Cash Inflow"
                stroke="#82ca9d"
                fillOpacity={1}
                fill="url(#colorInflow)"
              />
              <Area 
                type="monotone" 
                dataKey="outflow" 
                name="Cash Outflow"
                stroke="#ff8042"
                fillOpacity={1}
                fill="url(#colorOutflow)"
              />
            </AreaChart>
          </ResponsiveContainer>
        );
      
      case "line":
        return (
          <ResponsiveContainer width="100%" height={400}>
            <LineChart data={processedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" tick={false} /> {/* Hide ticks */}
              <YAxis />
              <Tooltip 
                formatter={(value) => `₹${value.toFixed(2)}`}
                labelFormatter={() => ""} // Remove label in tooltip
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="netFlow" 
                name="Net Cash Flow"
                stroke="#8884d8"
                strokeWidth={2}
                dot={{ r: 3 }}
              />
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
          <h3>Total Inflow</h3>
          <p>₹{totalInflow.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Total Outflow</h3>
          <p>₹{totalOutflow.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>Net Cash Flow</h3>
          <p style={{ color: netCashFlow >= 0 ? '#82ca9d' : '#ff8042' }}>
            ₹{netCashFlow.toFixed(2)}
          </p>
        </div>
      </div>

      <div className="chart-section">
        <h3 className="chart-title">
          {selectedChart === "pie" ? "Cash Flow Trend Analysis" : 
           selectedChart === "bar" ? "Cash Flow Comparison" :
           "Net Cash Flow Trend"}
        </h3>
        {data.length > 0 ? renderChart() : <p>No data to display.</p>}
      </div>
    </div>
  );
};

export default CashFlow;
