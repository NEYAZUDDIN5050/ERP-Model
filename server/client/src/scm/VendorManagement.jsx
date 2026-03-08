import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VendorManagement = () => {
  const navigate = useNavigate();
  const [vendors, setVendors] = useState([]);
  const [newVendor, setNewVendor] = useState({
    name: '',
    contact: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing vendors from backend
  useEffect(() => {
    const fetchVendors = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/vendors');
        console.log('API response (vendors):', res.data);
        setVendors(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching vendors:', err.response?.data || err.message);
        setError('Failed to load vendors. Please check the backend server.');
        setVendors([]);
        setLoading(false);
      }
    };
    fetchVendors();
  }, []);

  const handleVendorSubmit = async (e) => {
    e.preventDefault();
    const { name, contact, address } = newVendor;
    if (name && contact && address) {
      try {
        // Basic contact validation (email or phone)
        const contactRegex = /^(\S+@\S+\.\S+|\+?\d{10,})$/;
        if (!contactRegex.test(contact)) {
          setError('Contact must be a valid email or phone number (e.g., +1234567890).');
          return;
        }
        const res = await axios.post('/api/vendors', newVendor);
        setVendors([...vendors, res.data]);
        setNewVendor({ name: '', contact: '', address: '' });
        setError('');
      } catch (err) {
        console.error('Error adding vendor:', err.response?.data || err.message);
        setError('Failed to add vendor. Please check the input or backend server.');
      }
    } else {
      setError('Vendor Name, Contact Info, and Address are required.');
    }
  };

  const handleDeleteVendor = async (id) => {
    try {
      await axios.delete(`/api/vendors/${id}`);
      setVendors(vendors.filter((vendor) => vendor._id !== id));
      setError('');
    } catch (err) {
      console.error('Error deleting vendor:', err.response?.data || err.message);
      setError('Failed to delete vendor. Please try again.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <button
        onClick={() => navigate('/logistics')} // Assuming a logistics section
        className="mb-4 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded"
      >
        ← Back to Logistics
      </button>

      <h2 className="text-xl font-bold mb-2">Vendor Management</h2>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading vendors...</p>
      ) : (
        <>
          <form onSubmit={handleVendorSubmit} className="mt-2">
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
                placeholder="Contact (Email or Phone)"
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

          <h3 className="text-lg font-bold mt-4">Vendors</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Vendor Name</th>
                <th className="border px-4 py-2">Contact Info</th>
                <th className="border px-4 py-2">Address</th>
                <th className="border px-4 py-2">Created At</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(vendors) && vendors.length > 0 ? (
                vendors.map((vendor) => (
                  <tr key={vendor._id}>
                    <td className="border px-4 py-2">{vendor.name}</td>
                    <td className="border px-4 py-2">{vendor.contact}</td>
                    <td className="border px-4 py-2">{vendor.address}</td>
                    <td className="border px-4 py-2">
                      {vendor.createdAt
                        ? new Date(vendor.createdAt).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => handleDeleteVendor(vendor._id)}
                        className="bg-red-500 text-white p-1 rounded hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No vendors found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default VendorManagement;