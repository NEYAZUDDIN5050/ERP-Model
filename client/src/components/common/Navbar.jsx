// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-blue-100 px-6 py-4 fixed w-full z-10 text-black">
      <div className="flex justify-between items-center">
        {/* Logo or Brand */}
        <div className=" text-2xl font-bold text-black">MyApp</div>

        {/* Navigation Links */}
        <div className="flex space-x-8 ml-auto">
      <button 
        onClick={() => navigate('/dashboard')} 
        className="bg-gray-400 rounded-2xl w-25 hover:underline"
      >
        Dashboard
      </button>
      <button 
        onClick={() => navigate('/About')} 
        className="bg-gray-400 rounded-2xl w-20  hover:underline"
      >
        About
      </button>
      <button 
        onClick={() => navigate('/register')} 
        className="bg-gray-400 rounded-2xl w-20  hover:underline"
      >
        Register
      </button>
      <button 
        onClick={() => navigate('/login')} 
        className="bg-gray-400 rounded-2xl w-20 hover:underline"
      >
        Login
      </button>
    </div>
      </div>
    </nav>
  );
};

export default Navbar;
