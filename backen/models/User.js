// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: { type: String, unique: true },
  blocked: Boolean,
  autoBlocked: { type: Boolean, default: false }, // نئی فیلڈ
  category: String,
  lastLogin: Date,
});

export default mongoose.model('User', userSchema);
