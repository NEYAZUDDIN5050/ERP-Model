
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import InvoiceGeneration from './InvoiceGeneration';
import SalesOrder from './SalesOrder';
import SalesReporting from './SalesReporting';


const Sales = () => {
const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate('/dashboard')}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-6"
        >
      ← Back to Dashboard
      </button>
      <div className='flex p-2'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">Sales</h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3  rounded shadow'>back</button>
      </div>

       {/*Navigate */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-medium text-gray-700 mb-4">HR Management</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/sales/invoiceGeneration"
                className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
              >
                Invoice-Generation
              </Link>
            </li>
            <li>
              <Link
                to="/sales/salesOrder"
                className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
              >
                Sales-Order
              </Link>
            </li>
            <li>
              <Link
                to="/sales/SalesReporting"
                className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
              >
                Sales-Reporting
              </Link>
            </li>
          </ul>
        </nav>
      </div>



      {/*Routes*/}
      <div>
        <Routes>
          <Route  path="invoiceGeneration" element={<InvoiceGeneration />} />
          <Route  path="salesOrder" element={<SalesOrder />} />
          <Route  path="SalesReporting" element={<SalesReporting />} />
          <Route path="" element={<div>Welcome to sales</div>} />
        </Routes>
      </div>
    </div>
  );
};

export default Sales;