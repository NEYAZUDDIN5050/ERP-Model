// server/models/LeaveRequest.js
import mongoose from 'mongoose';

const LeaveRequestSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  leaveType: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected'],
    default: 'Pending',
  },
});

const LeaveRequest = mongoose.model('LeaveRequest', LeaveRequestSchema);

export default LeaveRequest;

