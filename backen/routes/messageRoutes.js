import express from 'express';
import Message from '../models/Message.js';

const router = express.Router();

// POST: Add message
router.post('/add', async (req, res) => {
  const { description } = req.body;
  try {
    const newMsg = new Message({ description });
    await newMsg.save();
    res.status(201).json({
      success: true,
      message: 'Message saved',
      data: newMsg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET: Get latest message
router.get('/', async (req, res) => {
  try {
    const latestMsg = await Message.findOne().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: latestMsg
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// GET: Get all messages
router.get('/all', async (req, res) => {
  try {
    const allMsgs = await Message.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: allMsgs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE: Delete single message
router.delete('/:id', async (req, res) => {
  try {
    await Message.findByIdAndDelete(req.params.id);
    res.json({
      success: true,
      message: 'Message deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// DELETE: Delete all messages
router.delete('/', async (req, res) => {
  try {
    await Message.deleteMany({});
    res.json({
      success: true,
      message: 'All messages deleted'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

export default router;
