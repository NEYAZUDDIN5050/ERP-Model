import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaMoneyBillWave, FaUsers, FaTruck, FaClipboardList, FaChartLine, FaWarehouse } from 'react-icons/fa';
import { BsColumnsGap } from 'react-icons/bs';
import { IoHomeSharp } from 'react-icons/io5';
import { FiLogOut } from 'react-icons/fi';

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-gray-700 to-gray-900 text-white w-64 min-h-screen fixed top-0 left-0 flex flex-col shadow-lg">
      {/* Logo/Title */}
      <div className="p-4 text-2xl font-extrabold text-center bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">
        ERP Dashboard
      </div>

      {/* Navigation Links */}
      <ul className="flex-1 mt-4">
        {[
          { to: '/Home', label: 'Home', icon: IoHomeSharp },
          { to: '/About', label: 'About', icon: BsColumnsGap },
          { to: '/finance', label: 'Finance', icon: FaMoneyBillWave },
          { to: '/hr', label: 'HR', icon: FaUsers },
          { to: '/scm', label: 'Supply Chain', icon: FaTruck },
          { to: '/crm', label: 'CRM', icon: FaClipboardList },
          { to: '/sales', label: 'Sales', icon: FaChartLine },
          { to: '/inventory', label: 'Inventory', icon: FaWarehouse },
        ].map((item, index) => (
          <li key={index}>
            <Link
              to={item.to}
              className="flex items-center p-3 mx-2 rounded-lg hover:bg-gray-700 transition-all duration-200 hover:shadow-md hover:-translate-y-0.5"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>

      {/* Logout Button */}
      <div className="p-4">
        <button
          onClick={() => navigate('/Home')}
          className="flex items-center w-full p-3 mb-10 rounded-lg bg-red-600 hover:bg-red-700 text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <FiLogOut className="w-5 h-5 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;