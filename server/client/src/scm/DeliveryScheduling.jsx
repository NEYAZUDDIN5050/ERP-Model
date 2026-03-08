import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeliveryScheduling = () => {
  const navigate = useNavigate();
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    orderId: '',
    deliveryDate: '',
    status: 'Scheduled',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing deliveries from backend
  useEffect(() => {
    const fetchDeliveries = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/deliveries');
        console.log('API response (deliveries):', res.data);
        setDeliveries(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching deliveries:', err.response?.data || err.message);
        setError('Failed to load deliveries. Please check the backend server.');
        setDeliveries([]);
        setLoading(false);
      }
    };
    fetchDeliveries();
  }, []);

  const handleDeliverySubmit = async (e) => {
    e.preventDefault();
    const { orderId, deliveryDate } = newDelivery;
    if (orderId && deliveryDate) {
      try {
        const res = await axios.post('/api/deliveries', newDelivery);
        setDeliveries([...deliveries, res.data]);
        setNewDelivery({ orderId: '', deliveryDate: '', status: 'Scheduled' });
        setError('');
      } catch (err) {
        console.error('Error adding delivery:', err.response?.data || err.message);
        setError('Failed to add delivery. Please check the input or backend server.');
      }
    } else {
      setError('Order ID and Delivery Date are required.');
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

      <h2 className="text-xl font-bold mb-2">Delivery Scheduling</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading deliveries...</p>
      ) : (
        <>
          <form onSubmit={handleDeliverySubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                value={newDelivery.orderId}
                onChange={(e) => setNewDelivery({ ...newDelivery, orderId: e.target.value })}
                placeholder="Order ID"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                value={newDelivery.deliveryDate}
                onChange={(e) =>
                  setNewDelivery({ ...newDelivery, deliveryDate: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <select
                value={newDelivery.status}
                onChange={(e) => setNewDelivery({ ...newDelivery, status: e.target.value })}
                className="border p-2 rounded"
              >
                <option value="Scheduled">Scheduled</option>
                <option value="In Transit">In Transit</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Schedule Delivery
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Scheduled Deliveries</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Order ID</th>
                <th className="border px-4 py-2">Delivery Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(deliveries) && deliveries.length > 0 ? (
                deliveries.map((delivery) => (
                  <tr key={delivery._id}>
                    <td className="border px-4 py-2">{delivery.orderId}</td>
                    <td className="border px-4 py-2">
                      {delivery.deliveryDate
                        ? new Date(delivery.deliveryDate).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="border px-4 py-2">{delivery.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="border px-4 py-2 text-center">
                    No deliveries found.
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

export default DeliveryScheduling;
