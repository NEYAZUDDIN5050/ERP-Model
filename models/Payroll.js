// server/models/Payroll.js
import mongoose from 'mongoose';

const payrollSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  baseSalary: {
    type: Number,
    required: true,
    min: 0,
  },
  bonus: {
    type: Number,
    default: 0,
    min: 0,
  },
  deductions: {
    type: Number,
    default: 0,
    min: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Payroll = mongoose.model('Payroll', payrollSchema);

export default Payroll;