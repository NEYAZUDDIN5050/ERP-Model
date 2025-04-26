import React, { useState } from 'react';

const DealPipeline = () => {
  const [deals, setDeals] = useState([]);
  const [newDeal, setNewDeal] = useState({
    customerName: '',
    dealValue: '',
    status: 'Prospecting', // 'Prospecting', 'Negotiation', 'Closed Won', 'Closed Lost'
  });

  const handleDealSubmit = (e) => {
    e.preventDefault();
    const { customerName, dealValue, status } = newDeal;
    if (customerName && dealValue) {
      const deal = {
        id: deals.length + 1,
        customerName,
        dealValue: parseFloat(dealValue),
        status,
      };
      setDeals([...deals, deal]);
      setNewDeal({ customerName: '', dealValue: '', status: 'Prospecting' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Deal Pipeline</h2>
      <form onSubmit={handleDealSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newDeal.customerName}
            onChange={(e) => setNewDeal({ ...newDeal, customerName: e.target.value })}
            placeholder="Customer Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="number"
            value={newDeal.dealValue}
            onChange={(e) => setNewDeal({ ...newDeal, dealValue: e.target.value })}
            placeholder="Deal Value"
            className="border p-2 rounded"
            required
          />
          <select
            value={newDeal.status}
            onChange={(e) => setNewDeal({ ...newDeal, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Prospecting">Prospecting</option>
            <option value="Negotiation">Negotiation</option>
            <option value="Closed Won">Closed Won</option>
            <option value="Closed Lost">Closed Lost</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Add Deal
        </button>
      </form>

      {/* Deals Table */}
      <h3 className="text-lg font-bold mt-4">Deals</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Deal Value</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal.id}>
              <td className="border px-4 py-2">{deal.customerName}</td>
              <td className="border px-4 py-2">${deal.dealValue}</td>
              <td className="border px-4 py-2">{deal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DealPipeline;