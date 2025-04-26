import React, { useState } from 'react';

const InvoiceGeneration = () => {
  const [invoice, setInvoice] = useState({
    clientName: '',
    items: [{ description: '', quantity: '', price: '' }],
  });

  const handleItemChange = (index, event) => {
    const newItems = [...invoice.items];
    newItems[index][event.target.name] = event.target.value;
    setInvoice({ ...invoice, items: newItems });
  };

  const addItem = () => {
    setInvoice({ ...invoice, items: [...invoice.items, { description: '', quantity: '', price: '' }] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to generate invoice
    console.log('Invoice generated:', invoice);
    setInvoice({ clientName: '', items: [{ description: '', quantity: '', price: '' }] }); // Reset form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Invoice Generation</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          value={invoice.clientName}
          onChange={(e) => setInvoice({ ...invoice, clientName: e.target.value })}
          placeholder="Client Name"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        {invoice.items.map((item, index) => (
          <div key={index} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <input
              type="text"
              name="description"
              value={item.description}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Item Description"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="quantity"
              value={item.quantity}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Quantity"
              className="border p-2 rounded"
              required
            />
            <input
              type="number"
              name="price"
              value={item.price}
              onChange={(e) => handleItemChange(index, e)}
              placeholder="Price"
              className="border p-2 rounded"
              required
            />
          </div>
        ))}
        <button type="button" onClick={addItem} className="bg-gray-300 text-black p-2 rounded mb-4">
          Add Item
        </button>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Generate Invoice
        </button>
      </form>
    </div>
  );
};

export default InvoiceGeneration;