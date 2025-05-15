import React, { useState } from 'react';

const PayrollManagement = () => {
  const [salaryStructure, setSalaryStructure] = useState([]);
  const [newSalary, setNewSalary] = useState({
    employeeName: '',
    baseSalary: '',
    bonus: '',
    deductions: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setNewSalary({ ...newSalary, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSalaryStructure([...salaryStructure, newSalary]);
    setNewSalary({ employeeName: '', baseSalary: '', bonus: '', deductions: '' }); // Reset form
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Payroll Management</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <input
          type="text"
          name="employeeName"
          value={newSalary.employeeName}
          onChange={handleChange}
          placeholder="Employee Name"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="number"
          name="baseSalary"
          value={newSalary.baseSalary}
          onChange={handleChange}
          placeholder="Base Salary"
          className="border p-2 rounded mb-4 w-full"
          required
        />
        <input
          type="number"
          name="bonus"
          value={newSalary.bonus}
          onChange={handleChange}
          placeholder="Bonus"
          className="border p-2 rounded mb-4 w-full"
        />
        <input
          type="number"
          name="deductions"
          value={newSalary.deductions}
          onChange={handleChange}
          placeholder="Deductions"
          className="border p-2 rounded mb-4 w-full"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Add Salary Structure
        </button>
      </form>

      {/* Salary Structure Table */}
      <h3 className="text-lg font-bold mt-4">Salary Structures</h3>
      <table className="min-w-full bg-white border border-gray-300 mt-2">
        <thead>
          <tr>
            <th className="border px-4 py-2">Employee Name</th>
            <th className="border px-4 py-2">Base Salary</th>
            <th className="border px-4 py-2">Bonus</th>
            <th className="border px-4 py-2">Deductions</th>
          </tr>
        </thead>
        <tbody>
          {salaryStructure.map((salary, index) => (
            <tr key={index}>
              <td className="border px-4 py-2">{salary.employeeName}</td>
              <td className="border px-4 py-2">${salary.baseSalary}</td>
              <td className="border px-4 py-2">${salary.bonus}</td>
              <td className="border px-4 py-2">${salary.deductions}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollManagement;