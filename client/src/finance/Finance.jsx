import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import FinancialReports from './FinancialReports';
import IncomeExpenseTracker from './IncomeExpenseTracker';
import InvoiceTracking from './InvoiceTracking';

const Finance = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gray-400 rounded-2xl w-70 text-center text-gray-800">Finance Overview</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="bg-white p-4 rounded shadow mb-6">
      <div className="container mx-auto px-4 mb-20">
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           
             <Link to="/finance/financial-reports" className="bg-blue-400 text-white p-6 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
                  <h2 className="text-2xl font-semibold">Financial Report</h2>
                  <p>Manage your inventory items efficiently and keep track of stock levels.</p>
                </Link>
                <Link to="/finance/income-expense-tracker" className="bg-blue-400 text-white p-6 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
                  <h2 className="text-2xl font-semibold">Income & Expense Tracker</h2>
                  <p>Track and manage your sales transactions and customer orders.</p>
                </Link>
                <Link to="/finance/invoice-tracking" className="bg-blue-400 text-white p-6 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
                  <h2 className="text-2xl font-semibold">Invoice Tracking </h2>
                  <p>Manage your customer information and relationships effectively.</p>
                </Link>
         </div>
         </div>
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
