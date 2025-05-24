// server/controllers/leaveController.js
import LeaveRequest from '../models/LeaveRequest.js';

export const applyLeave = async (req, res) => {
  try {
    const { employeeName, leaveType, startDate, endDate, status } = req.body;

    if (!employeeName || !leaveType || !startDate || !endDate) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const leave = new LeaveRequest({
      employeeName,
      leaveType,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      status: status || 'Pending',
    });

    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: `Error creating leave request: ${error.message}` });
  }
};

export const getLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find().sort({ startDate: -1 });
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: `Error fetching leave requests: ${error.message}` });
  }
};
