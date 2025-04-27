import React from 'react';
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
      <img src="https://media.licdn.com/dms/image/v2/D4D12AQGGCkd_ryYgYw/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1657715061792?e=2147483647&v=beta&t=0cOTKbkFg67hWDuiOy_oEJMtW287UR5L3WlTH0gmf64" alt="img" className='mb-20' />
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
