import React from 'react';

const About = () => {
  return (
    <div className="container mt-4" style={{ backgroundColor: '#fff8e1', minHeight: '80vh', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px #bfa100' }}>
      <h2 className="text-center mb-4" style={{ color: '#bfa100' }}>About Gold Types</h2>
      
      <div className="card shadow-sm" style={{ backgroundColor: '#fffaf0', borderColor: '#bfa100' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: '#bfa100' }}>Gold Purity Details</h5>
          
          <p className="card-text">
            <strong>🥇 24K:</strong> Pure gold, 99.9% purity.
          </p>
          
          <p className="card-text">
            <strong>🏅 22K:</strong> Contains 91.6% gold mixed with alloy for strength.
          </p>
          
          <p className="card-text">
            <strong>💍 18K:</strong> 75% gold, used for durable jewelry.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
