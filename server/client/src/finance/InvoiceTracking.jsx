import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InvoiceTracking = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    clientName: '',
    amount: '',
    dueDate: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing invoices from backend
  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/invoices');
        console.log('API response (invoices):', res.data);
        setInvoices(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching invoices:', err.response?.data || err.message);
        setError('Failed to load invoices. Please check the backend server.');
        setInvoices([]);
        setLoading(false);
      }
    };
    fetchInvoices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { invoiceNumber, clientName, amount, dueDate } = newInvoice;
    if (invoiceNumber && clientName && amount && dueDate) {
      try {
        const res = await axios.post('/api/invoices', {
          ...newInvoice,
          amount: parseFloat(amount),
        });
        setInvoices([...invoices, res.data]);
        setNewInvoice({ invoiceNumber: '', clientName: '', amount: '', dueDate: '', status: 'Pending' });
        setError('');
      } catch (err) {
        console.error('Error adding invoice:', err.response?.data || err.message);
        setError('Failed to add invoice. Please check the input or backend server.');
      }
    } else {
      setError('Invoice Number, Client Name, Amount, and Due Date are required.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Invoice Tracking</h2>

      <button
        onClick={() => navigate('/finance')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Finance
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <input
                type="text"
                value={newInvoice.invoiceNumber}
                onChange={(e) =>
                  setNewInvoice({ ...newInvoice, invoiceNumber: e.target.value })
                }
                placeholder="Invoice Number"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={newInvoice.clientName}
                onChange={(e) => setNewInvoice({ ...newInvoice, clientName: e.target.value })}
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
                min="0"
                step="0.01"
                required
              />
              <input
                type="date"
                value={newInvoice.dueDate}
                onChange={(e) => setNewInvoice({ ...newInvoice, dueDate: e.target.value })}
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
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Invoice
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Invoices</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Invoice Number</th>
                <th className="border px-4 py-2">Client Name</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Due Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(invoices) && invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td className="border px-4 py-2">{invoice.invoiceNumber}</td>
                    <td className="border px-4 py-2">{invoice.clientName}</td>
                    <td className="border px-4 py-2">${invoice.amount.toFixed(2)}</td>
                    <td className="border px-4 py-2">
                      {invoice.dueDate
                        ? new Date(invoice.dueDate).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="border px-4 py-2">{invoice.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No invoices found.
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

export default InvoiceTracking;