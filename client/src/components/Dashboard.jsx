// src/components/dashboard/Dashboard.jsx
import React from 'react';
import Sidebar from './common/Sidebar';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Overview from './common/Overview';


const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Section: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-6 ml-64 mt-10 mb-30">
          <h1 className="text-3xl font-bold mb-4">Dashboard Overview</h1>
          <Overview />
          {/* Add your components here */}
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;

