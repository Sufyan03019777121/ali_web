import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
  const [rates, setRates] = useState([]);
  const [form, setForm] = useState({ city: '', gold_24k: '', gold_22k: '', silver: '', dollar: '' });

  const fetchRates = () => {
    axios.get('http://localhost:5000/api/rates')
      .then(res => setRates(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => { fetchRates(); }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/rates', form)
      .then(() => {
        fetchRates();
        setForm({ city: '', gold_24k: '', gold_22k: '', silver: '', dollar: '' });
      });
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/rates/${id}`)
      .then(() => fetchRates());
  };

  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all rates?")) {
      axios.delete('http://localhost:5000/api/rates')
        .then(() => fetchRates())
        .catch(err => console.log(err));
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Admin Panel</h2>

      {/* Form */}
      <div className="card mb-4">
        <div className="card-header bg-primary text-white">Add New Rate</div>
        <div className="card-body">
          <form onSubmit={handleSubmit} className="row g-3">
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="City" value={form.city} onChange={e => setForm({ ...form, city: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Gold 24K" value={form.gold_24k} onChange={e => setForm({ ...form, gold_24k: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Gold 22K" value={form.gold_22k} onChange={e => setForm({ ...form, gold_22k: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Silver" value={form.silver} onChange={e => setForm({ ...form, silver: e.target.value })} required />
            </div>
            <div className="col-md-2">
              <input type="text" className="form-control" placeholder="Dollar" value={form.dollar} onChange={e => setForm({ ...form, dollar: e.target.value })} required />
            </div>
            <div className="col-md-2 d-grid">
              <button type="submit" className="btn btn-success">Add Rate</button>
            </div>
          </form>
        </div>
      </div>

      {/* Delete All Button */}
      <div className="mb-4 text-end">
        <button onClick={handleDeleteAll} className="btn btn-danger">Delete All Rates</button>
      </div>

      {/* Rates Table */}
      <div className="card">
        <div className="card-header bg-secondary text-white">Rates List</div>
        <div className="card-body p-0">
          <table className="table table-striped mb-0">
            <thead className="table-dark">
              <tr className='font_size_0_7rem'>
                <th>City</th>
                <th>Gold 24K</th>
                <th>Gold 22K</th>
                <th>Silver</th>
                <th>Dollar</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rates.map(rate => (
                <tr className='font_size_0_7rem' key={rate._id}>
                  <td>{rate.city}</td>
                  <td>{rate.gold_24k}</td>
                  <td>{rate.gold_22k}</td>
                  <td>{rate.silver}</td>
                  <td>{rate.dollar}</td>
                  <td>
                    <button onClick={() => handleDelete(rate._id)} className="btn btn-sm btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
              {rates.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center">No rates found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Admin;
