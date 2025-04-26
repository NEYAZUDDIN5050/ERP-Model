import React, { useState } from 'react';

const StockMonitoring = () => {
  const [stockItems, setStockItems] = useState([
    { id: 1, name: 'Item A', quantity: 50 },
    { id: 2, name: 'Item B', quantity: 20 },
    { id: 3, name: 'Item C', quantity: 5 },
  ]);

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: '',
  });

  const handleAddItem = (e) => {
    e.preventDefault();
    const { name, quantity } = newItem;
    if (name && quantity) {
      const item = {
        id: stockItems.length + 1,
        name,
        quantity: parseInt(quantity),
      };
      setStockItems([...stockItems, item]);
      setNewItem({ name: '', quantity: '' }); // Reset form
    }
  };

  const handleDeleteItem = (id) => {
    setStockItems(stockItems.filter(item => item.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Stock Monitoring</h2>
      <form onSubmit={handleAddItem} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newItem.name}
            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            placeholder="Item Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={newItem.quantity}
            onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
            placeholder="Quantity"
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Add Item
        </button>
      </form>

      {/* Stock Items Table */}
      <h3 className="text-lg font-bold mt-4">Current Stock</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stockItems.map((item) => (
            <tr key={item.id}>
              <td className="border px-4 py-2">{item.name}</td>
              <td className={`border px-4 py-2 ${item.quantity < 10 ? 'text-red-600' : ''}`}>
                {item.quantity}
              </td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Low Stock Alert */}
      <h3 className="text-lg font-bold mt-4">Low Stock Alerts</h3>
      {stockItems.filter(item => item.quantity < 10).length > 0 ? (
        <ul className="mt-2 text-red-600">
          {stockItems.filter(item => item.quantity < 10).map(item => (
            <li key={item.id}>{item.name} (Current: {item.quantity})</li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600">All items are sufficiently stocked.</p>
      )}
    </div>
  );
};

export default StockMonitoring;