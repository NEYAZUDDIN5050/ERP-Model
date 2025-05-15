import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import InvoiceGeneration from './InvoiceGeneration';
import SalesOrder from './SalesOrder';
import SalesReporting from './SalesReporting';
import PricingDiscount from './PricingDiscount';

const Sales = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4 sm:p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text mb-4 sm:mb-0">
          Sales Management
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="group relative inline-flex items-center px-5 py-2.5 rounded-full bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <span className="mr-2">←</span> Back to Dashboard
          <span className="absolute inset-0 rounded-full bg-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      </header>

      {/* Navigation Section */}
      <nav className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                to: '/sales/invoiceGeneration',
                title: 'Invoice Generation',
                desc: 'Create and manage customer invoices.',
                icon: '🧾',
              },
              {
                to: '/sales/salesOrder',
                title: 'Sales Order',
                desc: 'Track and fulfill customer orders.',
                icon: '📑',
              },
              {
                to: '/sales/pricingDiscount',
                title: 'Pricing & Discount',
                desc: 'Manage product pricing and discounts.',
                icon: '💲',
              },
              {
                to: '/sales/salesReporting',
                title: 'Sales Reporting',
                desc: 'Analyze sales trends and performance.',
                icon: '📊',
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="group relative bg-white p-5 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-green-50 to-teal-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                <div className="relative flex items-start space-x-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-green-600">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <main className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <Routes>
          <Route path="invoiceGeneration" element={<InvoiceGeneration />} />
          <Route path="salesOrder" element={<SalesOrder />} />
          <Route path="pricingDiscount" element={<PricingDiscount />} />
          <Route path="salesReporting" element={<SalesReporting />} />
          <Route
            path=""
            element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Welcome to Sales Management
                </h2>
                <p className="text-gray-500">
                  Select an option from the menu above to get started.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Sales;