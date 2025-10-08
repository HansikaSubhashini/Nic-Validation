import React, { useState } from 'react';
import axios from 'axios';

function AddUser({ apiUrl = 'http://localhost:3500' }) {
  const [name, setName] = useState('');
  const [nic, setNic] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${apiUrl}/api/users`, { name, nic_number: nic })
      .then(res => {
        alert('User added successfully!');
        setName('');
        setNic('');
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Add User</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="text" placeholder="NIC Number" value={nic} onChange={e => setNic(e.target.value)} required />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default AddUser;

