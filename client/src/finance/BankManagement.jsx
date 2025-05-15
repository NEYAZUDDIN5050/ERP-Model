import React, { useState } from 'react';

const BankManagement = () => {
  const [accounts, setAccounts] = useState([]);
  const [newAccount, setNewAccount] = useState({
    accountName: '',
    accountNumber: '',
    balance: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewAccount({ ...newAccount, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAccounts([...accounts, newAccount]);
    setNewAccount({ accountName: '', accountNumber: '', balance: '' }); // Reset form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Bank Management</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="accountName"
          value={newAccount.accountName}
          onChange={handleChange}
          placeholder="Account Name"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="text"
          name="accountNumber"
          value={newAccount.accountNumber}
          onChange={handleChange}
          placeholder="Account Number"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="number"
          name="balance"
          value={newAccount.balance}
          onChange={handleChange}
          placeholder="Initial Balance"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Account
        </button>
      </form>

      {/* Accounts Table */}
      <h3 className="text-lg font-bold mt-4">Bank Accounts</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Account Name</th>
            <th className="border px-4 py-2">Account Number</th>
            <th className="border px-4 py-2">Balance</th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{account.accountName}</td>
              <td className="border px-4 py-2">{account.accountNumber}</td>
              <td className="border px-4 py-2">${account.balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BankManagement;