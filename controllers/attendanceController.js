const Attendence = require('../models/Attendence');

exports.createAttendence= async (requestAnimationFrame, res) => {
      try{
        const attendence = new Attendence(requestAnimationFrame.body);
        await attendance.save();
        res.status(201).json(attendence);

      }catch (error) {
        res.status(500).json({ message: error.message });
      }
};

exports.getAllAttendance = async (req, res) => {
    try{
        const records = await Attendance.find();
        res.status(200).json(records);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};