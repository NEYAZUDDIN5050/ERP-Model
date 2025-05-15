import React, { useState, useEffect } from 'react';

const SCMReporting = () => {
  const [reportData, setReportData] = useState({
    totalDeliveries: 0,
    averageDeliveryTime: 0,
    totalCostSavings: 0,
    supplierPerformance: [],
  });

  // Simulate fetching data from an API
  useEffect(() => {
    // Replace this with your API call
    const fetchReportData = async () => {
      // Simulated data
      const data = {
        totalDeliveries: 150,
        averageDeliveryTime: 2.5, // in days
        totalCostSavings: 12000, // in dollars
        supplierPerformance: [
          { name: 'Supplier A', performance: '95%' },
          { name: 'Supplier B', performance: '90%' },
          { name: 'Supplier C', performance: '85%' },
        ],
      };
      setReportData(data);
    };

    fetchReportData();
  }, []);

  return (
    <div className="bg-white p-4 rounded shadow mb-6">
      <h2 className="text-xl font-bold">SCM Reporting & Analytics</h2>
      <div className="mt-4">
        <h3 className="text-lg font-semibold">Key Performance Indicators (KPIs)</h3>
        <ul className="list-disc pl-5 mt-2">
          <li>Total Deliveries: {reportData.totalDeliveries}</li>
          <li>Average Delivery Time: {reportData.averageDeliveryTime} days</li>
          <li>Total Cost Savings: ${reportData.totalCostSavings}</li>
        </ul>
      </div>

      <div className="mt-4">
        <h3 className="text-lg font-semibold">Supplier Performance</h3>
        <table className="min-w-full bg-white border border-gray-300 mt-2">
          <thead>
            <tr>
              <th className="border px-4 py-2">Supplier Name</th>
              <th className="border px-4 py-2">Performance</th>
            </tr>
          </thead>
          <tbody>
            {reportData.supplierPerformance.map((supplier, index) => (
              <tr key={index}>
                <td className="border px-4 py-2">{supplier.name}</td>
                <td className="border px-4 py-2">{supplier.performance}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default SCMReporting;