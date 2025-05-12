import mongoose from 'mongoose';

const employeeSchema = new mongoose.Schema({
  name: String,
  position: String,
  joiningDate: String,
});

const Employee = mongoose.model('Employee', employeeSchema);

export default Employee;
