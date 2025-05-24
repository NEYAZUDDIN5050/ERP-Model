import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CustomerProfiles = () => {
  const navigate = useNavigate();
  const [customers, setCustomers] = useState([]);
  const [newCustomer, setNewCustomer] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    notes: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/crm/customers');
        console.log('API response (customers):', res.data);
        setCustomers(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching customers:', err.response?.data || err.message);
        setError('Failed to load customers. Please check the backend server.');
        setCustomers([]);
        setLoading(false);
      }
    };
    fetchCustomers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email } = newCustomer;
    if (name && email) {
      try {
        const res = await axios.post('/api/crm/customers', newCustomer);
        setCustomers([...customers, res.data]);
        setNewCustomer({ name: '', email: '', phone: '', company: '', notes: '' });
        setError('');
      } catch (err) {
        console.error('Error adding customer:', err.response?.data || err.message);
        setError('Failed to add customer. Please check the input or backend server.');
      }
    } else {
      setError('Name and Email are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCustomer({ ...newCustomer, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Customer Profiles</h2>
      <button
        onClick={() => navigate('/crm')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to CRM
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading customers...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="name"
                value={newCustomer.name}
                onChange={handleChange}
                placeholder="Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="email"
                name="email"
                value={newCustomer.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="phone"
                value={newCustomer.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="company"
                value={newCustomer.company}
                onChange={handleChange}
                placeholder="Company"
                className="border p-2 rounded"
              />
              <input
                type="text"
                name="notes"
                value={newCustomer.notes}
                onChange={handleChange}
                placeholder="Notes"
                className="border p-2 rounded"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Customer
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Customers</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Email</th>
                <th className="border px-4 py-2">Phone</th>
                <th className="border px-4 py-2">Company</th>
                <th className="border px-4 py-2">Notes</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(customers) && customers.length > 0 ? (
                customers.map((customer) => (
                  <tr key={customer._id}>
                    <td className="border px-4 py-2">{customer.name}</td>
                    <td className="border px-4 py-2">{customer.email}</td>
                    <td className="border px-4 py-2">{customer.phone || '-'}</td>
                    <td className="border px-4 py-2">{customer.company || '-'}</td>
                    <td className="border px-4 py-2">{customer.notes || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No customers found.
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

export default CustomerProfiles;