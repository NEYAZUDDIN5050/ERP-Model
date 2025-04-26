
// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Login from './auth/Login';
import Register from './auth/Register';
import Finance from './finance/Finance';
import HR from './hr/HR';
import Sales from './sales/Sales';
import CRM from './crm/CRM'
import Inventory from './inventory/Inventory';


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/finance" element={<Finance />} />
        <Route path="/hr" element={<HR />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/crm" element={<CRM />} />
        <Route path="/inventory" element={<Inventory />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;