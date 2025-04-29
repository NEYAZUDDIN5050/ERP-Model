import React, { useState } from 'react';

const DeliveryScheduling = () => {
  const [deliveries, setDeliveries] = useState([]);
  const [newDelivery, setNewDelivery] = useState({
    deliveryDate: '',
    itemName: '',
    quantity: '',
    destination: '',
  });

  const handleDeliverySubmit = (e) => {
    e.preventDefault();
    const { deliveryDate, itemName, quantity, destination } = newDelivery;
    if (deliveryDate && itemName && quantity && destination) {
      const delivery = {
        id: deliveries.length + 1,
        deliveryDate,
        itemName,
        quantity: parseInt(quantity),
        destination,
      };
      setDeliveries([...deliveries, delivery]);
      setNewDelivery({ deliveryDate: '', itemName: '', quantity: '', destination: '' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Delivery Scheduling</h2>
      <form onSubmit={handleDeliverySubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="date"
            value={newDelivery.deliveryDate}
            onChange={(e) => setNewDelivery({ ...newDelivery, deliveryDate: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newDelivery.itemName}
            onChange={(e) => setNewDelivery({ ...newDelivery, itemName: e.target.value })}
            placeholder="Item Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={newDelivery.quantity}
            onChange={(e) => setNewDelivery({ ...newDelivery, quantity: e.target.value })}
            placeholder="Quantity"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newDelivery.destination}
            onChange={(e) => setNewDelivery({ ...newDelivery, destination: e.target.value })}
            placeholder="Destination"
            className="border p-2 rounded"
            required
          />
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
            <th className="border px-4 py-2">Delivery Date</th>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Destination</th>
          </tr>
        </thead>
        <tbody>
          {deliveries.map((delivery) => (
            <tr key={delivery.id}>
              <td className="border px-4 py-2">{delivery.deliveryDate}</td>
              <td className="border px-4 py-2">{delivery.itemName}</td>
              <td className="border px-4 py-2">{delivery.quantity}</td>
              <td className="border px-4 py-2">{delivery.destination}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DeliveryScheduling;