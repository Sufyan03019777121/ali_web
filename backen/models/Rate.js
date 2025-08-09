// models/Rate.js
const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
  city: String,
  gold_24k: String,
  gold_22k: String,
  gold_21k: String,
  silver: String,
  dollar_interbank: String,
  dollar_open: String
}, { timestamps: true });

module.exports = mongoose.model('Rate', RateSchema);
