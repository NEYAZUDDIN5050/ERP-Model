import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AttendanceTracking from './AttendanceTracking';
import EmployeeRecords from './EmployeeRecords';
import LeaveRequests from './LeaveRequests';

const HR = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Back to Dashboard Button */}
      <button
        onClick={() => navigate('/dashboard')}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition duration-300 mb-6"
      >
        ← Back to Dashboard
      </button>

      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-semibold text-gray-800">HR Dashboard</h1>
        <div>
          {/* Profile Icon or HR Actions */}
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-700">
            Profile
          </button>
        </div>
      </div>

      {/* Navigation Section */}
      <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
        <h2 className="text-xl font-medium text-gray-700 mb-4">HR Management</h2>
        <nav>
          <ul className="space-y-4">
            <li>
              <Link
                to="/hr/attendance"
                className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
              >
                Attendance Tracking
              </Link>
            </li>
            <li>
              <Link
                to="/hr/employee-records"
                className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
              >
                Employee Records
              </Link>
            </li>
            <li>
              <Link
                to="/hr/leave-requests"
                className="text-lg text-indigo-600 hover:text-indigo-800 hover:underline transition duration-300"
              >
                Leave Requests
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* HR Routes */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Routes>
          <Route path="attendance" element={<AttendanceTracking />} />
          <Route path="employee-records" element={<EmployeeRecords />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
          <Route
            path=""
            element={
              <div className="text-center text-gray-600 text-xl">
                Welcome to the HR Section. Please select an option from the menu above.
              </div>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default HR;


