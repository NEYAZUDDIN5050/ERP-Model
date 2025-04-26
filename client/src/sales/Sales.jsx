import React, { useState } from 'react';
import InvoiceGeneration from './InvoiceGeneration';
import SalesOrder from './SalesOrder';
import SalesReporting from './SalesReporting';

const Sales = () => {
  const [orders, setOrders] = useState([]);

  return (
    <div>
      <div className='flex p-2'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">Sales</h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3  rounded shadow'>back</button>
      </div>
      <InvoiceGeneration />
      <SalesOrder setOrders={setOrders} />
      <SalesReporting orders={orders} />
    </div>
  );
};

export default Sales;