// models/Attendence.js (note spelling: should match your import path)
import mongoose from 'mongoose';

const attendenceSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent'],
    default: 'Present',
  },
});

const Attendence = mongoose.model('Attendence', attendenceSchema);

export default Attendence;
