import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import Finance from './finance/Finance';
import HR from './hr/HR';
import Sales from './sales/Sales';
import CRM from './crm/CRM';
import Inventory from './inventory/Inventory';
import SCM from './scm/SCM';
//import DeliverySchedulingPage from './scm/DeliveryScheduling';
//import InventoryMovementPage from './scm/InventoryMovement';
//import VendorManagementPage from './scm/VendorManagement';
import About from './components/About';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/finance/*" element={<Finance />} />
        <Route path="/hr/*" element={<HR />} />
        <Route path="/sales/*" element={<Sales />} />
        <Route path="/crm/*" element={<CRM />} />
        <Route path="/inventory/*" element={<Inventory />} />
        <Route path="/about" element={<About />} />

        {/* Nested SCM routes */}
        <Route path="/scm" element={<SCM />} />
        {/* Nested SCM routes 
          <Route path="/delivery-scheduling" element={<DeliveryScheduling />} />
          <Route path="/inventory-movement" element={<InventoryMovement />} />
          <Route path="/vendor-management" element={<VendorManagement />} />
        </Route>
        */}
      </Routes>
    </Router>
  );
};

export default App;

