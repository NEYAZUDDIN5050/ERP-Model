import React from 'react';
import Sidebar from './common/Sidebar';
import Navbar from './common/Navbar';
import Footer from './common/Footer';
import Overview from './common/Overview';

const Dashboard = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-100 to-gray-200">
      {/* Navbar */}
      <Navbar />

      {/* Main Section: Sidebar + Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar />

        {/* Page Content */}
        <main className="flex-1 p-6 sm:p-8 ml-64 mt-16">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text mb-6">
              Dashboard Overview
            </h1>
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
              <Overview />
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
