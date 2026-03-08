import React, { useState } from 'react';

const ActivityTaskManagement = () => {
  const [activities, setActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    type: 'Follow-up', // Default type
    description: '',
    date: '',
    time: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setActivities([...activities, newActivity]);
    setNewActivity({ type: 'Follow-up', description: '', date: '', time: '' }); // Reset form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Activity and Task Management</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <select
          name="type"
          value={newActivity.type}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
        >
          <option value="Follow-up">Follow-up</option>
          <option value="Meeting">Meeting</option>
          <option value="Call">Call</option>
          <option value="Reminder">Reminder</option>
        </select>
        <input
          type="text"
          name="description"
          value={newActivity.description}
          onChange={handleChange}
          placeholder="Activity Description"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="date"
          name="date"
          value={newActivity.date}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="time"
          name="time"
          value={newActivity.time}
          onChange={handleChange}
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Activity
        </button>
      </form>

      {/* Activities Table */}
      <h3 className="text-lg font-bold mt-4">Scheduled Activities</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Type</th>
            <th className="border px-4 py-2">Description</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{activity.type}</td>
              <td className="border px-4 py-2">{activity.description}</td>
              <td className="border px-4 py-2">{activity.date}</td>
              <td className="border px-4 py-2">{activity.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ActivityTaskManagement;