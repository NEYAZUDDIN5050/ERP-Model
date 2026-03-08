// server/controllers/performanceController.js
import Performance from '../models/Performance.js';

export const addPerformanceGoal = async (req, res) => {
  try {
    const { employeeName, goalDescription, targetDate, status } = req.body;

    if (!employeeName || !goalDescription || !targetDate) {
      return res.status(400).json({ message: 'Employee Name, Goal Description, and Target Date are required.' });
    }

    const performance = new Performance({
      employeeName,
      goalDescription,
      targetDate: new Date(targetDate),
      status: status || 'Pending',
    });

    await performance.save();
    res.status(201).json(performance);
  } catch (error) {
    res.status(500).json({ message: `Error creating performance goal: ${error.message}` });
  }
};

export const getPerformanceGoals = async (req, res) => {
  try {
    const goals = await Performance.find().sort({ createdAt: -1 });
    res.status(200).json(goals);
  } catch (error) {
    res.status(500).json({ message: `Error fetching performance goals: ${error.message}` });
  }
};