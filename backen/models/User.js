import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: String,
  blocked: Boolean,
  autoBlocked: { type: Boolean, default: false }, // ✅ added
  category: String,
  lastLogin: Date,
});

export default mongoose.model('User', userSchema);
