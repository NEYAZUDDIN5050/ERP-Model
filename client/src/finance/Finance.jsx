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
      <h1 className="text-3xl font-bold mb-4">Finance Overview</h1>
      <FinancialReports incomeData={incomeData} expenseData={expenseData} />
      <IncomeExpenseTracker setIncomeData={setIncomeData} setExpenseData={setExpenseData} />
      <InvoiceTracking />
    </div>
  );
};

export default Finance;