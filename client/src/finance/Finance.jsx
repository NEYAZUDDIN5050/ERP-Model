import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import FinancialReports from './FinancialReports';
import IncomeExpenseTracker from './IncomeExpenseTracker';
import InvoiceTracking from './InvoiceTracking';

const Finance = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Finance Overview</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="bg-white p-4 rounded shadow mb-6">
        <ul className="flex gap-8 text-lg text-indigo-600 font-medium">
          <li>
            <Link to="/finance/financial-reports" className="hover:underline">
              Financial Reports
            </Link>
          </li>
          <li>
            <Link to="/finance/income-expense-tracker" className="hover:underline">
              Income/Expense Tracker
            </Link>
          </li>
          <li>
            <Link to="/finance/invoice-tracking" className="hover:underline">
              Invoice Tracking
            </Link>
          </li>
        </ul>
      </nav>

      {/* Routes */}
      <div className="bg-white p-6 rounded shadow">
        <Routes>
          <Route path="financial-reports" element={<FinancialReports />} />
          <Route path="income-expense-tracker" element={<IncomeExpenseTracker />} />
          <Route path="invoice-tracking" element={<InvoiceTracking />} />
          <Route
            path=""
            element={<div className="text-center text-gray-500">👋 Welcome to the Finance Section</div>}
          />
        </Routes>
      </div>
    </div>
  );
};

export default Finance;
