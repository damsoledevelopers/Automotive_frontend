import React from 'react';
import { FaBox, FaPlus } from 'react-icons/fa';

const Inventory = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Inventory Management</h2>
        <button className="btn-primary flex items-center gap-2">
          <FaPlus /> Add Item
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600">Inventory management interface will be displayed here.</p>
      </div>
    </div>
  );
};

export default Inventory;

