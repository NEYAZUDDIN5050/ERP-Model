import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import CustomerProfiles from './CustomerProfiles';
import DealPipeline from './DealPipeline';
import SupportTicketing from './SupportTicketing';
import ActivityTaskManagement from './ActivityTaskManagement';

const CRM = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-800 mb-4 sm:mb-0">
          CRM Management
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
              to: '/crm/customer-profiles',
              title: 'Customer Profiles',
              desc: 'Manage and view detailed customer information.',
              icon: '👥',
            },
            {
              to: '/crm/deal-pipeline',
              title: 'Deal Pipeline',
              desc: 'Track and manage ongoing deals and sales.',
              icon: '📈',
            },
            {
              to: '/crm/support-ticketing',
              title: 'Support Ticketing',
              desc: 'Handle customer support issues efficiently.',
              icon: '🎫',
            },
            {
              to: '/crm/activity-task-management',
              title: 'Activity & Tasks',
              desc: 'Schedule follow-ups, meetings, and reminders.',
              icon: '📅',
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
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-blue-600">
                    {item.title
                    }
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
          <Route path="customer-profiles" element={<CustomerProfiles />} />
          <Route path="deal-pipeline" element={<DealPipeline />} />
          <Route path="support-ticketing" element={<SupportTicketing />} />
          <Route path="activity-task-management" element={<ActivityTaskManagement />} />
          <Route
            path=""
            element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Welcome to CRM Management
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

export default CRM;