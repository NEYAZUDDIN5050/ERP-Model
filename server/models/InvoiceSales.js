// server/models/Invoice.js
import mongoose from 'mongoose';

const invoiceSchema = new mongoose.Schema({
  invoiceNumber: {
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
  totalAmount: {
    type: Number,
    required: true,
    min: 0,
  },
  status: {
    type: String,
    enum: ['Pending', 'Paid', 'Overdue'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const InvoiceSales = mongoose.model('InvoiceSales', invoiceSchema);

export default InvoiceSales;