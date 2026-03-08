// server/models/SalesOrder.js
import mongoose from 'mongoose';

const salesOrderSchema = new mongoose.Schema({
  orderNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  customerName: {
    type: String,
    required: true,
    trim: true,
  },
  items: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Processing', 'Shipped', 'Delivered'],
    default: 'Pending',
  },
  orderDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SalesOrder = mongoose.model('SalesOrder', salesOrderSchema);

export default SalesOrder;