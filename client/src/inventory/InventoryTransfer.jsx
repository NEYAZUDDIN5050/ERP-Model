import React, { useState } from 'react';

const InventoryTransfer = () => {
  const [transfers, setTransfers] = useState([]);
  const [newTransfer, setNewTransfer] = useState({
    itemName: '',
    quantity: '',
    fromLocation: '',
    toLocation: '',
  });

  const handleTransferSubmit = (e) => {
    e.preventDefault();
    const { itemName, quantity, fromLocation, toLocation } = newTransfer;
    if (itemName && quantity && fromLocation && toLocation) {
      const transfer = {
        id: transfers.length + 1,
        itemName,
        quantity: parseInt(quantity),
        fromLocation,
        toLocation,
      };
      setTransfers([...transfers, transfer]);
      setNewTransfer({ itemName: '', quantity: '', fromLocation: '', toLocation: '' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Inventory Transfer</h2>
      <form onSubmit={handleTransferSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newTransfer.itemName}
            onChange={(e) => setNewTransfer({ ...newTransfer, itemName: e.target.value })}
            placeholder="Item Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={newTransfer.quantity}
            onChange={(e) => setNewTransfer({ ...newTransfer, quantity: e.target.value })}
            placeholder="Quantity"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newTransfer.fromLocation}
            onChange={(e) => setNewTransfer({ ...newTransfer, fromLocation: e.target.value })}
            placeholder="From Location"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newTransfer.toLocation}
            onChange={(e) => setNewTransfer({ ...newTransfer, toLocation: e.target.value })}
            placeholder="To Location"
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Transfer Stock
        </button>
      </form>

      {/* Transfers Table */}
      <h3 className="text-lg font-bold mt-4">Transfers</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">From Location</th>
            <th className="border px-4 py-2">To Location</th>
          </tr>
        </thead>
        <tbody>
          {transfers.map((transfer) => (
            <tr key={transfer.id}>
              <td className="border px-4 py-2">{transfer.itemName}</td>
              <td className="border px-4 py-2">{transfer.quantity}</td>
              <td className="border px-4 py-2">{transfer.fromLocation}</td>
              <td className="border px-4 py-2">{transfer.toLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTransfer;