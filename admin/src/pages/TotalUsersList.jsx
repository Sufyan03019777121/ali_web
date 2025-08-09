import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalUsersList = () => {
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false); // Spinner control

  const backendURL = 'https://ali-web-backen.onrender.com';

  // ✅ Users fetch karan wala function
  const fetchUsers = async () => {
    setLoading(true); // Show spinner
    try {
      const res = await axios.get(`${backendURL}/api/users`);
      setUsers(res.data.users);
      setCount(res.data.count);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false); // Hide spinner
    }
  };

  // ✅ Block user
  const blockUser = async (phone) => {
    await axios.post(`${backendURL}/api/block-user`, { phone });
    fetchUsers();
  };

  // ✅ Unblock user
  const unblockUser = async (phone) => {
    await axios.post(`${backendURL}/api/unblock-user`, { phone });
    fetchUsers();
  };

  // ✅ Set category
  const setCategory = async (phone, category) => {
    await axios.post(`${backendURL}/api/set-category`, { phone, category });
    fetchUsers();
  };

  // ✅ Delete user
  const deleteUser = async (phone) => {
    if (window.confirm("کیا آپ واقعی اس user کو delete کرنا چاہتے ہیں؟")) {
      await axios.post(`${backendURL}/api/delete-user`, { phone });
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div className="container mt-4 position-relative">
      {/* 🧷 Sticky Refresh Button */}
      <div
        className="position-fixed bottom-0 end-0 m-4"
        style={{ zIndex: 9999 }}
      >
        <button
          className="btn btn-outline-primary btn-sm shadow"
          onClick={fetchUsers}
          disabled={loading}
        >
          {loading ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
              ></span>
              Refreshing...
            </>
          ) : (
            <>🔄 Refresh Users</>
          )}
        </button>
      </div>

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
