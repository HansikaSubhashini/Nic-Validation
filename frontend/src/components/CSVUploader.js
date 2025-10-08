import React, { useState } from "react";
import "./CSVUploader.css";  // <-- Import the CSS here

function CSVUploader() {
  const [files, setFiles] = useState([]);

  const handleFiles = (e) => setFiles([...e.target.files]);

  const handleUpload = async () => {
    const token = localStorage.getItem("jwtToken");
    if (!token) return alert("You are not logged in!");
    if (files.length === 0) return alert("Please select files!");

    for (let file of files) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const res = await fetch("http://localhost:5000/api/upload", {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: formData,
        });

        const data = await res.json();
        if (res.ok) console.log("File uploaded:", data);
        else console.error("Upload failed:", data.message);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }
    alert("Upload completed!");
  };

  return (
    <div className="csv-uploader">
      <h2>Upload CSV Files</h2>
      <input type="file" multiple accept=".csv" onChange={handleFiles} />
      <button onClick={handleUpload}>Upload CSVs</button>
    </div>
  );
}

export default CSVUploader;

