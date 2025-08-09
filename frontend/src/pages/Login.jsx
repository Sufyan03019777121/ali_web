import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Login = ({ setLoggedIn }) => {
  const [phone, setPhone] = useState('');
  const [redirected, setRedirected] = useState(false);

  // ✅ Auto-login on page load if phone exists and not blocked
  useEffect(() => {
    const storedPhone = localStorage.getItem('userPhone');
    if (storedPhone) {
      axios
        .post('https://ali-web-backen.onrender.com/api/check-block', { phone: storedPhone })
        .then(res => {
          if (!res.data.blocked) {
            setLoggedIn(true);
            window.location.href = '/'; // Auto go to Home
          } else {
            localStorage.removeItem('userPhone');
          }
        })
        .catch(err => console.error(err));
    }
  }, [setLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert('Phone number must be 11 digits and start with 03');
      return;
    }

    try {
      const res = await axios.post('https://ali-web-backen.onrender.com/api/login', { phone });

      if (!res.data.blocked) {
        setLoggedIn(true);
        localStorage.setItem('userPhone', phone);

        alert('✅ Login successful. Status will be checked in 19 seconds.');

        if (!redirected) {
          setRedirected(true);

          setTimeout(async () => {
            console.log('♻️ Checking block status at 19 sec...');
            try {
              const storedPhone = localStorage.getItem('userPhone'); // ✅ Always get fresh phone
              if (!storedPhone) return;

              const statusRes = await axios.post(
                'https://ali-web-backen.onrender.com/api/check-block',
                { phone: storedPhone }
              );

              if (statusRes.data.blocked) {
                alert('⛔ You are now blocked by admin.');
                setLoggedIn(false);
                localStorage.removeItem('userPhone');
              } else {
                window.location.href = '/'; // ✅ Still unblocked → go Home
              }
            } catch (err) {
              console.error('❌ Error checking block status:', err);
            }
          }, 19000);
        }
      } else {
        alert('⛔ Blocked by admin');
      }
    } catch (error) {
      console.error('❌ Login error:', error);
      alert('❌ Error logging in');
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setPhone(value);
    }
  };

  return (
    <div className="container mt-5">
      <h3>Login with Phone Number</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phone}
          onChange={handleChange}
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
