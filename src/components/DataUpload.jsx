// src/components/DataUpload.jsx
import React from "react";
import Papa from "papaparse";

const DataUpload = ({ onDataParsed }) => {
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          onDataParsed(result.data);
        },
        header: true, // Assuming CSV has headers
      });
    }
  };

  return (
    <div>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        style={{ padding: "10px", margin: "20px" }}
      />
    </div>
  );
};

export default DataUpload;
