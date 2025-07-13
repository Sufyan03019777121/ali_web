import React from 'react';
import gold_imag from "../imags/gold_imag.jpeg"
import silver_imag from "../imags/silver_image.jpeg"
import dollar_imag from "../imags/dollar_imag.jpeg"

const Home = () => {
  return (
    <div className="container mt-4" style={{ backgroundColor: '#fff8e1', minHeight: '100vh', padding: '20px' }}>
      <h2 className="text-center mb-4" style={{ color: '#bfa100' }}>Today's Rates</h2>
      <div className="row">

        {/* Gold Card */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm" style={{ borderColor: '#bfa100' }}>
            <img
              src={gold_imag}
              className="card-img-top"
              alt="Gold"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ color: '#bfa100' }}>Gold Rates</h5>
              <p className="card-text">24K: PKR 359,500 per tola</p>
              <p className="card-text">22K: PKR 329,540 per tola</p>
            </div>
          </div>
        </div>

        {/* Silver Card */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm" style={{ borderColor: '#a8a8a8' }}>
            <img
              src={silver_imag}
              className="card-img-top"
              alt="Silver"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title" style={{ color: '#757575' }}>Silver Rates</h5>
              <p className="card-text">PKR 4,200 per tola</p>
            </div>
          </div>
        </div>

        {/* Dollar Card */}
        <div className="col-md-4">
          <div className="card mb-4 shadow-sm" style={{ borderColor: '#007bff' }}>
            <img
              src={dollar_imag}
              className="card-img-top"
              alt="Dollar"
              style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body">
              <h5 className="card-title text-primary">Dollar Rate</h5>
              <p className="card-text">USD to PKR: 278.50</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Home;
