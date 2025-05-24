// server/models/LowStockAlert.js
import mongoose from 'mongoose';

const lowStockAlertSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  currentStock: {
    type: Number,
    required: true,
    min: 0,
  },
  threshold: {
    type: Number,
    required: true,
    min: 1,
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const LowStockAlert = mongoose.model('LowStockAlert', lowStockAlertSchema);

export default LowStockAlert;