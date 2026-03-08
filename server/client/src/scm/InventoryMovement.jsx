import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const InventoryMovement = () => {
  const navigate = useNavigate();
  const [movements, setMovements] = useState([]);
  const [newMovement, setNewMovement] = useState({
    itemName: '',
    quantity: '',
    fromLocation: '',
    toLocation: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing movements from backend
  useEffect(() => {
    const fetchMovements = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/inventory-movements');
        console.log('API response (inventory-movements):', res.data);
        setMovements(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching inventory movements:', err.response?.data || err.message);
        setError('Failed to load inventory movements. Please check the backend server.');
        setMovements([]);
        setLoading(false);
      }
    };
    fetchMovements();
  }, []);

  const handleMovementSubmit = async (e) => {
    e.preventDefault();
    const { itemName, quantity, fromLocation, toLocation } = newMovement;
    if (itemName && quantity && fromLocation && toLocation) {
      try {
        const parsedQuantity = parseInt(quantity);
        if (parsedQuantity <= 0) {
          setError('Quantity must be greater than 0.');
          return;
        }
        const res = await axios.post('/api/inventory-movements', {
          ...newMovement,
          quantity: parsedQuantity,
        });
        setMovements([...movements, res.data]);
        setNewMovement({ itemName: '', quantity: '', fromLocation: '', toLocation: '' });
        setError('');
      } catch (err) {
        console.error('Error adding inventory movement:', err.response?.data || err.message);
        setError('Failed to add inventory movement. Please check the input or backend server.');
      }
    } else {
      setError('Item Name, Quantity, From Location, and To Location are required.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <button
        onClick={() => navigate('/logistics')} // Assuming a logistics section
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
      >
        ← Back to Logistics
      </button>

      <h2 className="text-xl font-bold mb-2">Inventory Movement</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading inventory movements...</p>
      ) : (
        <>
          <form onSubmit={handleMovementSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newMovement.itemName}
                onChange={(e) => setNewMovement({ ...newMovement, itemName: e.target.value })}
                placeholder="Item Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                value={newMovement.quantity}
                onChange={(e) => setNewMovement({ ...newMovement, quantity: e.target.value })}
                placeholder="Quantity"
                className="border p-2 rounded"
                min="1"
                required
              />
              <input
                type="text"
                value={newMovement.fromLocation}
                onChange={(e) =>
                  setNewMovement({ ...newMovement, fromLocation: e.target.value })
                }
                placeholder="From Location"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={newMovement.toLocation}
                onChange={(e) =>
                  setNewMovement({ ...newMovement, toLocation: e.target.value })
                }
                placeholder="To Location"
                className="border p-2 rounded"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Move Inventory
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Inventory Movements</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Item Name</th>
                <th className="border px-4 py-2">Quantity</th>
                <th className="border px-4 py-2">From Location</th>
                <th className="border px-4 py-2">To Location</th>
                <th className="border px-4 py-2">Movement Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(movements) && movements.length > 0 ? (
                movements.map((movement) => (
                  <tr key={movement._id}>
                    <td className="border px-4 py-2">{movement.itemName}</td>
                    <td className="border px-4 py-2">{movement.quantity}</td>
                    <td className="border px-4 py-2">{movement.fromLocation}</td>
                    <td className="border px-4 py-2">{movement.toLocation}</td>
                    <td className="border px-4 py-2">
                      {movement.createdAt
                        ? new Date(movement.createdAt).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No inventory movements found.
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

export default InventoryMovement;