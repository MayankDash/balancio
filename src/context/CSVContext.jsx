import React, { createContext, useState } from "react";
import Papa from "papaparse";

export const CSVContext = createContext();

export const CSVProvider = ({ children }) => {
  const [csvData, setCsvData] = useState([]);

  const handleFileUpload = (file) => {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (result) => {
        console.log("Parsed CSV Data:", result.data); // Log the parsed data
        setCsvData(result.data);
      },
    });
  };

  return (
    <CSVContext.Provider value={{ csvData, handleFileUpload }}>
      {children}
    </CSVContext.Provider>
  );
};
