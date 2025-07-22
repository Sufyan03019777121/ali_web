import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PaymentPrompt = ({ phone, blocked }) => {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // 🔔 Sirf unblocked users ko 20 second bad block karna
    if (!blocked) {
      const timer = setTimeout(() => {
        autoBlockUser();
      }, 20000);

      return () => clearTimeout(timer);
    }
  }, [blocked]);

  const autoBlockUser = async () => {
    try {
      await axios.post('https://ali-web-backen.onrender.com/api/auto-block', { phone });
      setShowPrompt(true);
    } catch (err) {
      console.log('Auto block error:', err);
    }
  };

  const handlePaymentDone = () => {
    alert("شکریہ! آپ اب ویب سائٹ استعمال کر سکتے ہیں۔");
    setShowPrompt(false);
  };

  // 🔒 Show prompt only if user is blocked
  if (!blocked && !showPrompt) return null;

  return (
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
        <h3 style={{ color: '#bfa100' }}>🔒 سبسکرپشن ضروری ہے</h3>
        <p>پیکج منتخب کریں:</p>
        <ul style={{ listStyle: 'none', padding: 0 }}>
          <li>📅 مہینہ وار: PKR 200</li>
          <li>🗓️ 6 ماہ: PKR 1000</li>
          <li>📆 سالانہ: PKR 2000</li>
        </ul>
        <p>صرف Easypaisa پر ادا کریں:<br/><strong>0342-1165182</strong></p>
        <button
          onClick={handlePaymentDone}
          style={{ backgroundColor: '#bfa100', color: 'white', padding: '10px 20px', border: 'none', borderRadius: '5px', marginTop: '10px' }}
        >
          میں نے ادائیگی کر دی ہے
        </button>
      </div>
    </div>
  );
};

export default PaymentPrompt;
