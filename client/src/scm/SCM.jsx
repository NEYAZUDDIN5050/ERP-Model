import React from 'react';
import { Link, Outlet } from 'react-router-dom';

const SCM = () => {
  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <ul className="flex space-x-4">
          <li><Link className="text-white hover:underline" to="delivery-scheduling">Delivery Scheduling</Link></li>
          <li><Link className="text-white hover:underline" to="inventory-movement">Inventory Movement</Link></li>
          <li><Link className="text-white hover:underline" to="vendor-management">Vendor Management</Link></li>
        </ul>
      </nav>

      <div className="p-4">
        <Outlet /> {/* This renders the nested routes */}
      </div>
    </div>
  );
};

export default SCM;
