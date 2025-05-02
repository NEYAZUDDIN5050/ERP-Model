import React, { useState } from 'react';

const InventoryMovementPage = () => {
  const [movements, setMovements] = useState([]);
  const [newMovement, setNewMovement] = useState({
    itemName: '',
    quantity: '',
    fromLocation: '',
    toLocation: '',
  });

  const handleMovementSubmit = (e) => {
    e.preventDefault();
    const { itemName, quantity, fromLocation, toLocation } = newMovement;
    if (itemName && quantity && fromLocation && toLocation) {
      const movement = {
        id: movements.length + 1,
        itemName,
        quantity: parseInt(quantity),
        fromLocation,
        toLocation,
      };
      setMovements([...movements, movement]);
      setNewMovement({ itemName: '', quantity: '', fromLocation: '', toLocation: '' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Inventory Movement</h2>
      <form onSubmit={handleMovementSubmit} className="mt-4">
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
            required
          />
          <input
            type="text"
            value={newMovement.fromLocation}
            onChange={(e) => setNewMovement({ ...newMovement, fromLocation: e.target.value })}
            placeholder="From Location"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newMovement.toLocation}
            onChange={(e) => setNewMovement({ ...newMovement, toLocation: e.target.value })}
            placeholder="To Location"
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Move Inventory
        </button>
      </form>

      {/* Movements Table */}
      <h3 className="text-lg font-bold mt-4">Inventory Movements</h3>
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
          {movements.map((movement) => (
            <tr key={movement.id}>
              <td className="border px-4 py-2">{movement.itemName}</td>
              <td className="border px-4 py-2">{movement.quantity}</td>
              <td className="border px-4 py-2">{movement.fromLocation}</td>
              <td className="border px-4 py-2">{movement.toLocation}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryMovementPage;