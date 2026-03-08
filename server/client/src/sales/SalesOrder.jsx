import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SalesOrder = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    orderNumber: '',
    customerName: '',
    items: '',
    status: 'Pending',
    orderDate: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/sales/orders');
        console.log('API response (orders):', res.data);
        setOrders(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching orders:', err.response?.data || err.message);
        setError('Failed to load orders. Please check the backend server.');
        setOrders([]);
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { orderNumber, customerName } = newOrder;
    if (orderNumber && customerName) {
      try {
        const res = await axios.post('/api/sales/orders', newOrder);
        setOrders([...orders, res.data]);
        setNewOrder({ orderNumber: '', customerName: '', items: '', status: 'Pending', orderDate: '' });
        setError('');
      } catch (err) {
        console.error('Error adding order:', err.response?.data || err.message);
        setError('Failed to add order. Please check the input or backend server.');
      }
    } else {
      setError('Order Number and Customer Name are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewOrder({ ...newOrder, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Sales Order</h2>
      <button
        onClick={() => navigate('/sales')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Sales
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading orders...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="orderNumber"
                value={newOrder.orderNumber}
                onChange={handleChange}
                placeholder="Order Number"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="customerName"
                value={newOrder.customerName}
                onChange={handleChange}
                placeholder="Customer Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="items"
                value={newOrder.items}
                onChange={handleChange}
                placeholder="Items (e.g., Product A, Product B)"
                className="border p-2 rounded"
              />
              <select
                name="status"
                value={newOrder.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="Processing">Processing</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
              </select>
              <input
                type="date"
                name="orderDate"
                value={newOrder.orderDate}
                onChange={handleChange}
                className="border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
              Add Order
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Sales Orders</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Order Number</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Items</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Order Date</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(orders) && orders.length > 0 ? (
                orders.map((order) => (
                  <tr key={order._id}>
                    <td className="border px-4 py-2">{order.orderNumber}</td>
                    <td className="border px-4 py-2">{order.customerName}</td>
                    <td className="border px-4 py-2">{order.items || '-'}</td>
                    <td className="border px-4 py-2">{order.status}</td>
                    <td className="border px-4 py-2">
                      {order.orderDate ? new Date(order.orderDate).toLocaleDateString() : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No orders found.
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

export default SalesOrder;