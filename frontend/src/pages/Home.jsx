import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import UserMessage from './UserMessage';
import PaymentPrompt from './PaymentPrompt';

const Home = () => {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState('');
  const [userPhone, setUserPhone] = useState(''); // ✅ no localStorage
  const [userBlocked, setUserBlocked] = useState(false);

  // ✅ Fetch rates on load
  useEffect(() => {
    axios.get('https://ali-web-backen.onrender.com/api/rates')
      .then(res => setRates(res.data))
      .catch(err => console.log(err));
  }, []);

  // ✅ Fetch user status on load - from API directly or props
  useEffect(() => {
    // For example: default test phone (delete this in production)
    const phone = '03001234567'; // 🔥 hardcoded for test
    setUserPhone(phone);

    axios.post('https://ali-web-backen.onrender.com/api/login', { phone })
      .then(res => {
        setUserBlocked(res.data.blocked);
      })
      .catch(err => console.log(err));
  }, []);

  const filteredRates = rates.filter(rate =>
    rate.city.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-4" style={{ backgroundColor: '#6b3c2bff', minHeight: '100vh', padding: '20px' }}>
      <h2 className="text-center mb-4" style={{ color: '#bfa100' }}>Today's Rates</h2>

      <Slider />

      {/* 🔎 Search Bar */}
      <div className="mb-4 text-center">
        <input
          type="text"
          placeholder="Search by city name..."
          className="form-control w-75 mx-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredRates.map(rate => (
          <div className="col-md-4 text-center fw-bold" key={rate._id}>
            <div className="card mb-4 shadow-sm">
              <div className="card-body">
                <h2 className="card-title text-primary shadow p-2">{rate.city}</h2>
                <p className="card-text shadow p-2 rounded">24K Gold : {rate.gold_24k}</p>
                <p className="card-text shadow p-2 rounded">22K Gold : {rate.gold_22k}</p>
                <p className="card-text shadow p-2 rounded">Silver : {rate.silver}</p>
                <p className="card-text shadow p-2 rounded">Dollar : {rate.dollar}</p>
              </div>
            </div>
          </div>
        ))}

        {/* 📝 User Message */}
        <UserMessage />

        {/* 💳 Payment Prompt - show only if user exists and is not blocked */}
        {userPhone && !userBlocked && (
          <PaymentPrompt phone={userPhone} blocked={userBlocked} />
        )}

        {/* Example Static Gold Card */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm" style={{ borderColor: '#bfa100' }}>
            <div className="card-body text-center">
              <h5 className="card-title" style={{ color: '#a18905ff' }}>
                Static Gold <br />Welcome to your website
              </h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
