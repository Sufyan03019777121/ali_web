import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Login = ({ setLoggedIn }) => {
  const [phone, setPhone] = useState('');
  const [redirected, setRedirected] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedPhone = localStorage.getItem('userPhone');
    const alreadyChecked = localStorage.getItem('autoChecked');

    if (storedPhone && !alreadyChecked) {
      axios
        .post('https://ali-web-backen.onrender.com/api/check-block', { phone: storedPhone })
        .then(res => {
          if (!res.data.blocked) {
            setLoggedIn(true);
            localStorage.setItem('autoChecked', 'true'); // Mark as checked
            navigate('/', { replace: true });
          } else {
            localStorage.removeItem('userPhone');
          }
        })
        .catch(err => console.error('❌ Auto-login check error:', err));
    }
  }, [setLoggedIn, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const phoneRegex = /^03\d{9}$/;
    if (!phoneRegex.test(phone)) {
      alert('📱 فون نمبر 11 ہندسوں کا ہونا چاہیے اور 03 سے شروع ہونا چاہیے');
      return;
    }

    try {
      const res = await axios.post('https://ali-web-backen.onrender.com/api/login', { phone });

      if (!res.data.blocked) {
        setLoggedIn(true);
        localStorage.setItem('userPhone', phone);
        localStorage.removeItem('autoChecked');

        // Show subscription alert and wait for user to confirm
        Swal.fire({
          title: '<h3 style="color: #bfa100;">🔒 سبسکرپشن ضروری ہے</h3>',
          html: `
            <p>براہِ کرم اپنا پیکج منتخب کریں تاکہ آپ آگے بڑھ سکیں:</p>
            <ul style="list-style: none; padding: 0;">
              <li>📅 ماہانہ: PKR 200</li>
              <li>🗓️ 6 ماہ: PKR 1000</li>
              <li>📆 سالانہ: PKR 2000</li>
            </ul>
            <p>صرف ایزی پیسہ:<br /><strong>0342-1165182</strong></p>
            <p style="color: red; font-weight: bold; margin-top: 10px;">
              ورنہ  بلاک کر دیا جائے گا!
            </p>
          `,
          icon: 'info',
          confirmButtonText: 'ٹھیک ہے'
        }).then(() => {
          // Redirect AFTER user clicks "ٹھیک ہے"
          if (!redirected) {
            setRedirected(true);

            setTimeout(async () => {
              console.log('♻️ 19 سیکنڈ کے بعد بلاک اسٹیٹس چیک کر رہے ہیں...');
              try {
                const storedPhone = localStorage.getItem('userPhone');
                if (!storedPhone) return;

                const statusRes = await axios.post(
                  'https://ali-web-backen.onrender.com/api/check-block',
                  { phone: storedPhone }
                );

                if (statusRes.data.blocked) {
                  await Swal.fire({
                    icon: 'error',
                    title: '⛔ آپ کو ایڈمن نے بلاک کر دیا ہے',
                    text: 'براہ کرم سبسکرپشن کروائیں یا ایڈمن سے رابطہ کریں۔'
                  });
                  setLoggedIn(false);
                  localStorage.removeItem('userPhone');
                  localStorage.removeItem('autoChecked');
                  navigate('/login', { replace: true });
                } else {
                  localStorage.setItem('autoChecked', 'true');
                  navigate('/', { replace: true });
                }
              } catch (err) {
                console.error('❌ بلاک اسٹیٹس چیک میں خرابی:', err);
              }
            }, 25000);
          } else {
            navigate('/', { replace: true });
          }
        });
      } else {
        alert('⛔ آپ کو ایڈمن نے بلاک کر دیا ہے');
      }
    } catch (error) {
      console.error('❌ لاگ ان میں خرابی:', error);
      alert('❌ لاگ ان کرنے میں مسئلہ ہے');
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
      <h3>فون نمبر سے لاگ ان کریں</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={phone}
          onChange={handleChange}
          placeholder="فون نمبر درج کریں"
          required
          className="form-control mb-2"
          maxLength="11"
        />
        <button type="submit" className="btn btn-primary">لاگ ان</button>
      </form>

      {/* WhatsApp اور Call بٹن */}
      <div className="mt-4 d-flex gap-3">
        <a
          href="https://wa.me/923421165182"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-success flex-fill"
        >
          📱 WhatsApp کریں
        </a>
        <a
          href="tel:+923421165182"
          className="btn btn-info text-white flex-fill"
        >
          📞 کال کریں
        </a>
      </div>

      {/* نیچے پیغام */}
      <div className="mt-4 p-3 bg-warning text-dark rounded">
        <h5>💰 دی گئی قیمتیں دیکھیں:</h5>
        <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
          <li>💎 سونا کی قیمتیں</li>
          <li>💵 ڈالر کی قیمتیں</li>
          <li>🥈 چاندی کی قیمتیں</li>
        </ul>
      </div>

      {/* Example nav link for Home */}
      <div className="mt-3">
        <Link className="btn btn-link" to="/">
          🏠 ہوم پیج پر جائیں
        </Link>
      </div>
    </div>
  );
};

export default Login;
