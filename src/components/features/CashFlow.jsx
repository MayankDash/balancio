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

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#8dd1e1",
  "#a4de6c",
  "#d0ed57",
  "#d88884",
];

const CashFlow = ({ data, selectedChart }) => {
  const inflow = parseFloat(
    data.reduce((acc, item) => acc + parseFloat(item.CashInflow || 0), 0)
  );
  const outflow = parseFloat(
    data.reduce((acc, item) => acc + parseFloat(item.CashOutflow || 0), 0)
  );
  const net = inflow - outflow;

  const chartData = [
    { name: "Inflow", amount: inflow },
    { name: "Outflow", amount: outflow },
    { name: "Net", amount: net },
  ];

  const renderChart = () => {
    switch (selectedChart) {
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="amount" fill="#ffc658" />
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
              <Line type="monotone" dataKey="amount" stroke="#ff8042" />
            </LineChart>
          </ResponsiveContainer>
        );
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={chartData}
                dataKey="amount"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
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
    <div>
      <h2>Cash Flow</h2>
      <p>Total Inflow: ₹{inflow.toFixed(2)}</p>
      <p>Total Outflow: ₹{outflow.toFixed(2)}</p>
      <p>Net Cash Flow: ₹{net.toFixed(2)}</p>
      {data.length > 0 ? renderChart() : <p>No data to display.</p>}
    </div>
  );
};

export default CashFlow;
