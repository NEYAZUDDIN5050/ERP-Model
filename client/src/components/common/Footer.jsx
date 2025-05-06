// src/components/common/Footer.jsxn
import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white text-center p-1 fixed bottom-0 w-190 ml-54">
      <p>&copy; {new Date().getFullYear()} Business ERP. All rights reserved.</p>
    </footer>
  );
};

export default Footer;