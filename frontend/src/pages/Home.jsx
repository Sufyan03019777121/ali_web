import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Slider from '../components/Slider';
import UserMessage from './UserMessage';
import PaymentPrompt from './PaymentPrompt';

const Home = () => {
  const [rates, setRates] = useState([]);
  const [search, setSearch] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userBlocked, setUserBlocked] = useState(false);

  // ✅ Get saved phone and check login status
  // useEffect(() => {
  //   const savedPhone = localStorage.getItem('userPhone');
  //   if (savedPhone) {
  //     setUserPhone(savedPhone);

  //     axios.post('https://ali-web-backen.onrender.com/api/login', { phone: savedPhone })
  //       .then(res => {
  //         setUserBlocked(res.data.blocked);
  //       })
  //       .catch(err => console.log(err));
  //   }
  // }, []);

  // ✅ Fetch rates
  useEffect(() => {
    axios.get('https://ali-web-backen.onrender.com/api/rates')
      .then(res => setRates(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredRates = rates.filter(rate =>
    rate.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="container mt-3">
      <Slider />
      <UserMessage />

      {/* 🔍 Search bar */}
      <input
        type="text"
        placeholder="Search..."
        className="form-control mb-3"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

            {/* Show PaymentPrompt only if not blocked  */}
      {/* {!userBlocked && userPhone && <PaymentPrompt phone={userPhone} />} */}

      {/* 🪙 Rates List */}
      <div className="row">
        {filteredRates.map((rate, index) => (
          <div className="col-md-4 mb-4" key={index}>
            <div className="card">
              <img
                src={rate.image}
                className="card-img-top"
                alt={rate.name}
                style={{ height: '200px', objectFit: 'cover' }}
              />
              <div className="card-body">
                <h5 className="card-title">{rate.name}</h5>
                <p className="card-text">Price: {rate.price}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
