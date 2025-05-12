// controllers/attendanceController.js

import Attendence from '../models/Attendence.js'; // Note: use `Attendance` with capital A

// Create Attendance
export const createAttendence = async (req, res) => {
  try {
    const attendence = new Attendence(req.body);
    await attendence.save();
    res.status(201).json(attendence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get All Attendance
export const getAllAttendence = async (req, res) => {
  try {
    const records = await Attendence.find();
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
