import React, { useContext } from "react";
import { CSVContext } from "../context/CSVContext";

const FileUpload = () => {
  const { handleFileUpload } = useContext(CSVContext);

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={onFileChange} />
    </div>
  );
};

export default FileUpload;
