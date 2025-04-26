import React, { useState } from 'react';

const InvoiceTracking = () => {
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    date: '',
    client: '',
    amount: '',
    status: 'Pending', // 'Pending' or 'Paid'
  });

  const handleInvoiceSubmit = (e) => {
    e.preventDefault();
    const { date, client, amount, status } = newInvoice;
    if (date && client && amount) {
      const invoice = {
        id: invoices.length + 1,
        date,
        client,
        amount: parseFloat(amount),
        status,
      };
      setInvoices([...invoices, invoice]);
      setNewInvoice({ date: '', client: '', amount: '', status: 'Pending' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Invoice Tracking</h2>
      <form onSubmit={handleInvoiceSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            value={newInvoice.date}
            onChange={(e) => setNewInvoice({ ...newInvoice, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newInvoice.client}
            onChange={(e) => setNewInvoice({ ...newInvoice, client: e.target.value })}
            placeholder="Client Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={newInvoice.amount}
            onChange={(e) => setNewInvoice({ ...newInvoice, amount: e.target.value })}
            placeholder="Amount"
            className="border p-2 rounded"
            required
          />
          <select
            value={newInvoice.status}
            onChange={(e) => setNewInvoice({ ...newInvoice, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Add Invoice
        </button>
      </form>

      {/* Invoices Table */}
      <h3 className="text-lg font-bold mt-4">Invoices</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Client</th>
            <th className="border px-4 py-2">Amount</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice) => (
            <tr key={invoice.id}>
              <td className="border px-4 py-2">{invoice.date}</td>
              <td className="border px-4 py-2">{invoice.client}</td>
              <td className="border px-4 py-2">${invoice.amount}</td>
              <td className="border px-4 py-2">{invoice.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InvoiceTracking;