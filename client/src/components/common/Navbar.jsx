import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <nav className="bg-gradient-to-b from-gray-700 to-gray-900 shadow-lg fixed top-0 left-0 right-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo/Brand */}
          <div className="text-2xl font-extrabold text-gray-800 bg-gradient-to-r from-cyan-500 to-blue-600 text-transparent bg-clip-text">
            Business ERP
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex space-x-4 ml-auto">
            {[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'About', path: '/about' },
              { label: 'Register', path: '/register' },
              { label: 'Login', path: '/login' },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => navigate(item.path)}
                className="relative px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-200 hover:shadow-md group"
              >
                {item.label}
                <span className="absolute inset-0 rounded-lg bg-cyan-600 opacity-0 group-hover:opacity-10 transition-opacity duration-200"></span>
              </button>
            ))}
          </div>


          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700 hover:text-cyan-500 focus:outline-none">
              {isOpen ? <FaTimes className="w-6 h-6" /> : <FaBars className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Links */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 px-4 py-4">
            {[
              { label: 'Dashboard', path: '/dashboard' },
              { label: 'About', path: '/about' },
              { label: 'Register', path: '/register' },
              { label: 'Login', path: '/login' },
            ].map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(item.path);
                  setIsOpen(false);
                }}
                className="block w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-cyan-500 hover:text-white rounded-lg transition-all duration-200 mb-2"
              >
                {item.label}
              </button>
            ))}
          </div>
        )};
      </div>
    </nav>
  );
};

export default Navbar;