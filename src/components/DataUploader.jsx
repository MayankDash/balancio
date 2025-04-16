// src/components/DataUploader.jsx
import React from "react";
import Papa from "papaparse";

const DataUploader = ({ onDataParsed }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data.filter((row) =>
          Object.values(row).some((cell) => cell !== "")
        );
        onDataParsed(data);
      },
    });
  };

  return (
    <div className="data-upload">
      <h3>Upload Financial CSV File</h3>
      <input 
        type="file" 
        accept=".csv" 
        onChange={handleFileUpload}
        className="file-input"
      />
    </div>
  );
};

export default DataUploader;
