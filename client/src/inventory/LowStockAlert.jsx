import React, { useState } from 'react';

const LowStockAlert = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Item A', quantity: 5, threshold: 10 },
    { id: 2, name: 'Item B', quantity: 2, threshold: 5 },
    { id: 3, name: 'Item C', quantity: 15, threshold: 20 },
  ]);

  const lowStockItems = items.filter(item => item.quantity < item.threshold);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Low Stock Alerts</h2>
      {lowStockItems.length > 0 ? (
        <ul className="mt-4">
          {lowStockItems.map(item => (
            <li key={item.id} className="text-red-600">
              {item.name} (Current: {item.quantity}, Threshold: {item.threshold})
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-green-600">All items are sufficiently stocked.</p>
      )}
    </div>
  );
};

export default LowStockAlert;