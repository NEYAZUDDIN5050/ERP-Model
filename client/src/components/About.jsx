import React from "react";
import Footer from "./common/Footer";
import Navbar from "./common/Navbar"

const About = () => {
    return(
      <div className="flex flex-col min-h-screen bg-gray-100">
        <Navbar />
        <main className="flex-1 p-6 ml- mt-10 mb-30">
        <div className="bg-white py-12 px-6 md:px-16 rounded-2xl shadow-lg max-w-5xl mx-auto mt-10">
  <h2 className="text-4xl font-extrabold text-gray-800 mb-6">About Our ERP Platform</h2>
  
  <p className="text-lg text-gray-600 mb-4">
    Our <span className="font-semibold text-blue-600">ERP Solution</span> is designed to modernize the way businesses operate. We bring together powerful tools to manage your <strong>inventory</strong>, <strong>sales</strong>, <strong>purchases</strong>, <strong>invoices</strong>, and <strong>customers</strong> — all within a secure and easy-to-use platform.
  </p>

  <p className="text-lg text-gray-600 mb-6">
    Built for startups and growing enterprises, our system helps reduce manual work, avoid errors, and get real-time insights so you can make smart decisions fast.
  </p>

  <h3 className="text-2xl font-semibold text-gray-800 mb-4">🚀 Key Features</h3>
  <ul className="list-disc list-inside text-gray-700 text-base space-y-2 mb-8">
    <li><strong>Real-time Inventory Management:</strong> Track your stock levels instantly and avoid overselling.</li>
    <li><strong>Smart Invoicing System:</strong> Generate GST-ready invoices with auto-calculations.</li>
    <li><strong>Customer & Vendor Management:</strong> Centralize all your contacts and transaction history.</li>
    <li><strong>Sales & Purchase Reports:</strong> Get visual insights to grow smarter.</li>
    <li><strong>Role-Based Access:</strong> Control who can see and do what in your organization.</li>
    <li><strong>Secure Login & Sessions:</strong> Built with modern security practices and token-based auth.</li>
    <li><strong>Mobile-Friendly Interface:</strong> Access your data anytime, anywhere.</li>
  </ul>

  <p className="text-md text-gray-600 mb-6">
    Our mission is to help you <strong>focus on your business</strong> while we handle the complexity behind the scenes. We’re not just software — we’re a partner in your growth journey.
  </p>

  <button className="mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-xl hover:bg-blue-700 transition-all duration-300">
    Get Started Today
  </button>
</div>

        </main>
        <Footer />
      </div>
    )
} ;
export default About;