import React, { useState } from "react";
import Papa from "papaparse";
import Navbar from "../components/Navbar";
import "../pages/UploadPage.css";

function UploadPage({ onDataUpload }) {
  const [files, setFiles] = useState({ file1: null, file2: null, file3: null, file4: null });
  const [fileData, setFileData] = useState(null);
  const [currentStep, setCurrentStep] = useState(1);

  const stepKeyMap = { 1: "file1", 2: "file2", 3: "file3", 4: "file4" };

  // Handle file selection
  const handleFileChange = (e, key) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith(".csv")) {
      alert(`"${file.name}" is not a CSV file.`);
      e.target.value = null;
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      alert(`"${file.name}" exceeds 10MB size limit.`);
      e.target.value = null;
      return;
    }

    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  // Parse CSV
  const parseCSV = (file) => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => resolve(results.data || []),
        error: () => resolve([]),
      });
    });
  };

  // Upload all files
  const handleUpload = async (e) => {
    e.preventDefault();

    if (!files.file1 || !files.file2 || !files.file3 || !files.file4) {
      alert("Please select all 4 CSV files before uploading.");
      return;
    }

    const allData = {};
    for (const [key, file] of Object.entries(files)) {
      allData[key] = await parseCSV(file);
    }

    setFileData(allData);

    // Pass merged data to ReportsPage via callback
    const mergedData = Object.values(allData).flat();
    if (onDataUpload) onDataUpload(mergedData);

    setCurrentStep(1);
  };

  // Table navigation
  const handleNext = () => setCurrentStep((prev) => Math.min(prev + 1, 4));
  const handlePrev = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  return (
    <>
      <Navbar />
      <div className="uploadpage-container">
        {/* LEFT: Upload Files */}
        <div className="upload-left card upload-main-card">
          <h2 className="page-title">Upload Your CSV Files</h2>
          <p className="card-subtext">Please follow the instructions below before uploading your CSV files.</p>
          <ul className="instructions-list">
            <li>Upload exactly <strong>4 CSV files</strong> at once.</li>
            <li>Each file should contain NIC numbers in the first column.</li>
            <li>Files must be in <strong>.csv</strong> format only.</li>
            <li>Maximum file size: <strong>10MB per file</strong>.</li>
          </ul>
          <form onSubmit={handleUpload} className="upload-form">
            {["file1", "file2", "file3", "file4"].map((key, idx) => (
              <div key={key} className="file-input-card">
                <label className="file-label">
                  {files[key] ? files[key].name : `Select File ${idx + 1}`}
                  <input type="file" accept=".csv" onChange={(e) => handleFileChange(e, key)} />
                </label>
              </div>
            ))}
            <button type="submit" className="btn upload-btn">Upload All Files</button>
          </form>
        </div>

        {/* RIGHT: Table Data */}
        {fileData && (
          <div className="upload-right card file-data">
            <h3>NIC Numbers - File {currentStep}</h3>
            {fileData[stepKeyMap[currentStep]]?.length > 0 ? (
              <div className="table-container">
                <table>
                  <thead>
                    <tr>
                      {Object.keys(fileData[stepKeyMap[currentStep]][0]).map((col, idx) => (
                        <th key={idx}>{col}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {fileData[stepKeyMap[currentStep]].map((row, rowIndex) => (
                      <tr key={rowIndex}>
                        {Object.values(row).map((val, colIndex) => (
                          <td key={colIndex}>{val}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p>No data found in this file.</p>
            )}

            <div className="navigation-buttons">
              <button type="button" onClick={handlePrev} disabled={currentStep === 1} className="btn nav-btn">Previous</button>
              <button type="button" onClick={handleNext} disabled={currentStep === 4} className="btn nav-btn">Next</button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default UploadPage;
