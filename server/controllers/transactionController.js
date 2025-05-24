
// server/controllers/transactionController.js
import Transaction from '../models/Transaction.js';

export const addTransaction = async (req, res) => {
  try {
    const { date, description, amount, type } = req.body;

    if (!date || !description || amount == null || !type) {
      return res.status(400).json({ message: 'Date, Description, Amount, and Type are required.' });
    }

    const transaction = new Transaction({
      date: new Date(date),
      description,
      amount: parseFloat(amount),
      type,
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: `Error creating transaction: ${error.message}` });
  }
};

export const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find().sort({ createdAt: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: `Error fetching transactions: ${error.message}` });
  }
};