import React from 'react';

const Contact = () => {
  return (
    <div className="container mt-4" style={{ backgroundColor: '#fff8e1', minHeight: '80vh', padding: '20px', borderRadius: '10px', boxShadow: '0 0 10px #bfa100' }}>
      <h2 className="text-center mb-4" style={{ color: '#bfa100' }}>Contact Us</h2>
      
      <div className="card shadow-sm" style={{ backgroundColor: '#fffaf0', borderColor: '#bfa100' }}>
        <div className="card-body">
          <h5 className="card-title" style={{ color: '#bfa100' }}>Get in Touch</h5>
          
          <p className="card-text">
            📞 <strong>Phone:</strong> <a href="tel:+923421165182" style={{ color: '#bfa100' }}>+92 342 1165182</a>
          </p>
          
          <p className="card-text">
            💬 <strong>WhatsApp:</strong> <a href="https://wa.me/923421165182" target="_blank" rel="noopener noreferrer" style={{ color: '#bfa100' }}>Chat on WhatsApp</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
