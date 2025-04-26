// src/components/common/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-700 px-6 py-4 fixed w-full z-10">
      <div className="flex justify-between items-center">
        {/* Logo or Brand */}
        <div className="text-white text-2xl font-bold">MyApp</div>

        {/* Navigation Links */}
        <div className="flex space-x-8 ml-auto">
          <Link to="/home" className="text-white hover:underline">Home</Link>
          <Link to="/register" className="text-white hover:underline">Register</Link>
          <Link to="/login" className="text-white hover:underline">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
