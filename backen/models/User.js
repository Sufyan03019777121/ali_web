const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  phone: String,
  blocked: Boolean,
  category: String,
  lastLogin: Date
});

module.exports = mongoose.model('User', userSchema);
