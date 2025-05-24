// server/models/Performance.js
import mongoose from 'mongoose';

const performanceSchema = new mongoose.Schema({
  employeeName: {
    type: String,
    required: true,
    trim: true,
  },
  goalDescription: {
    type: String,
    required: true,
    trim: true,
  },
  targetDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ['Pending', 'In Progress', 'Completed'],
    default: 'Pending',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Performance = mongoose.model('Performance', performanceSchema);

export default Performance;