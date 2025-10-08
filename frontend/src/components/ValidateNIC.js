import React, { useState } from 'react';
import axios from 'axios';

function ValidateNIC({ apiUrl = 'http://localhost:3500' }) {
  const [nic, setNic] = useState('');
  const [result, setResult] = useState('');

  const handleValidate = () => {
    if (!nic) return setResult('Please enter an NIC to validate');
    axios.get(`${apiUrl}/api/validate/${nic}`)
      .then(res => setResult(res.data.message))
      .catch(err => {
        console.error(err);
        setResult('Validation failed (see console)');
      });
  };

  return (
    <div>
      <h2>Validate NIC</h2>
      <input type="text" placeholder="Enter NIC" value={nic} onChange={e => setNic(e.target.value)} />
      <button onClick={handleValidate}>Validate</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default ValidateNIC;
