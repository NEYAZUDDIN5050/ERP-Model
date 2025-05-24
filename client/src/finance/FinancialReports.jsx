import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FinancialReports = () => {
  const navigate = useNavigate();
  const [reports, setReports] = useState([]);
  const [newReport, setNewReport] = useState({
    period: '',
    revenue: '',
    expenses: '',
    profit: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch existing reports from backend
  useEffect(() => {
    const fetchReports = async () => {
      try {
        setLoading(true);
        const res = await axios.get('/api/reports');
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
    const { period, revenue, expenses } = newReport;
    if (period && revenue && expenses) {
      try {
        const profit = parseFloat(revenue) - parseFloat(expenses);
        const res = await axios.post('/api/reports', {
          ...newReport,
          revenue: parseFloat(revenue),
          expenses: parseFloat(expenses),
          profit,
        });
        setReports([...reports, res.data]);
        setNewReport({ period: '', revenue: '', expenses: '', profit: '' });
        setError('');
      } catch (err) {
        console.error('Error adding report:', err.response?.data || err.message);
        setError('Failed to add report. Please check the input or backend server.');
      }
    } else {
      setError('Period, Revenue, and Expenses are required.');
    }
  };

  // Prepare data for bar chart
  const chartData = {
    labels: reports.map((r) => r.period),
    datasets: [
      {
        label: 'Revenue ($)',
        data: reports.map((r) => r.revenue),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Expenses ($)',
        data: reports.map((r) => r.expenses),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
      {
        label: 'Profit ($)',
        data: reports.map((r) => r.profit),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Financial Performance by Period',
      },
    },
  };

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold mb-2">Financial Reports</h2>

      <button
        onClick={() => navigate('/finance')}
        className="bg-gray-500 text-white px-4 py-2 rounded mb-4 hover:bg-gray-600"
      >
        ← Back to Finance
      </button>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? (
        <p>Loading reports...</p>
      ) : (
        <>
          <form onSubmit={handleSubmit} className="mt-2">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <input
                type="text"
                value={newReport.period}
                onChange={(e) => setNewReport({ ...newReport, period: e.target.value })}
                placeholder="Period (e.g., Q1 2025)"
                className="border p-2 rounded"
                required
              />
              <input
                type="number"
                value={newReport.revenue}
                onChange={(e) => setNewReport({ ...newReport, revenue: e.target.value })}
                placeholder="Revenue"
                className="border p-2 rounded"
                min="0"
                step="0.01"
                required
              />
              <input
                type="number"
                value={newReport.expenses}
                onChange={(e) => setNewReport({ ...newReport, expenses: e.target.value })}
                placeholder="Expenses"
                className="border p-2 rounded"
                min="0"
                step="0.01"
                required
              />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mt-4">
              Add Report
            </button>
          </form>

          <h3 className="text-lg font-bold mt-4">Financial Reports</h3>
          <table className="min-w-full bg-white border border-gray-300 mt-2">
            <thead>
              <tr>
                <th className="border px-4 py-2">Period</th>
                <th className="border px-4 py-2">Revenue</th>
                <th className="border px-4 py-2">Expenses</th>
                <th className="border px-4 py-2">Profit</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reports) && reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report._id}>
                    <td className="border px-4 py-2">{report.period}</td>
                    <td className="border px-4 py-2">${report.revenue.toFixed(2)}</td>
                    <td className="border px-4 py-2">${report.expenses.toFixed(2)}</td>
                    <td className="border px-4 py-2">${report.profit.toFixed(2)}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="border px-4 py-2 text-center">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <h3 className="text-lg font-bold mt-6">Financial Performance Chart</h3>
          <div className="mt-4">
            <Bar data={chartData} options={chartOptions} />
          </div>
        </>
      )}
    </div>
  );
};

export default FinancialReports;