import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalUsersList = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const fetchUsers = async () => {
    const res = await axios.get('http://localhost:5000/api/users');
    setUsers(res.data.users);
    setCount(res.data.count);
  };

  const blockUser = async (phone) => {
    await axios.post('http://localhost:5000/api/block-user', { phone });
    fetchUsers();
  };

  const unblockUser = async (phone) => {
    await axios.post('http://localhost:5000/api/unblock-user', { phone });
    fetchUsers();
  };

  const setCategory = async (phone, category) => {
    await axios.post('http://localhost:5000/api/set-category', { phone, category });
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Admin Panel</h3>
      <p>Total Users: <strong>{count}</strong></p>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Phone</th>
            <th>Blocked</th>
            <th>Last Login</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(u => (
            <tr key={u._id}>
              <td>{u.phone}</td>
              <td>{u.blocked ? 'Yes' : 'No'}</td>
              <td>{new Date(u.lastLogin).toLocaleString()}</td>
              <td>{u.category}</td>
              <td>
                {u.blocked ? (
                  <button className="btn btn-success btn-sm" onClick={() => unblockUser(u.phone)}>Unblock</button>
                ) : (
                  <button className="btn btn-danger btn-sm" onClick={() => blockUser(u.phone)}>Block</button>
                )}
                <select
                  value={u.category}
                  onChange={(e) => setCategory(u.phone, e.target.value)}
                  className="ml-2"
                >
                  <option value="monthly">Monthly</option>
                  <option value="6month">6 Month</option>
                  <option value="yearly">Yearly</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalUsersList;
