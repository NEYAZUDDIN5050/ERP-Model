// server/controllers/reportController.js
import Report from '../models/Report.js';

export const addReport = async (req, res) => {
  try {
    const { period, revenue, expenses, profit } = req.body;

    if (!period || revenue == null || expenses == null) {
      return res.status(400).json({ message: 'Period, Revenue, and Expenses are required.' });
    }

    const report = new Report({
      period,
      revenue: parseFloat(revenue),
      expenses: parseFloat(expenses),
      profit: parseFloat(profit),
    });

    await report.save();
    res.status(201).json(report);
  } catch (error) {
    res.status(500).json({ message: `Error creating report: ${error.message}` });
  }
};

export const getReports = async (req, res) => {
  try {
    const reports = await Report.find().sort({ createdAt: -1 });
    res.status(200).json(reports);
  } catch (error) {
    res.status(500).json({ message: `Error fetching reports: ${error.message}` });
  }
};