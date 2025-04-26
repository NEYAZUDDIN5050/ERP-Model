import React from 'react';
import EmployeeRecords from './EmployeeRecords';
import AttendanceTracking from './AttendanceTracking';
import LeaveRequests from './LeaveRequests';

const HR = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">HR Management</h1>
      <EmployeeRecords />
      <AttendanceTracking />
      <LeaveRequests />
    </div>
  );
};

export default HR;