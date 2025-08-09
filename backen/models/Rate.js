// models/Rate.js
import mongoose from 'mongoose';

const RateSchema = new mongoose.Schema({
  city: String,
  gold_24k: String,
  gold_22k: String,
  gold_21k: String,
  silver: String,
  dollar_interbank: String,
  dollar_open: String
}, { timestamps: true });

const Rate = mongoose.model('Rate', RateSchema);

export default Rate; // ✅ ESM default export
