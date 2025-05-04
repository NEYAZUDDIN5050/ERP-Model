
import { Routes, Route, Link, useNavigate } from 'react-router-dom'
import CustomerProfiles from './CustomerProfiles';
import DealPipeline from './DealPipeline';
import SupportTicketing from './SupportTicketing';


const CRM = () => {
  const navigate = useNavigate();


  return (
    <div className='bg-gray-50 min-h-screen p-6'>
      <div className="flex justify-between items-center mb-6">
      <button onClick={() => navigate('/dashboard')}
        className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
      ← Back to Dashboard
      </button>
      </div>
      <div className='flex p-3'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">CRM</h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3 rounded shadow'>back</button>
      </div>

      {/* Navigation Links */}
      <nav className="bg-white p-4 rounded shadow mb-6">
        <ul className="flex gap-8 text-lg text-indigo-600 font-medium">
          <li>
            <Link to="/crm/CustomerProfile" className="hover:underline">
            Customer-Profile
            </Link>
          </li>
          <li>
            <Link to="/crm/DealPipeline" className="hover:underline">
            Deal-Pipeline
            </Link>
          </li>
          <li>
            <Link to="/crm/SupportTicketing" className="hover:underline">
            Support-Ticketing
            </Link>
          </li>
        </ul>
      </nav>


      {/*Routes */}
     <div>
      <Routes>
        <Route path="CustomerProfile" element={<CustomerProfiles />}/>
        <Route path="DealPipeline" element={<DealPipeline />}/>
        <Route path="SupportTicketing" element={<SupportTicketing />}/>
        <Route 
        path=""
        element={<div className="text-center text-gray-500">👋 Welcome to the Finance Section</div>}
        
        />
      </Routes>
     </div>
    </div>
  );
};

export default CRM;