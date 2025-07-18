import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  phone: String,
  blocked: Boolean,
  category: String,
  lastLogin: Date
});

const User = mongoose.model('User', userSchema);

export default User;
