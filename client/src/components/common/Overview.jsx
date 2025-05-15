import React from 'react';
import { Link } from 'react-router-dom';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Register required Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Overview = () => {
  // Sample data for the chart
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
        data: [65, 59, 80, 81, 56, 55, 40],
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className=" ">
      <img src="https://img.freepik.com/free-vector/flat-design-erp-illustration_23-2149380376.jpg?t=st=1746501782~exp=1746505382~hmac=d45cf4b2a7ffe2ed3ef822ce1c2a6314988819267fae0275b4760ac2f8802fda&w=1800" alt="img" className='mb-20' />

        {/* Features Section */}
        <div className="container mx-auto px-4 mb-20">
  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    <Link to="/crm" className="bg-gray-300 text-black p-6 rounded-lg shadow-lg hover:bg-blue-400 transition transform hover:scale-105">
      <h2 className="text-2xl font-semibold">CRM</h2>
      <p>Manage your inventory items efficiently and keep track of stock levels.</p>
    </Link>
    <Link to="/sales" className="bg-gray-300 text-black p-6 rounded-lg shadow-lg hover:bg-green-400 transition transform hover:scale-105">
      <h2 className="text-2xl font-semibold">Sales Management</h2>
      <p>Track and manage your sales transactions and customer orders.</p>
    </Link>
    <Link to="/finance" className="bg-gray-300 text-black p-6 rounded-lg shadow-lg hover:bg-yellow-400 transition transform hover:scale-105">
      <h2 className="text-2xl font-semibold">Finance Management</h2>
      <p>Manage your customer information and relationships effectively.</p>
    </Link>
    <Link to="/hr" className="bg-gray-300 text-black p-6 rounded-lg shadow-lg hover:bg-purple-400 transition transform hover:scale-105">
      <h2 className="text-2xl font-semibold">HR Management</h2>
      <p>Create and manage invoices for your sales and services.</p>
    </Link>
    <Link to="/inventory" className="bg-gray-300 text-black p-6 rounded-lg shadow-lg hover:bg-red-400 transition transform hover:scale-105">
      <h2 className="text-2xl font-semibold">Inventory Management</h2>
      <p>Manage your products and their details, including pricing and stock.</p>
    </Link>
    <Link to="/scm" className="bg-gray-300 text-black p-6 rounded-lg shadow-lg hover:bg-teal-400 transition transform hover:scale-105">
      <h2 className="text-2xl font-semibold">SCM</h2>
      <p>Process payroll for your employees and manage salary details.</p>
    </Link>
  </div>
</div>

      {/* Status Cards */}<div className='w-full  gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-10'>
        <div className="bg-white p-3 rounded shadow">
          <h2 className="text-xl font-bold">Total Revenue</h2>
          <p className="text-2xl">$100,000</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <h2 className="text-xl font-bold">Total Expenses</h2>
          <p className="text-2xl">$50,000</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <h2 className="text-xl font-bold">Net Profit</h2>
          <p className="text-2xl">$50,000</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <h2 className="text-xl font-bold">Total Users</h2>
          <p className="text-2xl">1,200</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <h2 className="text-xl font-bold">Active Projects</h2>
          <p className="text-2xl">15</p>
        </div>
        <div className="bg-white p-3 rounded shadow">
          <h2 className="text-xl font-bold">Pending Orders</h2>
          <p className="text-2xl">30</p>
        </div>
      </div>

      {/* Chart */}
      <div className=" h-full col-span-1  md:col-span-2 lg:col-span-3 bg-white p-4 rounded shadow ">
        <h2 className="text-xl font-bold mb-6">Sales Overview</h2>
        <div className="h-70 mb-5">
          <Bar data={data} options={options} />
        </div>
      </div>
    </div>
  );
};

export default Overview;
