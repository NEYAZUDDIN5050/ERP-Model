import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import AttendanceTracking from './AttendanceTracking';
import EmployeeRecords from './EmployeeRecords';
import LeaveRequests from './LeaveRequests';
import PayrollManagement from './PayrollManagement'; // Import the new component
import PerformanceManagement from './PerformanceManagement'; // Import the new component

const HR = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen p-6">
      {/* Back to Dashboard Button */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold bg-gray-400 rounded-2xl w-70 text-center text-gray-800">HR Management</h1>
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
            <Link to="/hr/attendance" className="bg-purple-300 text-white p-6 rounded-lg shadow-lg hover:bg-purple-400 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Attendance</h2>
              <p>Manage employee attendance records efficiently.</p>
            </Link>
            <Link to="/hr/employee-records" className="bg-purple-300 text-white p-6 rounded-lg shadow-lg hover:bg-purple-400 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Employee Records</h2>
              <p>Track and manage employee information effectively.</p>
            </Link>
            <Link to="/hr/leave-requests" className="bg-purple-300 text-white p-6 rounded-lg shadow-lg hover:bg-purple-400 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Leave Requests</h2>
              <p>Manage employee leave requests and approvals.</p>
            </Link>
            <Link to="/hr/payroll" className="bg-purple-300 text-white p-6 rounded-lg shadow-lg hover:bg-purple-400 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Payroll Management</h2>
              <p>Manage salary structures and payroll details.</p>
            </Link>
            <Link to="/hr/performance" className="bg-purple-300 text-white p-6 rounded-lg shadow-lg hover:bg-purple-400 transition transform hover:scale-105">
              <h2 className="text-2xl font-semibold">Performance Management</h2>
              <p>Set goals and manage performance appraisals.</p>
            </Link>
          </div>
        </div>
      </nav>

      {/* HR Routes */}
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <Routes>
          <Route path="attendance" element={<AttendanceTracking />} />
          <Route path="employee-records" element={<EmployeeRecords />} />
          <Route path="leave-requests" element={<LeaveRequests />} />
          <Route path="payroll" element={<PayrollManagement />} /> {/* Add route for Payroll Management */}
          <Route path="performance" element={<PerformanceManagement />} /> {/* Add route for Performance Management */}
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


