// server/models/Employee.js
import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  position: {
    type: String,
    required: true,
    trim: true,
  },
  department: {
    type: String,
    required: true,
    trim: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
