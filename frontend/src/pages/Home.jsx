import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import UserMessage from './UserMessage';
import PaymentPrompt from './PaymentPrompt';

const API_BASE = 'https://ali-web-backen.onrender.com';

const Home = () => {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [loading, setLoading] = useState(false);

  // ✅ Block status check
  useEffect(() => {
    const storedPhone = localStorage.getItem('userPhone');

    if (!storedPhone) {
      window.location.replace('/login');
      return;
    }

    axios
      .post(`${API_BASE}/api/check-block`, { phone: storedPhone })
      .then((res) => {
        if (res.data.blocked) {
          alert('⛔ You have been blocked by admin.');
          localStorage.removeItem('userPhone');
          window.location.replace('/login');
        } else {
          setUserPhone(storedPhone);
        }
      })
      .catch((err) => {
        console.error('Block check failed:', err);
        localStorage.removeItem('userPhone');
        window.location.replace('/login');
      });
  }, []);

  // ✅ Fetch rates
  const fetchRates = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE}/api/rates`);
      setRates(res.data);
    } catch (err) {
      console.error('Failed to fetch rates:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates();
  }, []);

  const filteredRates = rates.filter((rate) =>
    (rate.city || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3 backgrond_color_brown">
      {/* 🔼 Slider */}
      <Slider />

      {/* 🔍 Search */}
      <input
        type="text"
        placeholder="Search by city..."
        className="form-control mb-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {/* 🔁 Refresh Button */}
      <div className="mb-4  text-end">
        <button
          className="btn btn-sm btn-outline-secondary refresh_button"
          onClick={fetchRates}
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
            <>🔄 Refresh Rates</>
          )}
        </button>
      </div>

      {/* 🪙 Rates Cards */}
      <div className="row">
        {filteredRates.length > 0 ? (
          filteredRates.map((rate) => (
            <div key={rate._id} className="col-md-6 mb-3">
              {/* Gold Card */}
              <div className="card shadow-sm mb-3">
                <div className="card-body">
                  <h5 className="card-title text-primary">{rate.city} - Gold Rates</h5>
                  <p className="mb-1">
                    <strong>Gold 24K:</strong> {rate.gold_24k}
                  </p>
                  <p className="mb-1">
                    <strong>Gold 22K:</strong> {rate.gold_22k}
                  </p>
                  <p className="mb-0">
                    <strong>Gold 21K:</strong> {rate.gold_21k}
                  </p>
                </div>
              </div>

              {/* Silver & Dollar Card */}
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-success">{rate.city} - Silver & Dollar</h5>
                  <p className="mb-2">
                    <strong>Silver:</strong> {rate.silver}
                  </p>
                  <p className="mb-1">
                    <strong>Dollar Interbank:</strong> {rate.dollar_interbank}
                  </p>
                  <p className="mb-0">
                    <strong>Dollar Open Market:</strong> {rate.dollar_open}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center">No rates found.</p>
        )}
      </div>

      {/* 💬 User Message */}
      <UserMessage />

      {/* 💸 Payment Prompt — Uncomment if needed */}
      {/* {userPhone && <PaymentPrompt phone={userPhone} />} */}
    </div>
  );
};

export default Home;
