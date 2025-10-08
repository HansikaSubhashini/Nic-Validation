import React from 'react';
import Navbar from '../components/Navbar';

const Upload = () => {
  return (
    <div>
      <Navbar />
      <div style={{ padding: 24 }}>
        <h2>Upload Files</h2>
        <p>Use this page to upload CSV files for validation.</p>
      </div>
    </div>
  );
};

export default Upload;
