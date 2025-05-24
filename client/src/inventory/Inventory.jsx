import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import InventoryTransfer from './InventoryTransfer';
import LowStockAlert from './LowStockAlert';
import StockMonitoring from './StockMonitoring';
import StockInOut from './StockInOut';

const Inventory = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          Inventory Management
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-all duration-300"
        >
          ← Back to Dashboard
        </button>
      </header>

      {/* Navigation Section */}
      <nav className="bg-white rounded-xl shadow-md p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              to: '/inventory/inventory-transfer',
              title: 'Inventory Transfer',
              desc: 'Track transfers between warehouses.',
              icon: '🚚',
            },
            {
              to: '/inventory/low-stock-alert',
              title: 'Low Stock Alert',
              desc: 'Monitor low inventory levels.',
              icon: '⚠️',
            },
            {
              to: '/inventory/stock-monitoring',
              title: 'Stock Monitoring',
              desc: 'View real-time stock levels.',
              icon: '📋',
            },
            {
              to: '/inventory/stock-in-out',
              title: 'Stock In/Out',
              desc: 'Record stock movements.',
              icon: '📦',
            },
          ].map((item, index) => (
            <Link
              key={index}
              to={item.to}
              className="group bg-white p-4 rounded-lg shadow-sm hover:shadow-md border border-gray-200 transition-all duration-300"
            >
              <div className="flex items-start space-x-4">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-indigo-600">
                    {item.title}
                  </h2>
                  <p className="text-sm text-gray-500">{item.desc}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </nav>

      {/* Content Section */}
      <main className="bg-white rounded-xl shadow-md p-6">
        <Routes>
          <Route path="inventory-transfer" element={<InventoryTransfer />} />
          <Route path="low-stock-alert" element={<LowStockAlert />} />
          <Route path="stock-monitoring" element={<StockMonitoring />} />
          <Route path="stock-in-out" element={<StockInOut />} />
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