import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const [phone, setPhone] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await axios.post('https://ali-web-backen.onrender.com/api/login', { phone });
    if (!res.data.blocked) {
      setLoggedIn(true);
    } else {
      alert('Blocked by admin');
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login with Phone Number</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter phone number"
          required
          className="form-control mb-2"
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
