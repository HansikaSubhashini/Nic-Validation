// UploadPage.js
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import "./UploadPage.css";
import Papa from "papaparse";

function UploadPage() {
  const [files, setFiles] = useState({ file1: null, file2: null, file3: null, file4: null });
  const [uploadedFiles, setUploadedFiles] = useState(null);
  const [fileData, setFileData] = useState(null);

  // Handle file selection
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file type
    if (!file.name.endsWith(".csv")) {
      alert(`"${file.name}" is not a CSV file.`);
      e.target.value = null;
      return;
    }

    // Validate file size
    if (file.size > 10 * 1024 * 1024) {
      alert(`"${file.name}" exceeds the 10MB size limit.`);
      e.target.value = null;
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  // Parse CSV file using PapaParse
  const parseCSV = (file) => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data),
      });
    });
  };

  // Handle file upload
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!files.file1 || !files.file2 || !files.file3 || !files.file4) {
      alert("Please select all 4 CSV files before uploading.");
      return;
    }

    const formData = new FormData();
    Object.entries(files).forEach(([key, file]) => formData.append(key, file));

    try {
      const res = await fetch("http://localhost:3500/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      alert(data.message);

      setUploadedFiles(data.files);

      // Parse CSV files for NIC numbers
      const allData = {};
      for (const [key, file] of Object.entries(files)) {
        allData[key] = await parseCSV(file);
      }
      setFileData(allData);

    } catch (err) {
      console.error("Upload error:", err);
      alert("Failed to upload files. Please try again.");
    }
  };

  return (
    <>
      <Navbar />
      <div className="upload-container">
        <h2>Upload CSV Files</h2>

        <div className="instructions">
          <h3>Instructions:</h3>
          <ul>
            <li>Upload exactly <strong>4 CSV files</strong> at once.</li>
            <li>Each CSV should contain NIC numbers in the first column.</li>
            <li>Files must be in <strong>CSV format (.csv)</strong>.</li>
            <li>Maximum file size: <strong>10MB per file</strong>.</li>
          </ul>
        </div>

        <form onSubmit={handleUpload} className="upload-form">
          {["file1", "file2", "file3", "file4"].map((key, index) => (
            <div className="file-input-group" key={key}>
              <label>File {index + 1}:</label>
              <input type="file" accept=".csv" onChange={(e) => handleFileChange(e, key)} />
            </div>
          ))}
          <button type="submit" className="upload-btn">Upload Files</button>
        </form>

        {/* Display uploaded file names */}
        {uploadedFiles && (
          <div className="uploaded-files">
            <h3>Uploaded Files:</h3>
            {Object.entries(uploadedFiles).map(([key, filesArray]) => (
              <div key={key}>
                <h4>{key}</h4>
                <ul>
                  {filesArray.map((file) => (
                    <li key={file.filename}>{file.originalname}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Display parsed NIC numbers */}
        {fileData && (
          <div className="file-data">
            <h3>NIC Numbers:</h3>
            {Object.entries(fileData).map(([key, rows]) => (
              <div key={key} className="file-table">
                <h4>{key}</h4>
                <table>
                  <thead>
                    <tr>
                      {rows[0] && Object.keys(rows[0]).map((col, idx) => (
                        <th key={idx}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((val, colIndex) => (
                          <td key={colIndex}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default UploadPage;
