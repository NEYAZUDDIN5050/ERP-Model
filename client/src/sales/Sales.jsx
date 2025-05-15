import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import InvoiceGeneration from './InvoiceGeneration';
import SalesOrder from './SalesOrder';
import SalesReporting from './SalesReporting';
import PricingDiscount from './PricingDiscount';


const Sales = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header and Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gray-400 rounded-2xl w-70 text-center text-gray-800">Sales Management</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Navigation Cards */}
      <nav className="bg-white p-4 rounded shadow mb-6">
        <div className="container mx-auto px-4 mb-20">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/sales/invoiceGeneration"
              className="bg-indigo-400 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Invoice Generation</h2>
              <p>Create and manage invoices for customers and orders.</p>
            </Link>
            <Link
              to="/sales/salesOrder"
              className="bg-indigo-400 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Sales Order</h2>
              <p>Track and fulfill customer orders efficiently.</p>
            </Link>
            <Link
              to="/sales/pricingDiscount" // Add link for Pricing and Discount
              className="bg-indigo-400 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Pricing and Discount</h2>
              <p>Manage pricing and discounts for your products.</p>
            </Link>
            <Link
              to="/sales/SalesReporting"
              className="bg-indigo-400 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Sales Reporting</h2>
              <p>Analyze and monitor sales trends and performance.</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Routes>
          <Route path="invoiceGeneration" element={<InvoiceGeneration />} />
          <Route path="salesOrder" element={<SalesOrder />} />
          <Route path="SalesReporting" element={<SalesReporting />} />
          <Route path="pricingDiscount" element={<PricingDiscount />} />
          <Route
            path=""
            element={
              <div className="text-center text-gray-600 text-xl">
                Welcome to the Sales Section. Please select an option from the menu above.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Sales;
