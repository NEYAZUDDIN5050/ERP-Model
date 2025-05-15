import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import InventoryTransfer from './InventoryTransfer';
import LowStockAlert from './LowStockAlert';
import StockMonitoring from './StockMonitoring';
import StockInOut from './StockInOut';

const Inventory = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4 sm:p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 bg-gradient-to-r from-indigo-500 to-blue-600 text-transparent bg-clip-text mb-4 sm:mb-0">
          Inventory Management
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="group relative inline-flex items-center px-5 py-2.5 rounded-full bg-red-600 text-white font-medium text-sm hover:bg-red-700 transition-all duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <span className="mr-2">←</span> Back to Dashboard
          <span className="absolute inset-0 rounded-full bg-red-700 opacity-0 group-hover:opacity-20 transition-opacity duration-300"></span>
        </button>
      </header>

      {/* Navigation Section */}
      <nav className="bg-white rounded-2xl shadow-xl p-6 mb-8 border border-gray-100">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                to: '/inventory/inventoryTransfer',
                title: 'Inventory Transfer',
                desc: 'Track transfers between warehouses.',
                icon: '🚚',
              },
              {
                to: '/inventory/lowStockAlert',
                title: 'Low Stock Alert',
                desc: 'Monitor low inventory levels.',
                icon: '⚠️',
              },
              {
                to: '/inventory/stockMonitoring',
                title: 'Stock Monitoring',
                desc: 'View real-time stock levels.',
                icon: '📋',
              },
              {
                to: '/inventory/stockInOut',
                title: 'Stock In/Out',
                desc: 'Record stock movements.',
                icon: '📦',
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="group relative bg-white p-5 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-50 to-blue-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                <div className="relative flex items-start space-x-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                      {item.title}
                    </h2>
                    <p className="text-sm text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Content Section */}
      <main className="bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
        <Routes>
          <Route path="inventoryTransfer" element={<InventoryTransfer />} />
          <Route path="lowStockAlert" element={<LowStockAlert />} />
          <Route path="stockMonitoring" element={<StockMonitoring />} />
          <Route path="stockInOut" element={<StockInOut />} />
          <Route
            path=""
            element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Welcome to Inventory Management
                </h2>
                <p className="text-gray-500">
                  Select an option from the menu above to get started.
                </p>
              </div>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default Inventory;