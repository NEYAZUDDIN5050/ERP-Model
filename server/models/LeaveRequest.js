// models/LeaveRequest.js
import mongoose from 'mongoose';

const LeaveRequestSchema = new mongoose.Schema({
  employeeName: String,
  leaveType: String,
  startDate: String,
  endDate: String,
  status: { type: String, default: 'Pending' },
});

const LeaveRequest = mongoose.model('LeaveRequest', LeaveRequestSchema);

export default LeaveRequest;

