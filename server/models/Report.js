// server/models/Report.js
import mongoose from 'mongoose';

const reportSchema = new mongoose.Schema({
  period: {
    type: String,
    required: true,
    trim: true,
  },
  revenue: {
    type: Number,
    required: true,
    min: 0,
  },
  expenses: {
    type: Number,
    required: true,
    min: 0,
  },
  profit: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Report = mongoose.model('Report', reportSchema);

export default Report;