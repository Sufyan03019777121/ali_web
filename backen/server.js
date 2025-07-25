import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import rateRoutes from './routes/rates.js';
import messageRoutes from './routes/messageRoutes.js';
import User from './models/User.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ali_web', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Routes
app.use('/api/rates', rateRoutes);
app.use('/api/messages', messageRoutes);

// Login route with auto block (only once)
app.post('/api/login', async (req, res) => {
  const { phone } = req.body;
  let user = await User.findOne({ phone });

  if (!user) {
    user = new User({ phone, blocked: false, autoBlocked: false, category: 'monthly', lastLogin: new Date() });
    await user.save();

    // ✅ Start auto block timer for 20 seconds (first time only)
    setTimeout(async () => {
      const current = await User.findOne({ phone });
      if (current && !current.blocked && !current.autoBlocked) {
        await User.updateOne({ phone }, { blocked: true, autoBlocked: true });
        console.log(`User ${phone} auto blocked after 20 seconds`);
      }
    }, 20000);

  } else {
    user.lastLogin = new Date();
    await user.save();

    // ✅ Start timer only if not blocked and not already auto blocked
    if (!user.blocked && !user.autoBlocked) {
      setTimeout(async () => {
        const current = await User.findOne({ phone });
        if (current && !current.blocked && !current.autoBlocked) {
          await User.updateOne({ phone }, { blocked: true, autoBlocked: true });
          console.log(`User ${phone} auto blocked after 20 seconds`);
        }
      }, 20000);
    }
  }

  res.json({ success: true, blocked: user.blocked });
});

// Get All Users
app.get('/api/users', async (req, res) => {
  const users = await User.find();
  res.json({ users, count: users.length });
});

// Block User
app.post('/api/block-user', async (req, res) => {
  const { phone } = req.body;
  await User.updateOne({ phone }, { blocked: true });
  res.json({ success: true });
});

// Unblock User (prevent future auto block)
app.post('/api/unblock-user', async (req, res) => {
  const { phone } = req.body;
  await User.updateOne({ phone }, { blocked: false, autoBlocked: true });
  // ✅ admin ne unblock kar diya, ab kabhi auto block nahi hoga
  res.json({ success: true });
});

// Set User Category
app.post('/api/set-category', async (req, res) => {
  const { phone, category } = req.body;
  await User.updateOne({ phone }, { category });
  res.json({ success: true });
});

// Delete User
app.post('/api/delete-user', async (req, res) => {
  const { phone } = req.body;
  await User.deleteOne({ phone });
  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
