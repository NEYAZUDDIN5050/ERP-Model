// server/models/Deal.js
import mongoose from 'mongoose';

const dealSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  stage: {
    type: String,
    enum: ['Prospecting', 'Qualification', 'Negotiation', 'Closed Won', 'Closed Lost'],
    default: 'Prospecting',
  },
  closeDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Deal = mongoose.model('Deal', dealSchema);

export default Deal;