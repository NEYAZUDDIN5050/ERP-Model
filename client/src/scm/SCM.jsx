import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import DeliverySchedulingPage from '../components/pages/DeliverySchedulingPage';
import InventoryMovementPage from '../components/pages/InventoryMovementPage';
import VendorManagementPage from '../components/pages/VendorManagementPage';

const SCM = () => {
  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-6">Supply Chain Management</h1>

      {/* Navigation Buttons */}
      <div className="space-x-4 mb-6">
        <Link to="delivery-scheduling">  {/* ✅ relative path */}
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Delivery Scheduling
          </button>
        </Link>
        <Link to="inventory-movement">
          <button className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
            Inventory Movement
          </button>
        </Link>
        <Link to="vendor-management">
          <button className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
            Vendor Management
          </button>
        </Link>
      </div>

      {/* Sub-Routes */}
      <Routes>
        <Route path="delivery-scheduling" element={<DeliverySchedulingPage />} />
        <Route path="inventory-movement" element={<InventoryMovementPage />} />
        <Route path="vendor-management" element={<VendorManagementPage />} />
      </Routes>
    </div>
  );
};

export default SCM;

