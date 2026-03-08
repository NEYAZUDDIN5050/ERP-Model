import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InvoiceGeneration = () => {
  const navigate = useNavigate();
  const [invoices, setInvoices] = useState([]);
  const [newInvoice, setNewInvoice] = useState({
    invoiceNumber: '',
    customerName: '',
    items: '',
    totalAmount: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchInvoices = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/sales/invoices');
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
    const { invoiceNumber, customerName, totalAmount } = newInvoice;
    if (invoiceNumber && customerName && totalAmount) {
      try {
        const res = await axios.post('/api/sales/invoices', {
          ...newInvoice,
          totalAmount: parseFloat(newInvoice.totalAmount) || 0,
        });
        setInvoices([...invoices, res.data]);
        setNewInvoice({ invoiceNumber: '', customerName: '', items: '', totalAmount: '', status: 'Pending' });
        setError('');
      } catch (err) {
        console.error('Error adding invoice:', err.response?.data || err.message);
        setError('Failed to add invoice. Please check the input or backend server.');
      }
    } else {
      setError('Invoice Number, Customer Name, and Total Amount are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewInvoice({ ...newInvoice, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Invoice Generation</h2>
      <button
        onClick={() => navigate('/sales')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Sales
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading invoices...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="invoiceNumber"
                value={newInvoice.invoiceNumber}
                onChange={handleChange}
                placeholder="Invoice Number"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="customerName"
                value={newInvoice.customerName}
                onChange={handleChange}
                placeholder="Customer Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="items"
                value={newInvoice.items}
                onChange={handleChange}
                placeholder="Items (e.g., Product A, Product B)"
                className="border p-2 rounded"
              />
              <input
                type="number"
                name="totalAmount"
                value={newInvoice.totalAmount}
                onChange={handleChange}
                placeholder="Total Amount"
                className="border p-2 rounded"
                min="0"
                step="0.01"
                required
              />
              <select
                name="status"
                value={newInvoice.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
              Add Invoice
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Invoices</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Invoice Number</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Items</th>
                <th className="border px-4 py-2">Total Amount</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(invoices) && invoices.length > 0 ? (
                invoices.map((invoice) => (
                  <tr key={invoice._id}>
                    <td className="border px-4 py-2">{invoice.invoiceNumber}</td>
                    <td className="border px-4 py-2">{invoice.customerName}</td>
                    <td className="border px-4 py-2">{invoice.items || '-'}</td>
                    <td className="border px-4 py-2">${invoice.totalAmount.toFixed(2)}</td>
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

export default InvoiceGeneration;