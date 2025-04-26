import React, { useState } from 'react';

const SalesOrder = () => {
  const [orders, setOrders] = useState([]);
  const [newOrder, setNewOrder] = useState({
    clientName: '',
    orderDate: '',
    items: [{ description: '', quantity: '' }],
  });

  const handleOrderChange = (index, event) => {
    const newItems = [...newOrder.items];
    newItems[index][event.target.name] = event.target.value;
    setNewOrder({ ...newOrder, items: newItems });
  };

  const addOrderItem = () => {
    setNewOrder({ ...newOrder, items: [...newOrder.items, { description: '', quantity: '' }] });
  };

  const handleOrderSubmit = (e) => {
    e.preventDefault();
    setOrders([...orders, newOrder]);
    setNewOrder({ clientName: '', orderDate: '', items: [{ description: '', quantity: '' }] }); // Reset form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Sales Order Management</h2>
      <form onSubmit={handleOrderSubmit} className="mt-4">
        <input
          type="text"
          value={newOrder.clientName}
          onChange={(e) => setNewOrder({ ...newOrder, clientName: e.target.value })}
          placeholder="Client Name"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="date"
          value={newOrder.orderDate}
          onChange={(e) => setNewOrder({ ...newOrder, orderDate: e.target.value })}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        {newOrder.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleOrderChange(index, e)}
              placeholder="Item Description"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleOrderChange(index, e)}
              placeholder="Quantity"
              className="border p-2 rounded"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addOrderItem} className="bg-gray-300 text-black p-2 rounded mb-4">
          Add Item
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Create Order
        </button>
      </form>

      {/* Orders Table */}
      <h3 className="text-lg font-bold mt-4">Orders</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Client Name</th>
            <th className="border px-4 py-2">Order Date</th>
            <th className="border px-4 py-2">Items</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{order.clientName}</td>
              <td className="border px-4 py-2">{order.orderDate}</td>
              <td className="border px-4 py-2">
                {order.items.map((item, idx) => (
                  <div key={idx}>{item.description} (Qty: {item.quantity})</div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesOrder;