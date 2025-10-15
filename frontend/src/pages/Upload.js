import React, { useState } from "react";
import Papa from "papaparse";
import "../styles/UploadPage.css";

function UploadPage() {
  const [csvData, setCsvData] = useState([]);
  const [fileName, setFileName] = useState("");

  // ✅ Updated CSV parsing function
  const parseCSV = (file) => {
    return new Promise((resolve) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          let data = results.data || [];

          // ✅ Auto-generate default headers if not detected
          if (
            data.length > 0 &&
            Object.keys(data[0]).length === 1 &&
            Object.keys(data[0])[0] === ""
          ) {
            // Parse again without headers and manually add column names
            Papa.parse(file, {
              header: false,
              skipEmptyLines: true,
              complete: (noHeaderResults) => {
                const rows = noHeaderResults.data;
                if (rows.length > 0) {
                  const colCount = rows[0].length;
                  const headers = Array.from(
                    { length: colCount },
                    (_, i) => `Column ${i + 1}`
                  );
                  const formatted = rows.map((row) =>
                    headers.reduce((obj, header, i) => {
                      obj[header] = row[i];
                      return obj;
                    }, {})
                  );
                  resolve(formatted);
                } else {
                  resolve([]);
                }
              },
            });
          } else {
            resolve(data);
          }
        },
        error: () => resolve([]),
      });
    });
  };

  // ✅ Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileName(file.name);
      const data = await parseCSV(file);
      setCsvData(data);
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload NIC Data</h2>
        <p className="upload-instruction">
          Please upload a <strong>CSV file</strong> with NIC information.
          <br /> Example headers: <em>Name, Birthdate, NIC</em>
        </p>

        <div className="upload-box">
          <label htmlFor="fileInput" className="upload-label">
            <i className="fa fa-upload"></i> Choose CSV File
          </label>
          <input
            type="file"
            id="fileInput"
            accept=".csv"
            onChange={handleFileUpload}
            hidden
          />
          {fileName && <p className="file-name">📁 {fileName}</p>}
        </div>

        {csvData.length > 0 && (
          <div className="file-data">
            <h3>Uploaded Data Preview</h3>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    {Object.keys(csvData[0]).map((header, index) => (
                      <th key={index}>{header}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {csvData.map((row, i) => (
                    <tr key={i}>
                      {Object.values(row).map((value, j) => (
                        <td key={j}>{value}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UploadPage;
