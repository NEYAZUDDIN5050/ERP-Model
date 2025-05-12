// controllers/leaveController.js
import LeaveRequest from '../models/LeaveRequest.js';

export const applyLeave = async (req, res) => {
  try {
    const leave = new LeaveRequest(req.body);
    await leave.save();
    res.status(201).json(leave);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add the missing getLeaves function
export const getLeaves = async (req, res) => {
  try {
    const leaves = await LeaveRequest.find();
    res.status(200).json(leaves);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

