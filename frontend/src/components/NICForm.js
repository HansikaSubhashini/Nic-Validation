import React, { useState } from "react";

function NICForm() {
  const [nic, setNic] = useState("");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");

  const handleValidate = () => {
    setResult("");
    setError("");

    if (!nic) {
      setError("Please enter your NIC number");
      return;
    }

    const oldNIC = /^[0-9]{9}[vVxX]$/;
    const newNIC = /^[0-9]{12}$/;

    if (oldNIC.test(nic) || newNIC.test(nic)) {
      setResult("✅ Valid NIC format!");
    } else {
      setError("❌ Invalid NIC format!");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>NIC Validator</h2>
      <input
        type="text"
        placeholder="Enter NIC"
        value={nic}
        onChange={(e) => setNic(e.target.value)}
        style={{
          padding: "10px",
          width: "250px",
          borderRadius: "5px",
          border: "1px solid #ccc",
          marginRight: "10px",
        }}
      />
      <button
        onClick={handleValidate}
        style={{
          padding: "10px 20px",
          borderRadius: "5px",
          backgroundColor: "black",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Validate
      </button>

      {result && <p style={{ marginTop: "20px" }}>{result}</p>}
      {error && <p style={{ marginTop: "20px" }}>{error}</p>}
    </div>
  );
}

export default NICForm;
