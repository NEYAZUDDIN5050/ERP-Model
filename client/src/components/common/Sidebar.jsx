// src/components/common/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMoneyBillWave, FaUsers, FaIndustry, FaTruck, FaClipboardList, FaShoppingCart, FaChartLine, FaWarehouse } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="bg-white  text-black w-64 h-full pt-13 fixed">
      <div className=" text-2xl font-bold"></div>
      <ul className="mt-6">
        <li>
          <Link to="/" className="flex m-2 items-center p-1 hover:bg-gray-700">
            <FaHome className="mr-2 " /> Home
          </Link>
        </li>
        <li>
          <Link to="/finance" className="flex m-2 items-center p-1 hover:bg-gray-700">
            <FaMoneyBillWave className="mr-2" /> Finance
          </Link>
        </li>
        <li>
          <Link to="/hr" className="flex m-2 items-center p-1 hover:bg-gray-700">
            <FaUsers className="mr-2" /> HR
          </Link>
        </li>
       {/*  <li>
          <Link to="/manufacturing" className="flex items-center p-1 hover:bg-gray-700">
            <FaIndustry className="mr-2" /> Manufacturing
          </Link>
        </li>
        */}
        <li>
          <Link to="/scm" className="flex m-2 items-center p-1 hover:bg-gray-700">
            <FaTruck className="mr-2" /> Supply Chain
          </Link>
        </li>
        <li>
          <Link to="/crm" className="flex m-2 items-center p-1 hover:bg-gray-700">
            <FaClipboardList className="mr-2" /> CRM
          </Link>
        </li>
       {/*<li>
          <Link to="/procurement" className="flex items-center p-1 hover:bg-gray-700">
            <FaShoppingCart className="mr-2" /> Procurement
          </Link>
        </li>
        */}
        <li>
          <Link to="/sales" className="flex m-2 items-center p-1 hover:bg-gray-700">
            <FaChartLine className="mr-2" /> Sales
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="flex m-2 items-center p-1 hover:bg-gray-700 ">
            <FaWarehouse className="mr-2  " /> Inventory
          </Link>
          <div className="p-2">
        <Link
          to="/logout"
          className="block bg-red-500 hover:bg-red-600 text-white text-center font-semibold py-1 px-1 rounded shadow"
        >
          Logout
        </Link>
      </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;