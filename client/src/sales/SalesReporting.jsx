import React, { useState } from 'react';

const sampleOrders = [
  { id: 1, date: '2025-05-01', items: [{ name: 'Shoes', quantity: 3 }, { name: 'Hat', quantity: 1 }] },
  { id: 2, date: '2025-05-10', items: [{ name: 'Shirt', quantity: 5 }] },
  { id: 3, date: '2025-05-12', items: [{ name: 'Jeans', quantity: 2 }] },
];

const SalesReporting = ({ orders = sampleOrders }) => {
  const [sortByQty, setSortByQty] = useState(false);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  // Filter by date
  const filteredOrders = orders.filter(order => {
    const orderDate = new Date(order.date);
    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;
    return (!from || orderDate >= from) && (!to || orderDate <= to);
  });

  // Optionally sort by quantity
  const processedOrders = sortByQty
    ? [...filteredOrders].sort((a, b) =>
        b.items.reduce((sum, item) => sum + item.quantity, 0) -
        a.items.reduce((sum, item) => sum + item.quantity, 0)
      )
    : filteredOrders;

  const totalSales = processedOrders.reduce((total, order) =>
    total + order.items.reduce((sum, item) => sum + item.quantity, 0), 0);

  const totalOrders = processedOrders.length;
  const avgItems = totalOrders ? (totalSales / totalOrders).toFixed(2) : 0;

  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Sales Reporting</h2>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="border p-2 rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="border p-2 rounded"
        />
        <button
          onClick={() => setSortByQty(!sortByQty)}
          className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600"
        >
          {sortByQty ? "Unsort" : "Sort by Quantity"}
        </button>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mb-6">
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-600">Total Orders</p>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-600">Total Items Sold</p>
          <p className="text-2xl font-bold">{totalSales}</p>
        </div>
        <div className="bg-gray-100 p-4 rounded">
          <p className="text-sm text-gray-600">Avg. Items / Order</p>
          <p className="text-2xl font-bold">{avgItems}</p>
        </div>
      </div>

      {/* Sales Table */}
      <table className="w-full table-auto border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="border px-4 py-2 text-left">Order ID</th>
            <th className="border px-4 py-2 text-left">Date</th>
            <th className="border px-4 py-2 text-left">Items</th>
            <th className="border px-4 py-2 text-left">Total Qty</th>
          </tr>
        </thead>
        <tbody>
          {processedOrders.map(order => (
            <tr key={order.id}>
              <td className="border px-4 py-2">{order.id}</td>
              <td className="border px-4 py-2">{order.date}</td>
              <td className="border px-4 py-2">
                {order.items.map((item, idx) => (
                  <div key={idx}>
                    {item.name} (x{item.quantity})
                  </div>
                ))}
              </td>
              <td className="border px-4 py-2">
                {order.items.reduce((sum, item) => sum + item.quantity, 0)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {processedOrders.length === 0 && (
        <p className="text-gray-500 mt-4 text-center">No orders found in selected date range.</p>
      )}
    </div>
  );
};

export default SalesReporting;
     