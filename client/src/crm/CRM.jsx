import React from 'react';
import CustomerProfiles from './CustomerProfiles';
import DealPipeline from './DealPipeline';
import SupportTicketing from './SupportTicketing';

const CRM = () => {
  return (
    <div>
      <div className='flex p-3'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">CRM</h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3 rounded shadow'>back</button>
      </div>
      <CustomerProfiles />
      <DealPipeline />
      <SupportTicketing />
    </div>
  );
};

export default CRM;