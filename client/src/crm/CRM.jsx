import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CustomerProfiles from './CustomerProfiles';
import DealPipeline from './DealPipeline';
import SupportTicketing from './SupportTicketing';
import ActivityTaskManagement from './ActivityTaskManagement'; // Import the new component

const CRM = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Back to Dashboard Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gray-400 rounded-2xl w-70 text-center text-gray-800">CRM Management</h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Navigation Section */}
      <nav className="bg-white p-4 rounded shadow mb-6">
        <div className="container mx-auto px-4 mb-20">
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/crm/CustomerProfile" className="bg-blue-400 text-white p-6 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Customer Profiles</h2>
              <p>Manage and view detailed customer information effectively.</p>
            </Link>
            <Link to="/crm/DealPipeline" className="bg-blue-400 text-white p-6 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Deal Pipeline</h2>
              <p>Track and manage ongoing deals and sales stages.</p>
            </Link>
            <Link to="/crm/SupportTicketing" className="bg-blue-400 text-white p-6 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Support Ticketing</h2>
              <p>Handle customer support issues and ticket resolution efficiently.</p>
            </Link>
            <Link to="/crm/activityTaskManagement" className="bg-blue-400 text-white p-6 rounded-lg shadow-lg hover:bg-blue-500 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Activity & Task Management</h2>
              <p>Schedule follow-ups, meetings, calls, and reminders.</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* CRM Routes */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Routes>
          <Route path="CustomerProfile" element={<CustomerProfiles />} />
          <Route path="DealPipeline" element={<DealPipeline />} />
          <Route path="SupportTicketing" element={<SupportTicketing />} />
          <Route path="activityTaskManagement" element={<ActivityTaskManagement />} /> {/* Add route for Activity & Task Management */}
          <Route
            path=""
            element={
              <div className="text-center text-gray-600 text-xl">
                Welcome to the CRM Section. Please select an option from the menu above.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default CRM;