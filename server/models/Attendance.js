// models/Attendance.js
import mongoose from 'mongoose';

const attendanceSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Present',
  },
});

const Attendance = mongoose.model('Attendance', attendanceSchema);

export default Attendance;