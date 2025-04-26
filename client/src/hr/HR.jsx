import React from 'react';
import EmployeeRecords from './EmployeeRecords';
import AttendanceTracking from './AttendanceTracking';
import LeaveRequests from './LeaveRequests';

const HR = () => {
  return (
    <div>
        <div className='flex p-2'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">HR Management</h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3  rounded shadow'>back</button>
      </div>
      <EmployeeRecords />
      <AttendanceTracking />
      <LeaveRequests />
    </div>
  );
};

export default HR;