// server/models/Stock.js
import mongoose from 'mongoose';

const stockSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  warehouse: {
    type: String,
    required: true,
    trim: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

stockSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Stock = mongoose.model('Stock', stockSchema);

export default Stock;