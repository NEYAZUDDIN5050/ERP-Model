import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const IncomeExpenseTracker = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [newTransaction, setNewTransaction] = useState({
    date: '',
    description: '',
    amount: '',
    type: 'income',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing transactions from backend
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/transactions');
        console.log('API response (transactions):', res.data);
        setTransactions(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transactions:', err.response?.data || err.message);
        setError('Failed to load transactions. Please check the backend server.');
        setTransactions([]);
        setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { date, description, amount, type } = newTransaction;
    if (date && description && amount) {
      try {
        const res = await axios.post('/api/transactions', {
          ...newTransaction,
          amount: parseFloat(amount) || 0,
        });
        setTransactions([...transactions, res.data]);
        setNewTransaction({ date: '', description: '', amount: '', type: 'income' });
        setError('');
      } catch (err) {
        console.error('Error adding transaction:', err.response?.data || err.message);
        setError('Failed to add transaction. Please check the input or backend server.');
      }
    } else {
      setError('Date, Description, and Amount are required.');
    }
  };

  // Prepare data for bar chart
  const incomeTotal = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0);
  const expenseTotal = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0);

  const chartData = {
    labels: ['Income', 'Expense'],
    datasets: [
      {
        label: 'Amount ($)',
        data: [incomeTotal, expenseTotal],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Income vs Expense',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Income & Expense Tracker</h2>

      <button
        onClick={() => navigate('/finance')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Finance
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading transactions...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
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
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, description: e.target.value })
                }
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
                min="0"
                step="0.01"
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

          <h3 className="text-lg font-bold mt-4">Transactions</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Description</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Type</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transactions) && transactions.length > 0 ? (
                transactions.map((transaction) => (
                  <tr key={transaction._id}>
                    <td className="border px-4 py-2">
                      {transaction.date
                        ? new Date(transaction.date).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="border px-4 py-2">{transaction.description}</td>
                    <td className="border px-4 py-2">${transaction.amount.toFixed(2)}</td>
                    <td className="border px-4 py-2">
                      {transaction.type.charAt(0).toUpperCase() + transaction.type.slice(1)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No transactions found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h3 className="text-lg font-bold mt-6">Income vs Expense Chart</h3>
          <div className="mt-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default IncomeExpenseTracker;