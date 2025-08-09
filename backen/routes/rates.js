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
    res.status(201).json({ message: 'Rate added successfully', rate: newRate });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update rate by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedRate = await Rate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedRate) return res.status(404).json({ message: 'Rate not found' });
    res.json(updatedRate);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE one rate by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedRate = await Rate.findByIdAndDelete(req.params.id);
    if (!deletedRate) return res.status(404).json({ message: 'Rate not found' });
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
