// server/controllers/bankAccountController.js
import BankAccount from '../models/BankAccount.js';

export const addBankAccount = async (req, res) => {
  try {
    const { bankName, accountNumber, balance, accountType } = req.body;

    if (!bankName || !accountNumber || balance == null) {
      return res.status(400).json({ message: 'Bank Name, Account Number, and Balance are required.' });
    }

    const bankAccount = new BankAccount({
      bankName,
      accountNumber,
      balance: parseFloat(balance),
      accountType: accountType || 'Checking',
    });

    await bankAccount.save();
    res.status(201).json(bankAccount);
  } catch (error) {
    res.status(500).json({ message: `Error creating bank account: ${error.message}` });
  }
};

export const getBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.find().sort({ createdAt: -1 });
    res.status(200).json(bankAccounts);
  } catch (error) {
    res.status(500).json({ message: `Error fetching bank accounts: ${error.message}` });
  }
};