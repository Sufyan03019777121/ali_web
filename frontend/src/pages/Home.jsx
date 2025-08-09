import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import UserMessage from './UserMessage';
import PaymentPrompt from './PaymentPrompt';

const Home = () => {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [showPrompt, setShowPrompt] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ Check block status on load
  useEffect(() => {
    const storedPhone = localStorage.getItem('userPhone');
    if (storedPhone) {
      axios
        .post('https://ali-web-backen.onrender.com/api/check-block', { phone: storedPhone })
        .then((res) => {
          if (res.data.blocked) {
            alert('⛔ You have been blocked by admin.');
            localStorage.removeItem('userPhone');
            window.location.href = '/login'; // redirect to login
          } else {
            setUserPhone(storedPhone);
          }
        })
        .catch((err) => console.error(err));
    } else {
      // if no phone in storage, send to login
      window.location.href = '/login';
    }
  }, []);

  // Fetch rates function
  const fetchRates = () => {
    setLoading(true);
    axios
      .get('https://ali-web-backen.onrender.com/api/rates')
      .then((res) => setRates(res.data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  };

  // Initial fetch
  useEffect(() => {
    fetchRates();
  }, []);

  // Filtered rates
  const filteredRates = rates.filter((rate) =>
    (rate.city || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3">
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
      <div className="mb-4 text-end">
        <button
          className="btn btn-sm btn-outline-secondary"
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

      {/* 🪙 Rates Cards - Gold Section */}
      <div className="row">
        {filteredRates.length > 0 ? (
          filteredRates.map((rate) => (
            <div key={rate._id} className="col-md-6 mb-3">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h5 className="card-title text-primary">{rate.city}</h5>
                  <p className="mb-1">
                    <strong>Gold 24K:</strong> {rate.gold_24k}
                  </p>
                  <p className="mb-1">
                    <strong>Gold 22K:</strong> {rate.gold_22k}
                  </p>
                  <p className="mb-1">
                    <strong>Silver:</strong> {rate.silver}
                  </p>
                  <p className="mb-0">
                    <strong>Dollar:</strong> {rate.dollar}
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

      {/* 💸 Optional Payment Prompt */}
      {/* {showPrompt && userPhone && (
        <PaymentPrompt phone={userPhone} onClose={() => setShowPrompt(false)} />
      )} */}
    </div>
  );
};

export default Home;
