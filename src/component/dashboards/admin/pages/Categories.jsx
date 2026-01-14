import React, { useState } from 'react';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaBox } from 'react-icons/fa';

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const categories = [
    { id: 1, name: 'Brake System', products: 245, subcategories: 12 },
    { id: 2, name: 'Engine Parts', products: 189, subcategories: 8 },
    { id: 3, name: 'Filters', products: 156, subcategories: 5 },
    { id: 4, name: 'Suspension', products: 134, subcategories: 6 },
    { id: 5, name: 'Electrical', products: 298, subcategories: 15 },
  ];

  const filteredCategories = categories.filter(cat => 
    !searchTerm || cat.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-gray-900">Category Management</h2>
          <p className="text-xs text-gray-600 mt-1">Manage product categories and attributes</p>
        </div>
        <button className="btn-primary flex items-center gap-2 text-sm">
          <FaPlus /> Add Category
        </button>
      </div>

      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-100">
        <div className="relative">
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCategories.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-md p-6 border border-gray-100 hover:shadow-lg transition">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center text-white">
                <FaBox />
              </div>
              <div className="flex gap-2">
                <button className="text-green-600 hover:text-green-900">
                  <FaEdit />
                </button>
                <button className="text-red-600 hover:text-red-900">
                  <FaTrash />
                </button>
              </div>
            </div>
            <h3 className="text-base font-semibold text-gray-900 mb-2">{category.name}</h3>
            <div className="space-y-1 text-sm text-gray-600">
              <p>{category.products} products</p>
              <p>{category.subcategories} subcategories</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;

