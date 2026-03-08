import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SalesReporting = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    startDate: '',
    endDate: '',
    customerName: '',
    status: 'All',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/sales/reports');
        console.log('API response (reports):', res.data);
        setReports(Array.isArray(res.data) ? res.data : []);
        setError('');
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reports:', err.response?.data || err.message);
        setError('Failed to load reports. Please check the backend server.');
        setReports([]);
        setLoading(false);
      }
    };
    fetchReports();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { startDate, endDate } = newReport;
    if (startDate && endDate) {
      try {
        const res = await axios.post('/api/sales/reports', newReport);
        setReports([...reports, res.data]);
        setNewReport({ startDate: '', endDate: '', customerName: '', status: 'All' });
        setError('');
      } catch (err) {
        console.error('Error generating report:', err.response?.data || err.message);
        setError('Failed to generate report. Please check the input or backend server.');
      }
    } else {
      setError('Start Date and End Date are required.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewReport({ ...newReport, [name]: value });
  };

  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-bold mb-2">Sales Reporting</h2>
      <button
        onClick={() => navigate('/sales')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Sales
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input
                type="date"
                name="startDate"
                value={newReport.startDate}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="date"
                name="endDate"
                value={newReport.endDate}
                onChange={handleChange}
                className="border p-2 rounded"
                required
              />
              <input
                type="text"
                name="customerName"
                value={newReport.customerName}
                onChange={handleChange}
                placeholder="Customer Name (optional)"
                className="border p-2 rounded"
              />
              <select
                name="status"
                value={newReport.status}
                onChange={handleChange}
                className="border p-2 rounded"
              >
                <option value="All">All</option>
                <option value="Pending">Pending</option>
                <option value="Paid">Paid</option>
                <option value="Overdue">Overdue</option>
              </select>
            </div>
            <button type="submit" className="bg-green-500 text-white p-2 rounded mt-4">
              Generate Report
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Sales Reports</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Start Date</th>
                <th className="border px-4 py-2">End Date</th>
                <th className="border px-4 py-2">Customer</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Total Sales</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reports) && reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report._id}>
                    <td className="border px-4 py-2">
                      {new Date(report.startDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(report.endDate).toLocaleDateString()}
                    </td>
                    <td className="border px-4 py-2">{report.customerName || '-'}</td>
                    <td className="border px-4 py-2">{report.status}</td>
                    <td className="border px-4 py-2">${report.totalSales.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="border px-4 py-2 text-center">
                    No reports found.
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

export default SalesReporting;