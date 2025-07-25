import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalUsersList = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  const fetchUsers = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/users`);
      setUsers(res.data.users);
      setCount(res.data.count);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const blockUser = async (phone) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/block-user`, { phone });
    fetchUsers();
  };

  const unblockUser = async (phone) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/unblock-user`, { phone });
    fetchUsers();
  };

  const setCategory = async (phone, category) => {
    await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/set-category`, { phone, category });
    fetchUsers();
  };

  const deleteUser = async (phone) => {
    if (window.confirm("کیا آپ واقعی اس user کو delete کرنا چاہتے ہیں؟")) {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/delete-user`, { phone });
      fetchUsers();
    }
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
              <td>
                <select
                  value={u.category}
                  onChange={(e) => setCategory(u.phone, e.target.value)}
                  className="me-1"
                >
                  <option value="monthly">Monthly</option>
                  <option value="6month">6 Month</option>
                  <option value="yearly">Yearly</option>
                </select>
              </td>
              <td>
                {u.blocked ? (
                  <button className="btn btn-success btn-sm me-1" onClick={() => unblockUser(u.phone)}>Unblock</button>
                ) : (
                  <button className="btn btn-danger btn-sm me-1" onClick={() => blockUser(u.phone)}>Block</button>
                )}
                <button className="btn btn-warning btn-sm" onClick={() => deleteUser(u.phone)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TotalUsersList;
