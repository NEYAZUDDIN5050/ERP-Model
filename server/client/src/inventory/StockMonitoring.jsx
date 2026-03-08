import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StockMonitoring = () => {
  const navigate = useNavigate();
  const [stocks, setStocks] = useState([]);
  const [newStock, setNewStock] = useState({
    productName: '',
    warehouse: '',
    quantity: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStocks = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/inventory/stocks');
        console.log('API response (stocks):', res.data);
        setStocks(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching stocks:', err.response?.data || err.message);
        setError('Failed to load stocks. Please check the backend server.');
        setStocks([]);
        setLoading(false);
      }
    };
    fetchStocks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, warehouse, quantity } = newStock;
    if (productName && warehouse && quantity) {
      try {
        const res = await axios.post('/api/inventory/stocks', {
          ...newStock,
          quantity: parseInt(newStock.quantity) || 0,
        });
        setStocks([...stocks, res.data]);
        setNewStock({ productName: '', warehouse: '', quantity: '' });
        setError('');
      } catch (err) {
        console.error('Error adding stock:', err.response?.data || err.message);
        setError('Failed to add stock. Please check the input or backend server.');
      }
    } else {
      setError('Product Name, Warehouse, and Quantity are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewStock({ ...newStock, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Stock Monitoring</h2>
      <button
        onClick={() => navigate('/inventory')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Inventory
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading stocks...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="productName"
                value={newStock.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="warehouse"
                value={newStock.warehouse}
                onChange={handleChange}
                placeholder="Warehouse"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="quantity"
                value={newStock.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border p-2 rounded"
                min="0"
                required
              />
            </div>
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded mt-4">
              Add Stock
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Stock Levels</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Warehouse</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Last Updated</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(stocks) && stocks.length > 0 ? (
                stocks.map((stock) => (
                  <tr key={stock._id}>
                    <td className="border px-4 py-2">{stock.productName}</td>
                    <td className="border px-4 py-2">{stock.warehouse}</td>
                    <td className="border px-4 py-2">{stock.quantity}</td>
                    <td className="border px-4 py-2">
                      {new Date(stock.updatedAt).toLocaleString()}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No stocks found.
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

export default StockMonitoring;