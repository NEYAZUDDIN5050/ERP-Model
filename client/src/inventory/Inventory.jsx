import React from 'react';
import InventoryTransfer from './InventoryTransfer';
import LowStockAlert from './LowStockAlert';
import StockMonitoring from './StockMonitoring';

const Inventory = () => {
  return (
    <div>
        <div className='flex p-3'>
      <h1 className="text-3xl text-center   font-bold mb-4 bg-gray-500 w-70 h-10 rounded-3xl">Inventory </h1>
      <button className='space-x-8 ml-auto m-4 bg-red-500  hover:bg-red-600 text-white text-center font-semibold py-1 px-3 rounded shadow'>back</button>
      </div>
      <InventoryTransfer />
      <LowStockAlert />
      <StockMonitoring />
    </div>
  );
};

export default Inventory;