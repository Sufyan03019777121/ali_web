// routes/rates.js
import express from 'express';
import Rate from '../models/Rate.js';

const router = express.Router();

// GET all rates
router.get('/', async (req, res) => {
  try {
    const rates = await Rate.find();
    res.json(rates);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new rate
router.post('/', async (req, res) => {
  try {
    const newRate = new Rate(req.body);
    await newRate.save();
    res.json({ message: 'Rate added successfully', rate: newRate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update rate
router.put('/:id', async (req, res) => {
  try {
    const updatedRate = await Rate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE one rate
router.delete('/:id', async (req, res) => {
  try {
    await Rate.findByIdAndDelete(req.params.id);
    res.json({ message: 'Rate deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE all rates
router.delete('/', async (req, res) => {
  try {
    await Rate.deleteMany({});
    res.json({ message: 'All rates deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
