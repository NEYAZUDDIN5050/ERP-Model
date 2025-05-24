import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Facebook, Twitter, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Home = () => {
  const location = useLocation();

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.2 } },
  };

  const cardHover = {
    hover: { scale: 1.05, boxShadow: '0 10px 20px rgba(0,0,0,0.2)', transition: { duration: 0.3 } },
  };

  const iconPulse = {
    hover: { scale: 1.2, rotate: 10, transition: { duration: 0.3 } },
  };

  // Module data with static Tailwind classes
  const modules = [
    {
      to: '/crm',
      title: 'CRM',
      desc: 'Manage customer relationships and boost sales.',
      bgClass: 'bg-blue-600',
      hoverClass: 'hover:bg-blue-700',
    },
    {
      to: '/sales',
      title: 'Sales Management',
      desc: 'Track and manage sales transactions.',
      bgClass: 'bg-green-600',
      hoverClass: 'hover:bg-green-700',
    },
    {
      to: '/finance',
      title: 'Finance Management',
      desc: 'Oversee financial operations and reporting.',
      bgClass: 'bg-yellow-600',
      hoverClass: 'hover:bg-yellow-700',
    },
    {
      to: '/hr',
      title: 'HR Management',
      desc: 'Streamline employee management and payroll.',
      bgClass: 'bg-purple-600',
      hoverClass: 'hover:bg-purple-700',
    },
    {
      to: '/inventory',
      title: 'Inventory Management',
      desc: 'Monitor stock levels and movements.',
      bgClass: 'bg-red-600',
      hoverClass: 'hover:bg-red-700',
    },
    {
      to: '/scm',
      title: 'SCM',
      desc: 'Optimize supply chain and logistics.',
      bgClass: 'bg-teal-600',
      hoverClass: 'hover:bg-teal-700',
    },
  ];

  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      {/* Navbar */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full bg-white shadow-lg z-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="text-2xl font-extrabold bg-gradient-to-r from-blue-600 to-indigo-600 text-transparent bg-clip-text">
            BizERP
          </div>
          <nav>
            <ul className="flex space-x-4">
              {['hero', 'profile', 'work', 'contact'].map((section) => (
                <li key={section}>
                  <button
                    onClick={() =>
                      document.getElementById(section).scrollIntoView({ behavior: 'smooth' })
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                      location.hash === `#${section}`
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-200 text-gray-800 hover:bg-blue-100 hover:text-blue-600'
                    }`}
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section
        id="hero"
        className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://static.vecteezy.com/system/resources/previews/012/696/903/original/erp-isometric-background-vector.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-blue-900/70"></div>
        <motion.div
          className="relative text-center text-white z-10"
          initial="hidden"
          animate="visible"
          variants={stagger}
        >
          <motion.h1
            className="text-4xl sm:text-6xl font-extrabold mb-4"
            variants={fadeIn}
          >
            Empower Your Business with BizERP
          </motion.h1>
          <motion.p className="text-lg sm:text-xl mb-6" variants={fadeIn}>
            Streamline operations, boost efficiency, and scale smarter with our all-in-one ERP solution.
          </motion.p>
          <motion.div variants={fadeIn}>
            <Link
              to="/register"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-full font-semibold text-lg hover:bg-blue-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Get Started Now
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            variants={fadeIn}
          >
            Simplify Business with BizERP
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeIn}>
              <p className="text-lg mb-4">
                Manage all your business operations seamlessly with a powerful ERP solution.
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base">
                <li>Unified dashboard for all modules</li>
                <li>Real-time inventory and sales tracking</li>
                <li>Automated billing and invoicing</li>
                <li>Secure user roles and permissions</li>
              </ul>
            </motion.div>
            <motion.div variants={fadeIn}>
              <img
                src="https://img.freepik.com/premium-vector/erp-business-management-flat-isometric-3d-illustration_18660-5980.jpg?ga=GA1.1.2090728591.1744713562&semt=ais_hybrid&w=740"
                alt="ERP Dashboard"
                className="rounded-xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="max-w-7xl mx-auto px-6 py-16 bg-gray-100">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2
            className="text-3xl sm:text-4xl font-bold text-center mb-12"
            variants={fadeIn}
          >
            Key Benefits of Using BizERP
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <motion.div variants={fadeIn}>
              <img
                src="https://img.freepik.com/free-vector/hand-drawn-erp-illustration_23-2149388659.jpg?ga=GA1.1.2090728591.1744713562&semt=ais_hybrid&w=740"
                alt="ERP Features"
                className="rounded-xl shadow-lg w-full"
              />
            </motion.div>
            <motion.div variants={fadeIn}>
              <p className="text-lg mb-4">
                Scale faster and make smarter decisions with powerful ERP capabilities:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-base">
                <li>Customizable modules for various industries</li>
                <li>Cloud-based access from anywhere</li>
                <li>Advanced analytics and reporting</li>
                <li>Streamlined communication between departments</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* Profile Section */}
      <section id="profile" className="py-20 bg-gradient-to-r from-blue-700 to-indigo-800 text-white text-center">
        <motion.div variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-12" variants={fadeIn}>
            About Us
          </motion.h2>
          <motion.div variants={fadeIn}>
            <img
              src="https://img.freepik.com/premium-vector/sap-business-cloud-software-icon-vector_116137-5008.jpg?ga=GA1.1.2090728591.1744713562&semt=ais_hybrid&w=740"
              alt="Profile"
              className="w-32 h-32 rounded-full mx-auto shadow-lg"
            />
            <p className="mt-6 text-lg max-w-2xl mx-auto">
              At BizERP, we’re passionate about empowering businesses with cutting-edge ERP solutions. Our team of experts delivers innovative tools to streamline your operations.
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Work Section */}
      <section id="work" className="py-20 bg-white text-center">
        <motion.div
          className="max-w-7xl mx-auto px-6"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <motion.h2 className="text-3xl sm:text-4xl font-bold mb-12" variants={fadeIn}>
            Our Modules
          </motion.h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {modules.map((module, index) => (
              <motion.div key={index} variants={cardHover} whileHover="hover">
                <Link
                  to={module.to}
                  className={`${module.bgClass} text-white p-6 rounded-lg shadow-lg ${module.hoverClass} transition transform flex flex-col h-full`}
                >
                  <h3 className="text-2xl font-semibold mb-2">{module.title}</h3>
                  <p className="text-sm flex-grow">{module.desc}</p>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-3">About BizERP</h4>
            <p className="text-sm">
              BizERP is your all-in-one ERP solution for managing inventory, sales, finance, and operations seamlessly.
            </p>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-3">Modules</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/inventory" className="hover:text-blue-400">Inventory</Link></li>
              <li><Link to="/sales" className="hover:text-blue-400">Sales</Link></li>
              <li><Link to="/finance" className="hover:text-blue-400">Finance</Link></li>
              <li><Link to="/reports" className="hover:text-blue-400">Reports</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-3">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/help" className="hover:text-blue-400">Help Center</Link></li>
              <li><Link to="/docs" className="hover:text-blue-400">Documentation</Link></li>
              <li><Link to="/contact" className="hover:text-blue-400">Contact Support</Link></li>
              <li><Link to="/faqs" className="hover:text-blue-400">FAQs</Link></li>
            </ul>
          </motion.div>
          <motion.div variants={fadeIn} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <h4 className="text-lg font-semibold mb-3">Contact Us</h4>
            <ul className="space-y-2 text-sm">
              <li>
                Email: <a href="mailto:support@bizerp.com" className="hover:text-blue-400">support@bizerp.com</a>
              </li>
              <li>Phone: +91-9876543210</li>
              <li>Location: Patna, Bihar, India</li>
            </ul>
          </motion.div>
        </div>
        <div className="border-t border-gray-700 mt-8 py-4 px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>© {new Date().getFullYear()} BizERP. All rights reserved.</p>
          <div className="flex space-x-4 mt-3 md:mt-0">
            <Link to="/terms" className="hover:text-blue-400">Terms</Link>
            <Link to="/privacy" className="hover:text-blue-400">Privacy</Link>
            <Link to="/security" className="hover:text-blue-400">Security</Link>
          </div>
          <div className="flex space-x-3 mt-3 md:mt-0">
            {[
              { href: 'https://facebook.com', icon: <Facebook size={18} /> },
              { href: 'https://twitter.com', icon: <Twitter size={18} /> },
              { href: 'https://linkedin.com', icon: <Linkedin size={18} /> },
              { href: 'mailto:support@bizerp.com', icon: <Mail size={18} /> },
            ].map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={iconPulse}
                whileHover="hover"
                className="hover:text-blue-400"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;