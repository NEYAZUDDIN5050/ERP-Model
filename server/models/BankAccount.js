// server/models/BankAccount.js
import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
  bankName: {
    type: String,
    required: true,
    trim: true,
  },
  accountNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  balance: {
    type: Number,
    required: true,
    min: 0,
  },
  accountType: {
    type: String,
    enum: ['Checking', 'Savings', 'Business'],
    default: 'Checking',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

export default BankAccount;