import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import InventoryTransfer from './InventoryTransfer';
import LowStockAlert from './LowStockAlert';
import StockMonitoring from './StockMonitoring';

const Inventory = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Header and Back Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gray-400 rounded-2xl w-70 text-center text-gray-800">Inventory Management</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Navigation Cards */}
      <nav className="bg-white p-4 rounded shadow mb-6">
        <div className="container mx-auto px-4 mb-20">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/inventory/inventoryTransfer"
              className="bg-indigo-400 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Inventory Transfer</h2>
              <p>Manage and track transfers between warehouses or branches.</p>
            </Link>
            <Link
              to="/inventory/lowStockAlert"
              className="bg-indigo-400 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Low Stock Alert</h2>
              <p>Stay updated on low inventory levels and avoid stockouts.</p>
            </Link>
            <Link
              to="/inventory/stockMonitoring"
              className="bg-indigo-400 text-white p-6 rounded-lg shadow-lg hover:bg-indigo-500 transition transform hover:scale-105"
            >
              <h2 className="text-2xl font-semibold">Stock Monitoring</h2>
              <p>Monitor real-time stock levels and inventory flow.</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* Routes */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Routes>
          <Route path="inventoryTransfer" element={<InventoryTransfer />} />
          <Route path="lowStockAlert" element={<LowStockAlert />} />
          <Route path="stockMonitoring" element={<StockMonitoring />} />
          <Route
            path=""
            element={
              <div className="text-center text-gray-600 text-xl">
                Welcome to the Inventory Section. Please choose an option above.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default Inventory;
