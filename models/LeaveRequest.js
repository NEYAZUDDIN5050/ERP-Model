// models/LeaveRequest.js
const mongoose = require('mongoose');

const LeaveRequestSchema = new mongoose.Schema({
  employeeName: String,
  leaveType: String,
  startDate: String,
  endDate: String,
  status: { type: String, default: 'Pending' },
});

module.exports = mongoose.model('LeaveRequest', LeaveRequestSchema);
