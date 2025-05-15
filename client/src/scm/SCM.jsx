import React from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import DeliveryScheduling from './DeliveryScheduling';
import InventoryMovement from './InventoryMovement';
import VendorManagement from './VendorManagement';
import SCMReporting from './SCMReporting'; // Import the new component

const SCM = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header with Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gray-400 rounded-2xl w-70 text-center text-gray-800">SCM Management</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Navigation Section */}
      <nav className="bg-white p-4 rounded shadow mb-6">
        <div className="container mx-auto px-4 mb-20">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/scm/delivery-scheduling"
              className="bg-blue-300 text-white p-6 rounded-lg shadow-lg hover:bg-blue-400 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Delivery Scheduling</h2>
              <p>Manage and schedule your product deliveries efficiently.</p>
            </Link>

            <Link
              to="/scm/inventory-movement"
              className="bg-blue-300 text-white p-6 rounded-lg shadow-lg hover:bg-blue-400 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Inventory Movement</h2>
              <p>Track inventory movement across warehouses and units.</p>
            </Link>

            <Link
              to="/scm/vendor-management"
              className="bg-blue-300 text-white p-6 rounded-lg shadow-lg hover:bg-blue-400 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Vendor Management</h2>
              <p>Manage vendor relationships and supplier performance.</p>
            </Link>

            <Link
              to="/scm/reporting" // Add link for Reporting and Analytics
              className="bg-blue-300 text-white p-6 rounded-lg shadow-lg hover:bg-blue-400 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">SCM Reporting & Analytics</h2>
              <p>View real-time dashboards for supply chain KPIs.</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* SCM Routes */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Routes>
          <Route path="delivery-scheduling" element={<DeliveryScheduling />} />
          <Route path="inventory-movement" element={<InventoryMovement />} />
          <Route path="vendor-management" element={<VendorManagement />} />
          <Route path="reporting" element={<SCMReporting />} /> {/* Add route for Reporting and Analytics */}
          <Route
            path=""
            element={
              <div className="text-center text-gray-600 text-xl">
                Welcome to the SCM Section. Please select an option from the menu above.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default SCM;
