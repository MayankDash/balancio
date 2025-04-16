// src/components/DataUploader.jsx
import React, { useState } from "react";
import { Upload, File, Check, AlertCircle } from "react-feather";

const DataUploader = ({ onDataParsed }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState(null); // 'success', 'error', null

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  };

  const processFile = (selectedFile) => {
    setFile(selectedFile);
    setIsUploading(true);
    setUploadStatus(null);

    // Simulate file reading/processing
    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        // This is a simple CSV parser, you might need something more robust
        const content = e.target.result;
        const rows = content.split("\n");
        const headers = rows[0].split(",");

        const parsedData = rows
          .slice(1)
          .map((row) => {
            const values = row.split(",");
            const entry = {};

            headers.forEach((header, index) => {
              entry[header.trim()] = values[index]?.trim();
            });

            return entry;
          })
          .filter((entry) => Object.values(entry).some((val) => val));

        onDataParsed(parsedData);
        setIsUploading(false);
        setUploadStatus("success");
      } catch (error) {
        console.error("Error parsing file:", error);
        setIsUploading(false);
        setUploadStatus("error");
      }
    };

    reader.onerror = () => {
      setIsUploading(false);
      setUploadStatus("error");
    };

    reader.readAsText(selectedFile);
  };

  return (
    <div className="data-uploader-container">
      <div
        className={`upload-area ${isDragging ? "dragging" : ""}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById("file-input").click()}
      >
        <input
          type="file"
          id="file-input"
          accept=".csv,.xlsx,.xls"
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />

        {!file && !isUploading && (
          <>
            <div className="upload-icon">
              <Upload size={36} />
            </div>
            <h3>Drag & Drop your files here</h3>
            <p className="upload-text">or click to browse your files</p>
            <p className="upload-info">Supports CSV, XLS, XLSX</p>
          </>
        )}

        {file && isUploading && (
          <div className="upload-progress">
            <div className="spinner"></div>
            <p>Uploading {file.name}...</p>
          </div>
        )}

        {file && !isUploading && uploadStatus === "success" && (
          <div className="upload-success">
            <div className="success-icon">
              <Check size={36} color="#22c55e" />
            </div>
            <h3>File Uploaded Successfully!</h3>
            <p>
              <File size={16} />
              <span>{file.name}</span>
            </p>
            <button className="btn btn-outline" onClick={() => setFile(null)}>
              Upload Another File
            </button>
          </div>
        )}

        {file && !isUploading && uploadStatus === "error" && (
          <div className="upload-error">
            <div className="error-icon">
              <AlertCircle size={36} color="#ef4444" />
            </div>
            <h3>Upload Failed</h3>
            <p>There was an error processing your file. Please try again.</p>
            <button className="btn btn-outline" onClick={() => setFile(null)}>
              Try Again
            </button>
          </div>
        )}
      </div>

      {file && !isUploading && uploadStatus === "success" && (
        <div className="upload-summary">
          <h3>Data Summary</h3>
          <p>
            Your financial data is ready for analysis. Use the navigation menu
            to explore different features.
          </p>
        </div>
      )}
    </div>
  );
};

export default DataUploader;
