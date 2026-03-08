// server/models/StockMovement.js
import mongoose from 'mongoose';

const stockMovementSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
    trim: true,
  },
  type: {
    type: String,
    enum: ['In', 'Out'],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
  },
  warehouse: {
    type: String,
    required: true,
    trim: true,
  },
  movementDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const StockMovement = mongoose.model('StockMovement', stockMovementSchema);

export default StockMovement;