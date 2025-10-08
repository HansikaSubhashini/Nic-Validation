import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UserList({ apiUrl = 'http://localhost:3500' }) {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get(`${apiUrl}/api/users`)
      .then(res => setUsers(res.data))
      .catch(err => console.error(err));
  }, [apiUrl]);

  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name} - {user.nic_number}</li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
