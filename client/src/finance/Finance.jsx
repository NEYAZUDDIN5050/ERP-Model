// src/components/finance/Finance.jsx
import React, { useState } from 'react';
import FinancialReports from './FinancialReports';
import IncomeExpenseTracker from './IncomeExpenseTracker';
import InvoiceTracking from './InvoiceTracking';

const Finance = () => {
  const [incomeData, setIncomeData] = useState([3000, 4000, 3500, 5000, 4500, 6000, 7000]);
  const [expenseData, setExpenseData] = useState([2000, 2500, 3000, 3500, 3000, 4000, 4500]);

  return (
    <div>
      <div className='flex p-3'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">Finance Overview</h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3 rounded shadow'>back</button>
      </div>
      <FinancialReports incomeData={incomeData} expenseData={expenseData} />
      <IncomeExpenseTracker setIncomeData={setIncomeData} setExpenseData={setExpenseData} />
      <InvoiceTracking />
    </div>
  );
};

export default Finance;