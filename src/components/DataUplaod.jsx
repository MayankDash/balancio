import React from "react";
import Papa from "papaparse";

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
    <div className="data-upload">
      <h3>Upload CSV File</h3>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
    </div>
  );
};

export default DataUpload;
