import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BankManagement = () => {
  const navigate = useNavigate();
  const [bankAccounts, setBankAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    bankName: '',
    accountNumber: '',
    balance: '',
    accountType: 'Checking',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing bank accounts from backend
  useEffect(() => {
    const fetchBankAccounts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/bank-accounts');
        console.log('API response (bank-accounts):', res.data);
        setBankAccounts(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching bank accounts:', err.response?.data || err.message);
        setError('Failed to load bank accounts. Please check the backend server.');
        setBankAccounts([]);
        setLoading(false);
      }
    };
    fetchBankAccounts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { bankName, accountNumber, balance } = newAccount;
    if (bankName && accountNumber && balance) {
      try {
        const res = await axios.post('/api/bank-accounts', {
          ...newAccount,
          balance: parseFloat(balance),
        });
        setBankAccounts([...bankAccounts, res.data]);
        setNewAccount({ bankName: '', accountNumber: '', balance: '', accountType: 'Checking' });
        setError('');
      } catch (err) {
        console.error('Error adding bank account:', err.response?.data || err.message);
        setError('Failed to add bank account. Please check the input or backend server.');
      }
    } else {
      setError('Bank Name, Account Number, and Balance are required.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Bank Management</h2>

      <button
        onClick={() => navigate('/finance')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Finance
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading bank accounts...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newAccount.bankName}
                onChange={(e) => setNewAccount({ ...newAccount, bankName: e.target.value })}
                placeholder="Bank Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={newAccount.accountNumber}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, accountNumber: e.target.value })
                }
                placeholder="Account Number"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                value={newAccount.balance}
                onChange={(e) => setNewAccount({ ...newAccount, balance: e.target.value })}
                placeholder="Balance"
                className="border p-2 rounded"
                min="0"
                step="0.01"
                required
              />
              <select
                value={newAccount.accountType}
                onChange={(e) =>
                  setNewAccount({ ...newAccount, accountType: e.target.value })
                }
                className="border p-2 rounded"
              >
                <option value="Checking">Checking</option>
                <option value="Savings">Savings</option>
                <option value="Business">Business</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Bank Account
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Bank Accounts</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Bank Name</th>
                <th className="border px-4 py-2">Account Number</th>
                <th className="border px-4 py-2">Balance</th>
                <th className="border px-4 py-2">Account Type</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(bankAccounts) && bankAccounts.length > 0 ? (
                bankAccounts.map((account) => (
                  <tr key={account._id}>
                    <td className="border px-4 py-2">{account.bankName}</td>
                    <td className="border px-4 py-2">{account.accountNumber}</td>
                    <td className="border px-4 py-2">${account.balance.toFixed(2)}</td>
                    <td className="border px-4 py-2">{account.accountType}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No bank accounts found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default BankManagement;