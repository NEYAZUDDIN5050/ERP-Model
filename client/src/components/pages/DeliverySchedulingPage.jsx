import React, { useState } from 'react';

const DeliverySchedulingPage = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    orderId: '',
    deliveryDate: '',
    status: 'Scheduled', // 'Scheduled', 'In Transit', 'Delivered'
  });

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    const { orderId, deliveryDate, status } = newDelivery;
    if (orderId && deliveryDate) {
      const delivery = {
        id: deliveries.length + 1,
        orderId,
        deliveryDate,
        status,
      };
      setDeliveries([...deliveries, delivery]);
      setNewDelivery({ orderId: '', deliveryDate: '', status: 'Scheduled' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Delivery Scheduling</h2>
      <form onSubmit={handleDeliverySubmit} className="mt-4">
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
            onChange={(e) => setNewDelivery({ ...newDelivery, deliveryDate: e.target.value })}
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

      {/* Deliveries Table */}
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
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td className="border px-4 py-2">{delivery.orderId}</td>
              <td className="border px-4 py-2">{delivery.deliveryDate}</td>
              <td className="border px-4 py-2">{delivery.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliverySchedulingPage;