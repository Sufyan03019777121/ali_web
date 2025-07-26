import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const [phone, setPhone] = useState(localStorage.getItem('userPhone') || '');

  useEffect(() => {
    // ✅ Auto-login if already stored
    const savedPhone = localStorage.getItem('userPhone');
    if (savedPhone) {
      checkLogin(savedPhone);
    }
  }, []);

  const checkLogin = async (phoneNumber) => {
    try {
      const res = await axios.post('https://ali-web-backen.onrender.com/api/login', { phone: phoneNumber });

      if (!res.data.blocked) {
        setLoggedIn(true);
        localStorage.setItem('userPhone', phoneNumber);

        if (!res.data.autoBlocked) {
          alert('✅ Login successful. You will be blocked after 20 seconds automatically.');
        } else {
          alert('✅ Login successful.');
        }

      } else {
        alert('⛔ Blocked by admin');
        localStorage.removeItem('userPhone');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('❌ Error logging in');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone number must be 11 digits and start with 03');
      return;
    }

    await checkLogin(phone);
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  const handleFocus = (e) => {
    e.target.select(); // select full number
  };

  return (
    <div className="container mt-5">
      <h3>Login with Phone Number</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phone}
          onChange={handleChange}
          onFocus={handleFocus}
          placeholder="Enter phone number"
          required
          className="form-control mb-2"
          maxLength="11"
        />
        <button type="submit" className="btn btn-primary">Login</button>
      </form>
    </div>
  );
};

export default Login;
