import React, { useState } from 'react';

const SupportTicketing = () => {
  const [tickets, setTickets] = useState([]);
  const [newTicket, setNewTicket] = useState({
    customerName: '',
    issue: '',
    status: 'Open', // 'Open', 'In Progress', 'Resolved'
  });

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    const { customerName, issue, status } = newTicket;
    if (customerName && issue) {
      const ticket = {
        id: tickets.length + 1,
        customerName,
        issue,
        status,
      };
      setTickets([...tickets, ticket]);
      setNewTicket({ customerName: '', issue: '', status: 'Open' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Support Ticketing</h2>
      <form onSubmit={handleTicketSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newTicket.customerName}
            onChange={(e) => setNewTicket({ ...newTicket, customerName: e.target.value })}
            placeholder="Customer Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newTicket.issue}
            onChange={(e) => setNewTicket({ ...newTicket, issue: e.target.value })}
            placeholder="Issue"
            className="border p-2 rounded"
            required
          />
          <select
            value={newTicket.status}
            onChange={(e) => setNewTicket({ ...newTicket, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Open">Open</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Create Ticket
        </button>
      </form>

      {/* Tickets Table */}
      <h3 className="text-lg font-bold mt-4">Tickets</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Customer Name</th>
            <th className="border px-4 py-2">Issue</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket.id}>
              <td className="border px-4 py-2">{ticket.customerName}</td>
              <td className="border px-4 py-2">{ticket.issue}</td>
              <td className="border px-4 py-2">{ticket.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SupportTicketing;