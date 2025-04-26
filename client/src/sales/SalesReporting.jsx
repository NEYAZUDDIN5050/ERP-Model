import React from 'react';

const SalesReporting = ({ orders }) => {
  const totalSales = orders.reduce((total, order) => {
    return total + order.items.reduce((sum, item) => sum + item.quantity, 0);
  }, 0);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Sales Reporting</h2>
      <div className="mt-4">
        <h3 className="font-bold">Total Sales:</h3>
        <p className="text-2xl">{totalSales} items sold</p>
      </div>
    </div>
  );
};

export default SalesReporting;