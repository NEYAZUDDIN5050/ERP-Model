import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LowStockAlert = () => {
  const navigate = useNavigate();
  const [alerts, setAlerts] = useState([]);
  const [newAlert, setNewAlert] = useState({
    productName: '',
    currentStock: '',
    threshold: '',
    status: 'Active',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/inventory/low-stock-alerts');
        console.log('API response (alerts):', res.data);
        setAlerts(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching alerts:', err.response?.data || err.message);
        setError('Failed to load alerts. Please check the backend server.');
        setAlerts([]);
        setLoading(false);
      }
    };
    fetchAlerts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, currentStock, threshold } = newAlert;
    if (productName && currentStock && threshold) {
      try {
        const res = await axios.post('/api/inventory/low-stock-alerts', {
          ...newAlert,
          currentStock: parseInt(newAlert.currentStock) || 0,
          threshold: parseInt(newAlert.threshold) || 0,
        });
        setAlerts([...alerts, res.data]);
        setNewAlert({ productName: '', currentStock: '', threshold: '', status: 'Active' });
        setError('');
      } catch (err) {
        console.error('Error adding alert:', err.response?.data || err.message);
        setError('Failed to add alert. Please check the input or backend server.');
      }
    } else {
      setError('Product Name, Current Stock, and Threshold are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewAlert({ ...newAlert, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Low Stock Alert</h2>
      <button
        onClick={() => navigate('/inventory')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Inventory
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading alerts...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="productName"
                value={newAlert.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="currentStock"
                value={newAlert.currentStock}
                onChange={handleChange}
                placeholder="Current Stock"
                className="border p-2 rounded"
                min="0"
                required
              />
              <input
                type="number"
                name="threshold"
                value={newAlert.threshold}
                onChange={handleChange}
                placeholder="Threshold"
                className="border p-2 rounded"
                min="1"
                required
              />
              <select
                name="status"
                value={newAlert.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded mt-4">
              Add Alert
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Low Stock Alerts</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Current Stock</th>
                <th className="border px-4 py-2">Threshold</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(alerts) && alerts.length > 0 ? (
                alerts.map((alert) => (
                  <tr key={alert._id}>
                    <td className="border px-4 py-2">{alert.productName}</td>
                    <td className="border px-4 py-2">{alert.currentStock}</td>
                    <td className="border px-4 py-2">{alert.threshold}</td>
                    <td className="border px-4 py-2">{alert.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No alerts found.
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

export default LowStockAlert;