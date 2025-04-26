import React, { useState } from 'react';

const CustomerProfiles = () => {
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleCustomerSubmit = (e) => {
    e.preventDefault();
    const { name, email, phone, address } = newCustomer;
    if (name && email && phone && address) {
      const customer = {
        id: customers.length + 1,
        name,
        email,
        phone,
        address,
      };
      setCustomers([...customers, customer]);
      setNewCustomer({ name: '', email: '', phone: '', address: '' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Customer Profiles</h2>
      <form onSubmit={handleCustomerSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newCustomer.name}
            onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
            placeholder="Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="email"
            value={newCustomer.email}
            onChange={(e) => setNewCustomer({ ...newCustomer, email: e.target.value })}
            placeholder="Email"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newCustomer.phone}
            onChange={(e) => setNewCustomer({ ...newCustomer, phone: e.target.value })}
            placeholder="Phone"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newCustomer.address}
            onChange={(e) => setNewCustomer({ ...newCustomer, address: e.target.value })}
            placeholder="Address"
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Add Customer
        </button>
      </form>

      {/* Customer Table */}
      <h3 className="text-lg font-bold mt-4">Customers</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">Phone</th>
            <th className="border px-4 py-2">Address</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td className="border px-4 py-2">{customer.name}</td>
              <td className="border px-4 py-2">{customer.email}</td>
              <td className="border px-4 py-2">{customer.phone}</td>
              <td className="border px-4 py-2">{customer.address}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerProfiles;