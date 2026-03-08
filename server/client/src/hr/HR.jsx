import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AttendanceTracking from './AttendanceTracking';
import EmployeeRecords from './EmployeeRecords';
import LeaveRequests from './LeaveRequests';
import PayrollManagement from './PayrollManagement';
import PerformanceManagement from './PerformanceManagement';

const HR = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-br from-gray-100 to-gray-200 min-h-screen p-4 sm:p-8">
      {/* Header Section */}
      <header className="flex flex-col sm:flex-row justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold  bg-gradient-to-r from-purple-500 to-indigo-600 text-transparent bg-clip-text mb-4 sm:mb-0">
          HR Management
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              {
                to: '/hr/attendance',
                title: 'Attendance',
                desc: 'Track employee attendance records.',
                icon: '⏰',
              },
              {
                to: '/hr/employee-records',
                title: 'Employee Records',
                desc: 'Manage employee information.',
                icon: '👤',
              },
              {
                to: '/hr/leave-requests',
                title: 'Leave Requests',
                desc: 'Handle leave requests and approvals.',
                icon: '🏖️',
              },
              {
                to: '/hr/payroll',
                title: 'Payroll',
                desc: 'Manage salaries and payroll.',
                icon: '💰',
              },
              {
                to: '/hr/performance',
                title: 'Performance',
                desc: 'Set goals and review performance.',
                icon: '⭐',
              },
            ].map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="group relative bg-white p-5 rounded-xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 transform hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-50 to-indigo-50 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300"></div>
                <div className="relative flex items-start space-x-4">
                  <span className="text-3xl">{item.icon}</span>
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-purple-600">
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
          <Route path="attendance" element={<AttendanceTracking />} />
          <Route path="employee-records" element={<EmployeeRecords />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
          <Route path="payroll" element={<PayrollManagement />} />
          <Route path="performance" element={<PerformanceManagement />} />
          <Route
            path=""
            element={
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                  Welcome to HR Management
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

export default HR;


