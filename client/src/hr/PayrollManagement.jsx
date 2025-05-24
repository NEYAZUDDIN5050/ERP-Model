import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PayrollManagement = () => {
  const navigate = useNavigate();
  const [salaryStructures, setSalaryStructures] = useState([]);
  const [newSalary, setNewSalary] = useState({
    employeeName: '',
    baseSalary: '',
    bonus: '',
    deductions: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing salary structures from backend
  useEffect(() => {
    const fetchSalaryStructures = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/payrolls');
        console.log('API response (payrolls):', res.data);
        setSalaryStructures(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching payrolls:', err.response?.data || err.message);
        setError('Failed to load payroll records. Please check the backend server.');
        setSalaryStructures([]);
        setLoading(false);
      }
    };
    fetchSalaryStructures();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSalary({ ...newSalary, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeName, baseSalary } = newSalary;
    if (employeeName && baseSalary) {
      try {
        const res = await axios.post('/api/payrolls', {
          ...newSalary,
          baseSalary: parseFloat(newSalary.baseSalary) || 0,
          bonus: parseFloat(newSalary.bonus) || 0,
          deductions: parseFloat(newSalary.deductions) || 0,
        });
        setSalaryStructures([...salaryStructures, res.data]);
        setNewSalary({ employeeName: '', baseSalary: '', bonus: '', deductions: '' });
        setError('');
      } catch (err) {
        console.error('Error adding payroll:', err.response?.data || err.message);
        setError('Failed to add payroll record. Please check the input or backend server.');
      }
    } else {
      setError('Employee Name and Base Salary are required.');
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Payroll Management</h2>

      <button
        onClick={() => navigate('/hr')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to HR Dashboard
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading payroll records...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                name="employeeName"
                value={newSalary.employeeName}
                onChange={handleChange}
                placeholder="Employee Name"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                name="baseSalary"
                value={newSalary.baseSalary}
                onChange={handleChange}
                placeholder="Base Salary"
                className="border p-2 rounded"
                min="0"
                step="0.01"
                required
              />
              <input
                type="number"
                name="bonus"
                value={newSalary.bonus}
                onChange={handleChange}
                placeholder="Bonus"
                className="border p-2 rounded"
                min="0"
                step="0.01"
              />
              <input
                type="number"
                name="deductions"
                value={newSalary.deductions}
                onChange={handleChange}
                placeholder="Deductions"
                className="border p-2 rounded"
                min="0"
                step="0.01"
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Salary Structure
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Salary Structures</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Employee Name</th>
                <th className="border px-4 py-2">Base Salary</th>
                <th className="border px-4 py-2">Bonus</th>
                <th className="border px-4 py-2">Deductions</th>
                <th className="border px-4 py-2">Net Salary</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(salaryStructures) && salaryStructures.length > 0 ? (
                salaryStructures.map((salary) => (
                  <tr key={salary._id}>
                    <td className="border px-4 py-2">{salary.employeeName}</td>
                    <td className="border px-4 py-2">${salary.baseSalary.toFixed(2)}</td>
                    <td className="border px-4 py-2">${salary.bonus.toFixed(2)}</td>
                    <td className="border px-4 py-2">${salary.deductions.toFixed(2)}</td>
                    <td className="border px-4 py-2">
                      ${(salary.baseSalary + salary.bonus - salary.deductions).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No payroll records found.
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

export default PayrollManagement;