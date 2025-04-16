import React, { useState } from "react";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CSVVisualizer = () => {
  const [data, setData] = useState([]);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          console.log("Parsed CSV data:", results.data); // Debug log
          const parsedData = results.data.map((row) => ({
            name: row.Description,
            amount: parseFloat(row.Amount),
            category: row.Type,
          }));
          setData(parsedData);
        },
      });
    }
  };

  const summarizeData = () => {
    const summary = data.reduce(
      (acc, item) => {
        if (item.category?.toLowerCase().includes("income")) {
          acc[0].value += item.amount;
        } else if (item.category?.toLowerCase().includes("expense")) {
          acc[1].value += item.amount;
        }
        return acc;
      },
      [
        { name: "Total Income", value: 0 },
        { name: "Total Expenses", value: 0 },
      ]
    );
    return summary;
  };

  return (
    <div className="csv-visualizer">
      <div className="upload-section">
        <h3>Upload Financial Data</h3>
        <input
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="file-input"
        />
      </div>

      {data.length > 0 && (
        <div className="charts-container">
          <div className="chart-section">
            <h3>Financial Overview</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={summarizeData()}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="value"
                  fill={(entry) =>
                    entry.name === "Total Income" ? "#4CAF50" : "#FF5252"
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-section">
            <h3>Transaction Details</h3>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar
                  dataKey="amount"
                  fill={(entry) =>
                    entry.category?.toLowerCase().includes("income")
                      ? "#4CAF50"
                      : "#FF5252"
                  }
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default CSVVisualizer;
