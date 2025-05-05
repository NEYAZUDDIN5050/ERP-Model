// src/LandingPage.jsx
import React from 'react';
import { Link } from  "react-router-dom"
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';

const Home = () => {
  return (
    <div>
      {/* Navbar */}
      <header className="flex justify-between items-center p-5 text-black  bg-blue-100">
        <div className="text-2xl font-bold">ERP-MODEL</div>
        <nav>
        <ul className="flex space-x-5">
  <li>
    <button onClick={() => document.getElementById('hero').scrollIntoView({ behavior: 'smooth' })} className=" rounded-2xl w-20 bg-gray-400 hover:underline">
      Home
    </button>
  </li>
  <li>
    <button onClick={() => document.getElementById('profile').scrollIntoView({ behavior: 'smooth' })} className=" rounded-2xl w-20 bg-gray-400 hover:underline">
      Profile
    </button>
  </li>
  <li>
    <button onClick={() => document.getElementById('work').scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl w-20 bg-gray-400 hover:underline">
      Work
    </button>
  </li>
  <li>
    <button onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })} className="rounded-2xl w-20 bg-gray-400 hover:underline">
      Contact
    </button>
  </li>
</ul>

        </nav>
      </header>

      <section id="hero" className="flex flex-col items-center justify-center  h-screen bg-cover bg-center" style={{ backgroundImage: "url('https://static.vecteezy.com/system/resources/previews/012/696/903/original/erp-isometric-background-vector.jpg')" }}>
        <h1 className="text-5xl font-bold text-black">Welcome to MyApp</h1>
        <p className="mt-4 text-lg text-black">Your solution for managing tasks efficiently.</p>
        <a href="/register" className="mt-6 bg-pink-600 text-white py-2 px-4 rounded hover:bg-pink-700 transition">Get Started</a>
      </section>

      {/* Hero Section */}
      <div className="w-full  bg-gray-50 text-gray-800">
      
      {/* Section 1 */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text Left */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Simplify Business with BizERP</h2>
          <p className="text-lg mb-4">
            Manage all your business operations seamlessly with a powerful ERP solution.
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Unified dashboard for all modules</li>
            <li>Real-time inventory and sales tracking</li>
            <li>Automated billing and invoicing</li>
            <li>Secure user roles and permissions</li>
          </ul>
        </div>
        {/* Image Right */}
        <div>
          <img src="https://img.freepik.com/premium-vector/erp-business-management-flat-isometric-3d-illustration_18660-5980.jpg?ga=GA1.1.2090728591.1744713562&semt=ais_hybrid&w=740" alt="ERP Dashboard" className="rounded-xl shadow-lg w-full" />
        </div>
      </section>

      {/* Section 2 */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Image Left */}
        <div>
          <img src="https://img.freepik.com/free-vector/hand-drawn-erp-illustration_23-2149388659.jpg?ga=GA1.1.2090728591.1744713562&semt=ais_hybrid&w=740" alt="ERP Features" className="rounded-xl shadow-lg w-full" />
        </div>
        {/* Text Right */}
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Key Benefits of Using BizERP</h2>
          <p className="text-lg mb-4">
            Scale faster and make smarter decisions with powerful ERP capabilities:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-sm">
            <li>Customizable modules for various industries</li>
            <li>Cloud-based access from anywhere</li>
            <li>Advanced analytics and reporting</li>
            <li>Streamlined communication between departments</li>
          </ul>
        </div>
      </section>

    </div>

      {/* Profile Section */}
      <section id="profile" className="py-20 bg-blue-700 text-center">
        <h2 className="text-3xl font-bold">Profile</h2>
        <div className="mt-10">
          <img src="https://img.freepik.com/premium-vector/sap-business-cloud-software-icon-vector_116137-5008.jpg?ga=GA1.1.2090728591.1744713562&semt=ais_hybrid&w=740" alt="Profile" className="w-32 h-32 rounded-full mx-auto" />
          <p className="mt-4 text-lg">Hello! I'm a passionate developer with experience in building web applications.</p>
        </div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-white text-center">
        <div className="container mx-auto px-4 mb-20">
         <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           <Link to="" className="bg-blue-500 text-white p-6 rounded-lg shadow-lg hover:bg-blue-600 transition transform hover:scale-105">
             <h2 className="text-2xl font-semibold">CRM</h2>
             <p>Manage your inventory items efficiently and keep track of stock levels.</p>
           </Link>
           <Link to="" className="bg-green-500 text-white p-6 rounded-lg shadow-lg hover:bg-green-600 transition transform hover:scale-105">
             <h2 className="text-2xl font-semibold">Sales Management</h2>
             <p>Track and manage your sales transactions and customer orders.</p>
           </Link>
           <Link to="" className="bg-yellow-500 text-white p-6 rounded-lg shadow-lg hover:bg-yellow-600 transition transform hover:scale-105">
             <h2 className="text-2xl font-semibold">Finance Management</h2>
             <p>Manage your customer information and relationships effectively.</p>
           </Link>
           <Link to="" className="bg-purple-500 text-white p-6 rounded-lg shadow-lg hover:bg-purple-600 transition transform hover:scale-105">
             <h2 className="text-2xl font-semibold">HR Management</h2>
             <p>Create and manage invoices for your sales and services.</p>
           </Link>
           <Link to="" className="bg-red-500 text-white p-6 rounded-lg shadow-lg hover:bg-red-600 transition transform hover:scale-105">
             <h2 className="text-2xl font-semibold">Inventory Management</h2>
             <p>Manage your products and their details, including pricing and stock.</p>
           </Link>
           <Link to="" className="bg-teal-500 text-white p-6 rounded-lg shadow-lg hover:bg-teal-600 transition transform hover:scale-105">
             <h2 className="text-2xl font-semibold">SCM</h2>
             <p>Process payroll for your employees and manage salary details.</p>
           </Link>
         </div>
       </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-5 bg-gray-800 text-white">
          {/* First Layer */}
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* About */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">About BizERP</h4>
          <p className="text-sm">
            BizERP is a powerful and user-friendly ERP solution for managing inventory, sales, finance, and operations all in one place.
          </p>
        </div>

        {/* Modules */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Modules</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/inventory" className="hover:text-white">Inventory</a></li>
            <li><a href="/sales" className="hover:text-white">Sales</a></li>
            <li><a href="/finance" className="hover:text-white">Finance</a></li>
            <li><a href="/reports" className="hover:text-white">Reports</a></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="/help" className="hover:text-white">Help Center</a></li>
            <li><a href="/docs" className="hover:text-white">Documentation</a></li>
            <li><a href="/contact" className="hover:text-white">Contact Support</a></li>
            <li><a href="/faqs" className="hover:text-white">FAQs</a></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="text-white text-lg font-semibold mb-3">Contact Us</h4>
          <ul className="space-y-2 text-sm">
            <li>Email: <a href="mailto:support@bizerp.com" className="hover:text-white">support@bizerp.com</a></li>
            <li>Phone: +91-9876543210</li>
            <li>Location: Patna, Bihar, India</li>
          </ul>
        </div>
      </div>

      {/* Second Layer */}
      <div className="border-t border-gray-700 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm">
        <p>© {new Date().getFullYear()} BizERP. All rights reserved.</p>
        <div className="flex space-x-4 mt-3 md:mt-0">
          <a href="/terms" className="hover:text-white">Terms</a>
          <a href="/privacy" className="hover:text-white">Privacy</a>
          <a href="/security" className="hover:text-white">Security</a>
        </div>
        <div className="flex space-x-3 mt-3 md:mt-0">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><Facebook size={18} /></a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><Twitter size={18} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><Linkedin size={18} /></a>
          <a href="mailto:support@bizerp.com"><Mail size={18} /></a>
        </div>
      </div>
      </footer>
    </div>
  );
};

export default Home;
