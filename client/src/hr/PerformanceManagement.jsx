import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PerformanceManagement = () => {
  const navigate = useNavigate();
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    employeeName: '',
    goalDescription: '',
    targetDate: '',
    status: 'Pending',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing goals from backend
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/performances');
        console.log('API response (performances):', res.data);
        setGoals(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching performances:', err.response?.data || err.message);
        setError('Failed to load performance goals. Please check the backend server.');
        setGoals([]);
        setLoading(false);
      }
    };
    fetchGoals();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeName, goalDescription, targetDate } = newGoal;
    if (employeeName && goalDescription && targetDate) {
      try {
        const res = await axios.post('/api/performances', newGoal);
        setGoals([...goals, res.data]);
        setNewGoal({ employeeName: '', goalDescription: '', targetDate: '', status: 'Pending' });
        setError('');
      } catch (err) {
        console.error('Error adding goal:', err.response?.data || err.message);
        setError('Failed to add performance goal. Please check the input or backend server.');
      }
    } else {
      setError('Employee Name, Goal Description, and Target Date are required.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Performance Management</h2>

      <button
        onClick={() => navigate('/hr')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to HR Dashboard
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading performance goals...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="employeeName"
                value={newGoal.employeeName}
                onChange={handleChange}
                placeholder="Employee Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="goalDescription"
                value={newGoal.goalDescription}
                onChange={handleChange}
                placeholder="Goal Description"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="targetDate"
                value={newGoal.targetDate}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <select
                name="status"
                value={newGoal.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="Pending">Pending</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Goal
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Performance Goals</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Employee Name</th>
                <th className="border px-4 py-2">Goal Description</th>
                <th className="border px-4 py-2">Target Date</th>
                <th className="border px-4 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(goals) && goals.length > 0 ? (
                goals.map((goal) => (
                  <tr key={goal._id}>
                    <td className="border px-4 py-2">{goal.employeeName}</td>
                    <td className="border px-4 py-2">{goal.goalDescription}</td>
                    <td className="border px-4 py-2">
                      {goal.targetDate
                        ? new Date(goal.targetDate).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                    <td className="border px-4 py-2">{goal.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No performance goals found.
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

export default PerformanceManagement;