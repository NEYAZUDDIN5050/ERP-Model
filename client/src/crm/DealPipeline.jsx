import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DealPipeline = () => {
  const navigate = useNavigate();
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState({
    title: '',
    customerName: '',
    amount: '',
    stage: 'Prospecting',
    closeDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/crm/deals');
        console.log('API response (deals):', res.data);
        setDeals(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deals:', err.response?.data || err.message);
        setError('Failed to load deals. Please check the backend server.');
        setDeals([]);
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { title, customerName, amount } = newDeal;
    if (title && customerName && amount) {
      try {
        const res = await axios.post('/api/crm/deals', {
          ...newDeal,
          amount: parseFloat(newDeal.amount) || 0,
        });
        setDeals([...deals, res.data]);
        setNewDeal({ title: '', customerName: '', amount: '', stage: 'Prospecting', closeDate: '' });
        setError('');
      } catch (err) {
        console.error('Error adding deal:', err.response?.data || err.message);
        setError('Failed to add deal. Please check the input or backend server.');
      }
    } else {
      setError('Title, Customer Name, and Amount are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewDeal({ ...newDeal, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Deal Pipeline</h2>
      <button
        onClick={() => navigate('/crm')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to CRM
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading deals...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="title"
                value={newDeal.title}
                onChange={handleChange}
                placeholder="Deal Title"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="customerName"
                value={newDeal.customerName}
                onChange={handleChange}
                placeholder="Customer Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="amount"
                value={newDeal.amount}
                onChange={handleChange}
                placeholder="Amount"
                className="border p-2 rounded"
                min="0"
                step="0.01"
                required
              />
              <select
                name="stage"
                value={newDeal.stage}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Prospecting">Prospecting</option>
                <option value="Qualification">Qualification</option>
                <option value="Negotiation">Negotiation</option>
                <option value="Closed Won">Closed Won</option>
                <option value="Closed Lost">Closed Lost</option>
              </select>
              <input
                type="date"
                name="closeDate"
                value={newDeal.closeDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Deal
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Deals</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Title</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Stage</th>
                <th className="border px-4 py-2">Close Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(deals) && deals.length > 0 ? (
                deals.map((deal) => (
                  <tr key={deal._id}>
                    <td className="border px-4 py-2">{deal.title}</td>
                    <td className="border px-4 py-2">{deal.customerName}</td>
                    <td className="border px-4 py-2">${deal.amount.toFixed(2)}</td>
                    <td className="border px-4 py-2">{deal.stage}</td>
                    <td className="border px-4 py-2">
                      {deal.closeDate ? new Date(deal.closeDate).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No deals found.
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

export default DealPipeline;