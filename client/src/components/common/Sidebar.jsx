// src/components/common/Sidebar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaMoneyBillWave, FaUsers, FaIndustry, FaTruck, FaClipboardList, FaShoppingCart, FaChartLine, FaWarehouse } from 'react-icons/fa';
import { BsColumnsGap } from "react-icons/bs";
import { IoHomeSharp } from "react-icons/io5";


const Sidebar = () => {
  return (
    <div className="bg-gray-200  text-black w-54 h-full pt-17 fixed">
      <div className=" text-2xl font-bold"></div>
      <ul className="mt-6 font-bold">
      <li>
          <Link to="/Home" className="flex m-2 items-center p-3 font-size pt-5 hover:bg-gray-400">
            <IoHomeSharp className="mr-2 " /> Home 
          </Link>
        </li>
        <li>
          <Link to="/About" className="flex m-2 items-center p-3 pt-5 hover:bg-gray-400">
            <BsColumnsGap className="mr-2 " /> About 
          </Link>
        </li>
        <li>
          <Link to="/finance" className="flex m-2 items-center p-3 pt-5 hover:bg-gray-400">
            <FaMoneyBillWave className="mr-2" /> Finance
          </Link>
        </li>
        <li>
          <Link to="/hr" className="flex m-2 items-center p-3 pt-5 hover:bg-gray-400">
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
          <Link to="/scm" className="flex m-2 items-center p-3 pt-5 hover:bg-gray-400">
            <FaTruck className="mr-2" /> Supply Chain
          </Link>
        </li>
        <li>
          <Link to="/crm" className="flex m-2 items-center p-3 pt-5 hover:bg-gray-400">
            <FaClipboardList className="mr-2" /> CRM
          </Link>
        </li>
       {/*<li>
          <Link to="/procurement" className="flex items-center p-1 pt-5 hover:bg-gray-700">
            <FaShoppingCart className="mr-2" /> Procurement
          </Link>
        </li>
        */}
        <li>
          <Link to="/sales" className="flex m-2 items-center p-3 pt-5 hover:bg-gray-400">
            <FaChartLine className="mr-2" /> Sales
          </Link>
        </li>
        <li>
          <Link to="/inventory" className="flex m-2 items-center p-3 pt-5 hover:bg-gray-400 ">
            <FaWarehouse className="mr-2  " /> Inventory
          </Link>
          <div className="p-5">
        <Link
          to="/Home"
          className="block bg-red-500 hover:bg-red-600 text-white text-center font-semibold py-1 px-1 mt- rounded shadow"
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