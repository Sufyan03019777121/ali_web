import React, { useEffect, useState } from 'react';

const PaymentPrompt = () => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Show prompt after 3 seconds
    const timer = setTimeout(() => {
      setShowPrompt(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const handlePaymentDone = () => {
    alert("Thank you for payment! You can continue now.");
    setShowPrompt(false);
  };

  return (
    <>
      {showPrompt && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.94)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          zIndex: 9999
        }}>
          <div style={{
            backgroundColor: '#fff8e1', padding: '30px', borderRadius: '10px',
            textAlign: 'center', border: '2px solid #bfa100', width: '300px'
          }}>
            <h3 style={{ color: '#bfa100' }}>🔒 Subscription Required</h3>
            <p>Select your package to continue:</p>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li>📅 Monthly: PKR 200</li>
              <li>🗓️ 6 Months: PKR 1000</li>
              <li>📆 Yearly: PKR 2000</li>
            </ul>
            <p>only Easypaisa:<br/><strong>0342-1165182</strong></p>
            <button
              onClick={handlePaymentDone}
              style={{ backgroundColor: '#bfa100', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '10px' }}
            >
              I have paid
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default PaymentPrompt;
