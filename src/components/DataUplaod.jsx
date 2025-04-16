import React, { useState } from "react";
import Papa from "papaparse";
import "./MainContent.css";

const DataUpload = ({ onDataParsed }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        onDataParsed(results.data); // Pass parsed data to parent
      },
    });
  };

  return (
    <div className="upload-section">
      <h3>📄 Upload Company CSV</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default DataUpload;
