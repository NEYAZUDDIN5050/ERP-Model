import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-900 to-gray-700 text-white py-8 mt-auto w-285 ml-64">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Business ERP</h3>
            <p className="text-sm text-gray-300">
              Empowering businesses with seamless enterprise resource planning solutions.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', to: '/Home' },
                { label: 'About', to: '/About' },
                { label: 'Finance', to: '/finance' },
                { label: 'Support', to: '/support' },
              ].map((item, index) => (
                <li key={index}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-lg font-semibold text-cyan-400 mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              {[
                { icon: FaTwitter, href: 'https://twitter.com', label: 'Twitter' },
                { icon: FaLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
                { icon: FaGithub, href: 'https://github.com', label: 'GitHub' },
              ].map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  aria-label={item.label}
                  className="text-gray-300 hover:text-cyan-400 transition-colors duration-200"
                >
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-700 text-center">
          <p className="text-sm text-gray-300">
            © {new Date().getFullYear()} Business ERP. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;