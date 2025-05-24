import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LeaveRequests = () => {
  const navigate = useNavigate();
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [newLeaveRequest, setNewLeaveRequest] = useState({
    employeeName: '',
    leaveType: '',
    startDate: '',
    endDate: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing leave requests from backend
  useEffect(() => {
    const fetchLeaveRequests = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/leaves');
        console.log('API response (leaves):', res.data); // Debug log
        setLeaveRequests(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching leave requests:', err.response?.data || err.message);
        setError('Failed to load leave requests. Please check the backend server.');
        setLeaveRequests([]);
        setLoading(false);
      }
    };
    fetchLeaveRequests();
  }, []);

  const handleLeaveRequestSubmit = async (e) => {
    e.preventDefault();
    const { employeeName, leaveType, startDate, endDate } = newLeaveRequest;
    if (employeeName && leaveType && startDate && endDate) {
      try {
        const res = await axios.post('/api/leaves', newLeaveRequest);
        setLeaveRequests([...leaveRequests, res.data]);
        setNewLeaveRequest({
          employeeName: '',
          leaveType: '',
          startDate: '',
          endDate: '',
          status: 'Pending',
        });
        setError('');
      } catch (err) {
        console.error('Error submitting leave request:', err.response?.data || err.message);
        setError('Failed to submit leave request. Please check the input or backend server.');
      }
    } else {
      setError('Please fill in all required fields.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Leave Requests</h2>

      {/* Navigation Buttons */}
      <div className="flex gap-4 mb-4">
        <button
          onClick={() => navigate('/hr')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Back to HR
        </button>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
        >
          ← Back to Dashboard
        </button>
      </div>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading leave requests...</p>
      ) : (
        <>
          <form onSubmit={handleLeaveRequestSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newLeaveRequest.employeeName}
                onChange={(e) =>
                  setNewLeaveRequest({ ...newLeaveRequest, employeeName: e.target.value })
                }
                placeholder="Employee Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={newLeaveRequest.leaveType}
                onChange={(e) =>
                  setNewLeaveRequest({ ...newLeaveRequest, leaveType: e.target.value })
                }
                placeholder="Leave Type (e.g., Sick, Vacation)"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                value={newLeaveRequest.startDate}
                onChange={(e) =>
                  setNewLeaveRequest({ ...newLeaveRequest, startDate: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                value={newLeaveRequest.endDate}
                onChange={(e) =>
                  setNewLeaveRequest({ ...newLeaveRequest, endDate: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Submit Leave Request
            </button>
          </form>

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
              {Array.isArray(leaveRequests) && leaveRequests.length > 0 ? (
                leaveRequests.map((request) => (
                  <tr key={request._id}>
                    <td className="border px-4 py-2">{request.employeeName}</td>
                    <td className="border px-4 py-2">{request.leaveType}</td>
                    <td className="border px-4 py-2">
                      {request.startDate
                        ? new Date(request.startDate).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="border px-4 py-2">
                      {request.endDate
                        ? new Date(request.endDate).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="border px-4 py-2">{request.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No leave requests found.
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

export default LeaveRequests;