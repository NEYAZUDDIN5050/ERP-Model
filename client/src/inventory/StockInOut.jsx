import React, { useState } from 'react';

const StockInOut = () => {
  const [records, setRecords] = useState([]);
  const [newRecord, setNewRecord] = useState({
    type: 'in', // 'in' for stock in, 'out' for stock out
    itemName: '',
    quantity: '',
    date: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewRecord({ ...newRecord, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setRecords([...records, newRecord]);
    setNewRecord({ type: 'in', itemName: '', quantity: '', date: '' }); // Reset form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Stock In/Out Management</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <select
          name="type"
          value={newRecord.type}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="in">Stock In</option>
          <option value="out">Stock Out</option>
        </select>
        <input
          type="text"
          name="itemName"
          value={newRecord.itemName}
          onChange={handleChange}
          placeholder="Item Name"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="number"
          name="quantity"
          value={newRecord.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="date"
          name="date"
          value={newRecord.date}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Record
        </button>
      </form>

      {/* Records Table */}
      <h3 className="text-lg font-bold mt-4">Stock Records</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Item Name</th>
            <th className="border px-4 py-2">Quantity</th>
            <th className="border px-4 py-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{record.type === 'in' ? 'Stock In' : 'Stock Out'}</td>
              <td className="border px-4 py-2">{record.itemName}</td>
              <td className="border px-4 py-2">{record.quantity}</td>
              <td className="border px-4 py-2">{record.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockInOut;