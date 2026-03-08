// server/models/SalesReport.js
import mongoose from 'mongoose';

const salesReportSchema = new mongoose.Schema({
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  customerName: {
    type: String,
    trim: true,
  },
  status: {
    type: String,
    enum: ['All', 'Pending', 'Paid', 'Overdue'],
    default: 'All',
  },
  totalSales: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const SalesReport = mongoose.model('SalesReport', salesReportSchema);

export default SalesReport;