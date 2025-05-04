import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AttendanceTracking = () => {
  const navigate = useNavigate();

  const [attendanceRecords, setAttendanceRecords] = useState([]);
  const [newAttendance, setNewAttendance] = useState({
    employeeName: '',
    date: '',
    status: 'Present',
  });

  const handleAttendanceSubmit = (e) => {
    e.preventDefault();
    const { employeeName, date, status } = newAttendance;
    if (employeeName && date) {
      const record = {
        id: attendanceRecords.length + 1,
        employeeName,
        date,
        status,
      };
      setAttendanceRecords([...attendanceRecords, record]);
      setNewAttendance({ employeeName: '', date: '', status: 'Present' });
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Attendance Tracking</h2>
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/hr')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        ← Back to HR Dashboard
      </button>

      <form onSubmit={handleAttendanceSubmit} className="mt-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            value={newAttendance.employeeName}
            onChange={(e) => setNewAttendance({ ...newAttendance, employeeName: e.target.value })}
            placeholder="Employee Name"
            className="border p-2 rounded"
            required
          />
          <input
            type="date"
            value={newAttendance.date}
            onChange={(e) => setNewAttendance({ ...newAttendance, date: e.target.value })}
            className="border p-2 rounded"
            required
          />
          <select
            value={newAttendance.status}
            onChange={(e) => setNewAttendance({ ...newAttendance, status: e.target.value })}
            className="border p-2 rounded"
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
          Add Attendance
        </button>
      </form>

      <h3 className="text-lg font-bold mt-4">Attendance Records</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Date</th>
            <th className="border px-4 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record) => (
            <tr key={record.id}>
              <td className="border px-4 py-2">{record.employeeName}</td>
              <td className="border px-4 py-2">{record.date}</td>
              <td className="border px-4 py-2">{record.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTracking;
