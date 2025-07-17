import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const UserMessage = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchMsgs = async () => {
      try {
        const res = await axios.get('https://ali-web-backen.onrender.com/api/messages/all');
        setMessages(res.data.data || []);
      } catch (error) {
        console.error(error);
        setMessages([]);
      }
    };
    fetchMsgs();
  }, []);

  return (
    <div className="container mt-4 mb-4">
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">📢 Admin Messages</h5>
        </div>
        <div className="card-body">
          {messages.length === 0 ? (
            <p className="card-text">No messages found.</p>
          ) : (
            <ul className="list-group">
              {messages.map((msg) => (
                <li key={msg._id} className="list-group-item my-2 border-2">
                  {msg.description}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserMessage;
