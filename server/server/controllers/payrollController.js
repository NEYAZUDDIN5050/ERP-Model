// server/controllers/payrollController.js
import Payroll from '../models/Payroll.js';

export const addPayroll = async (req, res) => {
  try {
    const { employeeName, baseSalary, bonus, deductions } = req.body;

    if (!employeeName || baseSalary == null) {
      return res.status(400).json({ message: 'Employee Name and Base Salary are required.' });
    }

    const payroll = new Payroll({
      employeeName,
      baseSalary: parseFloat(baseSalary),
      bonus: parseFloat(bonus) || 0,
      deductions: parseFloat(deductions) || 0,
    });

    await payroll.save();
    res.status(201).json(payroll);
  } catch (error) {
    res.status(500).json({ message: `Error creating payroll: ${error.message}` });
  }
};

export const getPayrolls = async (req, res) => {
  try {
    const payrolls = await Payroll.find().sort({ createdAt: -1 });
    res.status(200).json(payrolls);
  } catch (error) {
    res.status(500).json({ message: `Error fetching payrolls: ${error.message}` });
  }
};