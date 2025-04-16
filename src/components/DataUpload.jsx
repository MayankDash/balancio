import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import Visualization from "./Visualization"; // Optional, can be visual display of parsed data

const DataUploader = ({ onDataParsed }) => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const filteredData = results.data.filter((row) =>
          Object.values(row).some((cell) => cell !== "")
        );
        setCsvData(filteredData); // local visualization use
        onDataParsed(filteredData); // notify parent (MainContent)
      },
    });
  };

  return (
    <div className="data-upload" style={{ padding: "2rem" }}>
      <h3>Upload Financial CSV File</h3>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload}
        className="file-input"
      />
      {csvData.length > 0 && <Visualization data={csvData} />}
    </div>
  );
};

export default DataUploader;
