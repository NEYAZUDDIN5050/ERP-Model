import React, { useState } from 'react';

const PerformanceManagement = () => {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({
    employeeName: '',
    goalDescription: '',
    targetDate: '',
    status: 'Pending',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewGoal({ ...newGoal, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setGoals([...goals, newGoal]);
    setNewGoal({ employeeName: '', goalDescription: '', targetDate: '', status: 'Pending' }); // Reset form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Performance Management</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="employeeName"
          value={newGoal.employeeName}
          onChange={handleChange}
          placeholder="Employee Name"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="text"
          name="goalDescription"
          value={newGoal.goalDescription}
          onChange={handleChange}
          placeholder="Goal Description"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="date"
          name="targetDate"
          value={newGoal.targetDate}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <select
          name="status"
          value={newGoal.status}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Goal
        </button>
      </form>

      {/* Goals Table */}
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
          {goals.map((goal, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{goal.employeeName}</td>
              <td className="border px-4 py-2">{goal.goalDescription}</td>
              <td className="border px-4 py-2">{goal.targetDate}</td>
              <td className="border px-4 py-2">{goal.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PerformanceManagement;