// controllers/attendanceController.js
import Attendance from '../models/Attendance.js';

export const createAttendance = async (req, res) => {
  try {
    const { employeeName, date, status } = req.body;

    if (!employeeName || !date) {
      return res.status(400).json({ message: 'Employee name and date are required.' });
    }

    const attendance = new Attendance({
      employeeName,
      date: new Date(date),
      status: status || 'Present',
    });

    await attendance.save();
    res.status(201).json(attendance);
  } catch (error) {
    res.status(500).json({ message: `Error creating attendance: ${error.message}` });
  }
};

export const getAllAttendance = async (req, res) => {
  try {
    const records = await Attendance.find().sort({ date: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: `Error fetching attendance: ${error.message}` });
  }
};