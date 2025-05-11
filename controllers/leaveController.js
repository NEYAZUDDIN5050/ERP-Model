const LeaveRequest = require('../models/LeaveRequest');

exports.applyLeave = async (req, res) => {
    try{
        const leave = new LeaveRequest(req.body);
        await leave.save();
        res.status(201).json(leave);

    } catch (error) {
        res.status(500).json({ message: error.message})
    }
};

exports.getAllLeaves = async (req, res) => {
   try {
    const leaves = await LeaveRequest.find();
    res.status(200).json(leaves);

   } catch (error) {
    res.status(500).json({ message: error.message });
   }
};