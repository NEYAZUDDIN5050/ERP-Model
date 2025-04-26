import React, { useState } from 'react';

const LeaveRequests = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    status: 'Pending', // 'Pending', 'Approved', 'Rejected'
  });

  const handleLeaveRequestSubmit = (e) => {
    e.preventDefault();
    const { employeeName, leaveType, startDate, endDate } = newLeaveRequest;
    if (employeeName && leaveType && startDate && endDate) {
      const request = {
        id: leaveRequests.length + 1,
        employeeName,
        leaveType,
        startDate,
        endDate,
        status: 'Pending',
      };
      setLeaveRequests([...leaveRequests, request]);
      setNewLeaveRequest({ employeeName: '', leaveType: '', startDate: '', endDate: '', status: 'Pending' }); // Reset form
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Leave Requests</h2>
      <form onSubmit={handleLeaveRequestSubmit} className="mt-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            type="text"
            value={newLeaveRequest.employeeName}
            onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, employeeName: e.target.value })}
            placeholder="Employee Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="text"
            value={newLeaveRequest.leaveType}
            onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, leaveType: e.target.value })}
            placeholder="Leave Type"
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={newLeaveRequest.startDate}
            onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, startDate: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={newLeaveRequest.endDate}
            onChange={(e) => setNewLeaveRequest({ ...newLeaveRequest, endDate: e.target.value })}
            className="border p-2 rounded"
            required
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Submit Leave Request
        </button>
      </form>

      {/* Leave Requests Table */}
      <h3 className="text-lg font-bold mt-4">Leave Requests</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Leave Type</th>
            <th className="border px-4 py-2">Start Date</th>
            <th className="border px-4 py-2">End Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {leaveRequests.map((request) => (
            <tr key={request.id}>
              <td className="border px-4 py-2">{request.employeeName}</td>
              <td className="border px-4 py-2">{request.leaveType}</td>
              <td className="border px-4 py-2">{request.startDate}</td>
              <td className="border px-4 py-2">{request.endDate}</td>
              <td className="border px-4 py-2">{request.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeaveRequests;