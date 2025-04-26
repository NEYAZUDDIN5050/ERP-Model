// src/components/common/Footer.jsx
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-4 fixed bottom-0 w-full">
      <p>&copy; {new Date().getFullYear()} Business ERP. All rights reserved.</p>
    </footer>
  );
};

export default Footer;