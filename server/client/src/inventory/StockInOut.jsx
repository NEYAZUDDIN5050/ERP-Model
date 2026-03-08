import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const StockInOut = () => {
  const navigate = useNavigate();
  const [movements, setMovements] = useState([]);
  const [newMovement, setNewMovement] = useState({
    productName: '',
    type: 'In',
    quantity: '',
    warehouse: '',
    movementDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchMovements = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/inventory/movements');
        console.log('API response (movements):', res.data);
        setMovements(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movements:', err.response?.data || err.message);
        setError('Failed to load movements. Please check the backend server.');
        setMovements([]);
        setLoading(false);
      }
    };
    fetchMovements();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { productName, type, quantity, warehouse } = newMovement;
    if (productName && type && quantity && warehouse) {
      try {
        const res = await axios.post('/api/inventory/movements', {
          ...newMovement,
          quantity: parseInt(newMovement.quantity) || 0,
        });
        setMovements([...movements, res.data]);
        setNewMovement({ productName: '', type: 'In', quantity: '', warehouse: '', movementDate: '' });
        setError('');
      } catch (err) {
        console.error('Error adding movement:', err.response?.data || err.message);
        setError('Failed to add movement. Please check the input or backend server.');
      }
    } else {
      setError('Product Name, Type, Quantity, and Warehouse are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewMovement({ ...newMovement, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Stock In/Out</h2>
      <button
        onClick={() => navigate('/inventory')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Inventory
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading movements...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="productName"
                value={newMovement.productName}
                onChange={handleChange}
                placeholder="Product Name"
                className="border p-2 rounded"
                required
              />
              <select
                name="type"
                value={newMovement.type}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              >
                <option value="In">In</option>
                <option value="Out">Out</option>
              </select>
              <input
                type="number"
                name="quantity"
                value={newMovement.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                className="border p-2 rounded"
                min="1"
                required
              />
              <input
                type="text"
                name="warehouse"
                value={newMovement.warehouse}
                onChange={handleChange}
                placeholder="Warehouse"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="movementDate"
                value={newMovement.movementDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-indigo-500 text-white p-2 rounded mt-4">
              Add Movement
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Stock Movements</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Product</th>
                <th className="border px-4 py-2">Type</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">Warehouse</th>
                <th className="border px-4 py-2">Movement Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(movements) && movements.length > 0 ? (
                movements.map((movement) => (
                  <tr key={movement._id}>
                    <td className="border px-4 py-2">{movement.productName}</td>
                    <td className="border px-4 py-2">{movement.type}</td>
                    <td className="border px-4 py-2">{movement.quantity}</td>
                    <td className="border px-4 py-2">{movement.warehouse}</td>
                    <td className="border px-4 py-2">
                      {movement.movementDate ? new Date(movement.movementDate).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No movements found.
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

export default StockInOut;