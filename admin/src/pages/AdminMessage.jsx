import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminMessage = () => {
  const [description, setDescription] = useState('');
  const [messages, setMessages] = useState([]);

  // 🔄 Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get('https://ali-web-backen.onrender.com/api/messages/all');
      setMessages(res.data.data);
    } catch (err) {
      console.error(err);
      alert('Error fetching messages');
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ✅ Add message
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://ali-web-backen.onrender.com/api/messages/add', { description });
      alert('Message saved!');
      setDescription('');
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert('Error saving message');
    }
  };

  // 🗑️ Delete single message
  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://ali-web-backen.onrender.com/api/messages/${id}`);
      alert('Message deleted!');
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert('Error deleting message');
    }
  };

  // 🗑️ Delete all messages
  const handleDeleteAll = async () => {
    if (window.confirm('Are you sure you want to delete all messages?')) {
      try {
        await axios.delete('https://ali-web-backen.onrender.com/api/messages');
        alert('All messages deleted!');
        fetchMessages();
      } catch (err) {
        console.error(err);
        alert('Error deleting all messages');
      }
    }
  };

  return (
    <div className="container mb-4 mt-4">
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <h5 className="mb-0">📝 Admin Message Panel</h5>
        </div>
        <div className="card-body">
          {/* Add Message Form */}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <textarea
                className="form-control"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                placeholder="Enter your message here"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary me-2">Save Message</button>
            <button type="button" className="btn btn-danger" onClick={handleDeleteAll}>Delete All</button>
          </form>

          <hr />

          {/* All Messages */}
          <h6>All Messages</h6>
          {messages.length === 0 ? (
            <p>No messages found.</p>
          ) : (
            <ul className="list-group">
              {messages.map((msg) => (
                <li key={msg._id} className="list-group-item d-flex justify-content-between align-items-center">
                  {msg.description}
                  <button className="btn btn-sm btn-danger" onClick={() => handleDelete(msg._id)}>Delete</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMessage;
