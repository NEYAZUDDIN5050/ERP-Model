import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import InventoryTransfer from './InventoryTransfer';
import LowStockAlert from './LowStockAlert';
import StockMonitoring from './StockMonitoring';

const Inventory = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
       <button
        onClick={() => navigate('/dashboard')}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-6"
      >
        ← Back to Dashboard
      </button>
        <div className='flex p-3'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">Inventory </h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3 rounded shadow'>back</button>
      </div>
     

     {/* Navigation Section */}
           <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
             <h2 className="text-xl font-medium text-gray-700 mb-4">HR Management</h2>
             <nav>
               <ul className="space-y-4">
                 <li>
                   <Link
                     to="/inventory/inventoryTransfer"
                     className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
                   >
                     Attendance Tracking
                   </Link>
                 </li>
                 <li>
                   <Link
                     to="/inventory/lowStockAlert"
                     className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
                   >
                     Employee Records
                   </Link>
                 </li>
                 <li>
                   <Link
                     to="/inventory/stockMonitoring"
                     className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
                   >
                     Leave Requests
                   </Link>
                 </li>
               </ul>
             </nav>
           </div>
     


     {/*Routes */}
     <Routes>
      <Route path="inventoryTransfer" element={<InventoryTransfer />} />
      <Route path="lowStockAlert" element={<LowStockAlert />} />
      <Route path="stockMonitoring" element={<StockMonitoring />} />
      <Route path="" element={
        <div>welcome to the hr</div>
      }
      />
     </Routes>
    </div>
  );
};

export default Inventory;