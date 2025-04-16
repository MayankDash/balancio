import React, { useState } from "react";
import Papa from "papaparse";
import Visualization from "./Visualization";

const DataUpload = ({ onDataParsed }) => {
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
    <div style={{ padding: "2rem" }}>
      <h2>Upload Financial CSV File</h2>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      {csvData.length > 0 && <Visualization data={csvData} />}
    </div>
  );
};

export default DataUploader;
