import React from 'react';

const FinancialReports = ({ incomeData, expenseData }) => {
  const totalIncome = incomeData.reduce((a, b) => a + b, 0);
  const totalExpenses = expenseData.reduce((a, b) => a + b, 0);
  const netProfit = totalIncome - totalExpenses;

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">Financial Reports</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-green-100 p-4 rounded">
          <h3 className="font-bold">Total Income</h3>
          <p className="text-2xl">${totalIncome}</p>
        </div>
        <div className="bg-red-100 p-4 rounded">
          <h3 className="font-bold">Total Expenses</h3>
          <p className="text-2xl">${totalExpenses}</p>
        </div>
        <div className="bg-blue-100 p-4 rounded">
          <h3 className="font-bold">Net Profit</h3>
          <p className="text-2xl">${netProfit}</p>
        </div>
      </div>
    </div>
  );
};

export default FinancialReports;