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
import { AlertTriangle, AlertCircle, Info } from "react-feather"; // Add icons for priority levels

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
];

const Notifications = ({ data, selectedChart, setSelectedChart }) => { // Add setSelectedChart to props
  const alertCounts = data.reduce((acc, item) => {
    const type = item.AlertType || "Unknown";
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(alertCounts).map(([name, amount]) => ({
    name,
    amount,
  }));

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
                fill="#8884d8"
                label
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        );
      default:
        return <p>Select a valid chart type.</p>;
    }
  };

  return (
    <div className="feature-display">
      <div className="notification-header">
        <h2>Notifications & Alerts</h2>
        <div className="priority-legend">
          <div className="priority-item high">
            <AlertTriangle size={16} />
            <span>High Priority</span>
            <p>Urgent attention needed (e.g., large unusual transactions, overdue tax payments)</p>
          </div>
          <div className="priority-item medium">
            <AlertCircle size={16} />
            <span>Medium Priority</span>
            <p>Important but not urgent (e.g., approaching budget limits, upcoming deadlines)</p>
          </div>
          <div className="priority-item low">
            <Info size={16} />
            <span>Low Priority</span>
            <p>General information (e.g., monthly summaries, minor spending pattern changes)</p>
          </div>
        </div>
        <p className="notification-description">
          Track important financial events and deadlines. This feature highlights:
          <ul>
            <li>Upcoming tax payment deadlines</li>
            <li>Unusual spending patterns</li>
            <li>Large transactions</li>
            <li>Budget threshold alerts</li>
          </ul>
        </p>
      </div>

      <VisualizationSelector 
        selectedChart={selectedChart}
        setSelectedChart={setSelectedChart}
      />

      <div className="chart-section">
        {chartData.map(({ name, amount }) => (
          <p key={name}>
            {name}: {amount}
          </p>
        ))}
        {data.length > 0 ? renderChart() : <p>No data to display.</p>}
      </div>
    </div>
  );
};

export default Notifications;
