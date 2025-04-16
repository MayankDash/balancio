// src/components/VisualizationSelector.jsx
import React from "react";
import { BarChart2, PieChart, TrendingUp } from "react-feather"; // Import icons

const VisualizationSelector = ({ selectedChart, setSelectedChart }) => {
  return (
    <div className="visualization-selector">
      <span className="selector-label">Visualization Type</span>
      <div className="chart-options" role="group" aria-label="Chart type selection">
        <button
          type="button"
          className={`chart-option ${selectedChart === 'bar' ? 'active' : ''}`}
          onClick={() => setSelectedChart('bar')}
        >
          Bar Chart
        </button>
        <button
          type="button"
          className={`chart-option ${selectedChart === 'pie' ? 'active' : ''}`}
          onClick={() => setSelectedChart('pie')}
        >
          Pie Chart
        </button>
        <button
          type="button"
          className={`chart-option ${selectedChart === 'line' ? 'active' : ''}`}
          onClick={() => setSelectedChart('line')}
        >
          Line Chart
        </button>
      </div>
    </div>
  );
};

export default VisualizationSelector;
