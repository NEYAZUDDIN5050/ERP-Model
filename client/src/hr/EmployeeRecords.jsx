import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmployeeRecords = () => {
  const navigate = useNavigate();
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({
    name: '',
    position: '',
    department: '',
    dateOfJoining: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch employees on component mount
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/employees');
        console.log('API response (employees):', res.data); // Debug log
        setEmployees(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching employees:', err.response?.data || err.message);
        setError('Failed to load employees. Please check the backend server.');
        setEmployees([]);
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  const handleEmployeeSubmit = async (e) => {
    e.preventDefault();
    const { name, position, department, dateOfJoining } = newEmployee;
    if (name && position && department && dateOfJoining) {
      try {
        const res = await axios.post('/api/employees', newEmployee);
        setEmployees([...employees, res.data]);
        setNewEmployee({ name: '', position: '', department: '', dateOfJoining: '' });
        setError('');
      } catch (err) {
        console.error('Error adding employee:', err.response?.data || err.message);
        setError('Failed to add employee. Please check the input or backend server.');
      }
    } else {
      setError('Please fill in all required fields.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Employee Records</h2>

      <button
        onClick={() => navigate('/hr')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4"
      >
        ← Back to HR Dashboard
      </button>

      {error && <p className="text-red-500 mb-4">{error}</p>}
      {loading ? (
        <p>Loading employees...</p>
      ) : (
        <>
          <form onSubmit={handleEmployeeSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newEmployee.name}
                onChange={(e) => setNewEmployee({ ...newEmployee, name: e.target.value })}
                placeholder="Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={newEmployee.position}
                onChange={(e) => setNewEmployee({ ...newEmployee, position: e.target.value })}
                placeholder="Position"
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                value={newEmployee.department}
                onChange={(e) => setNewEmployee({ ...newEmployee, department: e.target.value })}
                placeholder="Department"
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                value={newEmployee.dateOfJoining}
                onChange={(e) =>
                  setNewEmployee({ ...newEmployee, dateOfJoining: e.target.value })
                }
                className="border p-2 rounded"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Employee
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Employees</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Position</th>
                <th className="border px-4 py-2">Department</th>
                <th className="border px-4 py-2">Date of Joining</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(employees) && employees.length > 0 ? (
                employees.map((employee) => (
                  <tr key={employee._id}>
                    <td className="border px-4 py-2">{employee.name}</td>
                    <td className="border px-4 py-2">{employee.position}</td>
                    <td className="border px-4 py-2">{employee.department}</td>
                    <td className="border px-4 py-2">
                      {employee.dateOfJoining
                        ? new Date(employee.dateOfJoining).toLocaleDateString()
                        : 'Invalid Date'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No employees found.
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

export default EmployeeRecords;