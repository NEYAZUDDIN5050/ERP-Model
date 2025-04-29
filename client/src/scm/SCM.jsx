import React from 'react';
import DeliveryScheduling from './DeliveryScheduling';
import InventoryMovement from './InventoryMovement';
import VendorManagement from './VendorManagement';

const SCM = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Supply Chain Management</h1>
      <DeliveryScheduling />
      <InventoryMovement />
      <VendorManagement />
    </div>
  );
};

export default SCM;