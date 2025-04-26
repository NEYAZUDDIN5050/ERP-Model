import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';

const IncomeExpenseTracker = ({ setIncomeData, setExpenseData }) => {
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    type: 'income', // 'income' or 'expense'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, type } = newTransaction;
    if (amount) {
      if (type === 'income') {
        setIncomeData((prev) => [...prev, parseFloat(amount)]);
      } else {
        setExpenseData((prev) => [...prev, parseFloat(amount)]);
      }
      setNewTransaction({ date: '', description: '', amount: '', type: 'income' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Income & Expense Tracker</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            value={newTransaction.date}
            onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newTransaction.description}
            onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
            placeholder="Description"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={newTransaction.amount}
            onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
            placeholder="Amount"
            className="border p-2 rounded"
            required
          />
          <select
            value={newTransaction.type}
            onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Add Transaction
        </button>
      </form>
    </div>
  );
};

export default IncomeExpenseTracker;