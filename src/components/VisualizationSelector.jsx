// src/components/VisualizationSelector.jsx
import React from "react";

const VisualizationSelector = ({ selectedChart, setSelectedChart }) => {
  return (
    <div className="visualization-selector" style={{ margin: "1rem 0" }}>
      <label
        htmlFor="chart-type"
        style={{ marginRight: "1rem", fontWeight: "bold" }}
      >
        Select Chart Type:
      </label>
      <select
        id="chart-type"
        value={selectedChart}
        onChange={(e) => setSelectedChart(e.target.value)}
        style={{ padding: "0.5rem", borderRadius: "6px" }}
      >
        <option value="bar">Bar Chart</option>
        <option value="pie">Pie Chart</option>
        <option value="line">Line Chart</option>
      </select>
    </div>
  );
};

export default VisualizationSelector;
