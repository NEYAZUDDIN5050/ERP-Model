import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SupportTicketing = () => {
  const navigate = useNavigate();
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    customerName: '',
    issue: '',
    priority: 'Low',
    status: 'Open',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/crm/tickets');
        console.log('API response (tickets):', res.data);
        setTickets(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching tickets:', err.response?.data || err.message);
        setError('Failed to load tickets. Please check the backend server.');
        setTickets([]);
        setLoading(false);
      }
    };
    fetchTickets();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { customerName, issue } = newTicket;
    if (customerName && issue) {
      try {
        const res = await axios.post('/api/crm/tickets', newTicket);
        setTickets([...tickets, res.data]);
        setNewTicket({ customerName: '', issue: '', priority: 'Low', status: 'Open' });
        setError('');
      } catch (err) {
        console.error('Error adding ticket:', err.response?.data || err.message);
        setError('Failed to add ticket. Please check the input or backend server.');
      }
    } else {
      setError('Customer Name and Issue are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTicket({ ...newTicket, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Support Ticketing</h2>
      <button
        onClick={() => navigate('/crm')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to CRM
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading tickets...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="text"
                name="customerName"
                value={newTicket.customerName}
                onChange={handleChange}
                placeholder="Customer Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="issue"
                value={newTicket.issue}
                onChange={handleChange}
                placeholder="Issue Description"
                className="border p-2 rounded"
                required
              />
              <select
                name="priority"
                value={newTicket.priority}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
              <select
                name="status"
                value={newTicket.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Closed">Closed</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Ticket
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Tickets</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Issue</th>
                <th className="border px-4 py-2">Priority</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(tickets) && tickets.length > 0 ? (
                tickets.map((ticket) => (
                  <tr key={ticket._id}>
                    <td className="border px-4 py-2">{ticket.customerName}</td>
                    <td className="border px-4 py-2">{ticket.issue}</td>
                    <td className="border px-4 py-2">{ticket.priority}</td>
                    <td className="border px-4 py-2">{ticket.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No tickets found.
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

export default SupportTicketing;