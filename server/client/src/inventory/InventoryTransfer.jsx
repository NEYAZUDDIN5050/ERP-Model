import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InventoryTransfer = () => {
  const navigate = useNavigate();
  const [transfers, setTransfers] = useState([]);
  const [newTransfer, setNewTransfer] = useState({
    productName: '',
    quantity: '',
    fromWarehouse: '',
    toWarehouse: '',
    transferDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTransfers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/inventory/transfers');
        console.log('API response (transfers):', res.data);
        setTransfers(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching transfers:', err.response?.data || err.message);
        setError('Failed to load transfers. Please check the backend server.');
        setTransfers([]);
        setLoading(false);
      }
    };
    fetchTransfers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, quantity, fromWarehouse, toWarehouse } = newTransfer;
    if (productName && quantity && fromWarehouse && toWarehouse) {
      try {
        const res = await axios.post('/api/inventory/transfers', {
          ...newTransfer,
          quantity: parseInt(newTransfer.quantity) || 0,
        });
        setTransfers([...transfers, res.data]);
        setNewTransfer({ productName: '', quantity: '', fromWarehouse: '', toWarehouse: '', transferDate: '' });
        setError('');
      } catch (err) {
        console.error('Error adding transfer:', err.response?.data || err.message);
        setError('Failed to add transfer. Please check the input or backend server.');
      }
    } else {
      setError('Product Name, Quantity, From Warehouse, and To Warehouse are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTransfer({ ...newTransfer, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Inventory Transfer</h2>
      <button
        onClick={() => navigate('/inventory')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Inventory
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading transfers...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="productName"
                value={newTransfer.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="quantity"
                value={newTransfer.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border p-2 rounded"
                min="1"
                required
              />
              <input
                type="text"
                name="fromWarehouse"
                value={newTransfer.fromWarehouse}
                onChange={handleChange}
                placeholder="From Warehouse"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="toWarehouse"
                value={newTransfer.toWarehouse}
                onChange={handleChange}
                placeholder="To Warehouse"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="transferDate"
                value={newTransfer.transferDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded mt-4">
              Add Transfer
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Transfers</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">From Warehouse</th>
                <th className="border px-4 py-2">To Warehouse</th>
                <th className="border px-4 py-2">Transfer Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(transfers) && transfers.length > 0 ? (
                transfers.map((transfer) => (
                  <tr key={transfer._id}>
                    <td className="border px-4 py-2">{transfer.productName}</td>
                    <td className="border px-4 py-2">{transfer.quantity}</td>
                    <td className="border px-4 py-2">{transfer.fromWarehouse}</td>
                    <td className="border px-4 py-2">{transfer.toWarehouse}</td>
                    <td className="border px-4 py-2">
                      {transfer.transferDate ? new Date(transfer.transferDate).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No transfers found.
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

export default InventoryTransfer;