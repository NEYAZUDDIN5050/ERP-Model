// server/controllers/employeeController.js
import Employee from '../models/Employee.js';

export const addEmployee = async (req, res) => {
  try {
    const { name, position, department, dateOfJoining } = req.body;

    if (!name || !position || !department || !dateOfJoining) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const employee = new Employee({
      name,
      position,
      department,
      dateOfJoining: new Date(dateOfJoining),
    });

    await employee.save();
    res.status(201).json(employee);
  } catch (error) {
    res.status(500).json({ message: `Error creating employee: ${error.message}` });
  }
};

export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find().sort({ dateOfJoining: -1 });
    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: `Error fetching employees: ${error.message}` });
  }
};