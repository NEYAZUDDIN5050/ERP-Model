import React, { useState } from 'react';

const VendorManagement = () => {
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({
    name: '',
    contact: '',
    address: '',
  });

  const handleVendorSubmit = (e) => {
    e.preventDefault();
    const { name, contact, address } = newVendor;
    if (name && contact && address) {
      const vendor = {
        id: vendors.length + 1,
        name,
        contact,
        address,
      };
      setVendors([...vendors, vendor]);
      setNewVendor({ name: '', contact: '', address: '' }); // Reset form
    }
  };

  const handleDeleteVendor = (id) => {
    setVendors(vendors.filter(vendor => vendor.id !== id));
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Vendor Management</h2>
      <form onSubmit={handleVendorSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newVendor.name}
            onChange={(e) => setNewVendor({ ...newVendor, name: e.target.value })}
            placeholder="Vendor Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newVendor.contact}
            onChange={(e) => setNewVendor({ ...newVendor, contact: e.target.value })}
            placeholder="Contact Info"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newVendor.address}
            onChange={(e) => setNewVendor({ ...newVendor, address: e.target.value })}
            placeholder="Address"
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Add Vendor
        </button>
      </form>

      {/* Vendors Table */}
      <h3 className="text-lg font-bold mt-4">Vendors</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Vendor Name</th>
            <th className="border px-4 py-2">Contact Info</th>
            <th className="border px-4 py-2">Address</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vendors.map((vendor) => (
            <tr key={vendor.id}>
              <td className="border px-4 py-2">{vendor.name}</td>
              <td className="border px-4 py-2">{vendor.contact}</td>
              <td className="border px-4 py-2">{vendor.address}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleDeleteVendor(vendor.id)}
                  className="bg-red-500 text-white p-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VendorManagement;