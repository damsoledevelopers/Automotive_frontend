import React, { useState, useEffect } from 'react';
import { useVehicle } from '../../contexts/VehicleContext';
import { FaCheckCircle, FaTimesCircle, FaShieldAlt, FaInfoCircle } from 'react-icons/fa';

const PartsBasketBuilder = ({ vehicle, symptoms, onPartsSelected, initialParts = [] }) => {
  const { getCompatibleParts } = useVehicle();
  const [compatibleParts, setCompatibleParts] = useState([]);
  const [selectedParts, setSelectedParts] = useState(initialParts);
  const [expandedPart, setExpandedPart] = useState(null);

  useEffect(() => {
    if (vehicle) {
      const parts = getCompatibleParts(vehicle, symptoms || []);
      setCompatibleParts(parts);
    }
  }, [vehicle, symptoms, getCompatibleParts]);

  const handlePartSelect = (part, option) => {
    const existingIndex = selectedParts.findIndex(p => p.id === part.id);
    
    if (existingIndex >= 0) {
      // Update existing part
      const updated = [...selectedParts];
      updated[existingIndex] = {
        ...updated[existingIndex],
        selectedOption: option,
        price: option.price
      };
      setSelectedParts(updated);
    } else {
      // Add new part
      setSelectedParts([...selectedParts, {
        id: part.id,
        name: part.name,
        sku: part.sku,
        oemNumber: part.oemNumber,
        selectedOption: option,
        price: option.price,
        vendor: option.vendor,
        warranty: option.warranty
      }]);
    }
    
    onPartsSelected?.(selectedParts);
  };

  const handleRemovePart = (partId) => {
    setSelectedParts(selectedParts.filter(p => p.id !== partId));
    onPartsSelected?.(selectedParts.filter(p => p.id !== partId));
  };

  const getOptionBadgeColor = (type) => {
    const colors = {
      'OE': 'bg-blue-100 text-blue-800',
      'OEM': 'bg-green-100 text-green-800',
      'Aftermarket': 'bg-yellow-100 text-yellow-800',
      'Used': 'bg-gray-100 text-gray-800',
      'Refurbished': 'bg-purple-100 text-purple-800'
    };
    return colors[type] || 'bg-gray-100 text-gray-800';
  };

  const calculateTotal = () => {
    return selectedParts.reduce((sum, part) => sum + (part.price || 0), 0);
  };

  return (
    <div className="space-y-6">
      {/* Selected Parts Summary */}
      {selectedParts.length > 0 && (
        <div className="card bg-primary-50 border-primary-200">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Selected Parts ({selectedParts.length})</h3>
          <div className="space-y-3">
            {selectedParts.map((part) => (
              <div key={part.id} className="bg-white rounded-lg p-4 flex items-center justify-between">
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">{part.name}</h4>
                  <div className="flex items-center gap-3 mt-1">
                    <span className={`text-xs px-2 py-1 rounded-full ${getOptionBadgeColor(part.selectedOption?.type)}`}>
                      {part.selectedOption?.type}
                    </span>
                    <span className="text-sm text-gray-600">₹{part.price?.toFixed(2)}</span>
                    {part.warranty && (
                      <span className="text-xs text-gray-500 flex items-center gap-1">
                        <FaShieldAlt /> {part.warranty}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemovePart(part.id)}
                  className="text-red-600 hover:text-red-700 p-2"
                >
                  <FaTimesCircle />
                </button>
              </div>
            ))}
            <div className="border-t border-primary-200 pt-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-primary-600">₹{calculateTotal().toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Compatible Parts List */}
      <div className="card">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Compatible Parts</h3>
        <p className="text-sm text-gray-600 mb-6">
          Based on your vehicle and symptoms, here are the recommended parts. Select an option for each part.
        </p>

        <div className="space-y-4">
          {compatibleParts.map((part) => {
            const isSelected = selectedParts.some(p => p.id === part.id);
            const selectedOption = selectedParts.find(p => p.id === part.id)?.selectedOption;

            return (
              <div
                key={part.id}
                className={`border-2 rounded-lg p-4 transition-all ${
                  isSelected ? 'border-primary-600 bg-primary-50' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{part.name}</h4>
                      {isSelected && (
                        <FaCheckCircle className="text-green-600" />
                      )}
                    </div>
                    <p className="text-sm text-gray-600">
                      SKU: {part.sku} | OEM: {part.oemNumber}
                    </p>
                  </div>
                  <button
                    onClick={() => setExpandedPart(expandedPart === part.id ? null : part.id)}
                    className="text-primary-600 hover:text-primary-700 text-sm font-semibold"
                  >
                    {expandedPart === part.id ? 'Hide Options' : 'View Options'}
                  </button>
                </div>

                {expandedPart === part.id && (
                  <div className="mt-4 space-y-3 border-t border-gray-200 pt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Available Options:</p>
                    {part.options.map((option, idx) => {
                      const isOptionSelected = selectedOption?.type === option.type;
                      
                      return (
                        <div
                          key={idx}
                          onClick={() => handlePartSelect(part, option)}
                          className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                            isOptionSelected
                              ? 'border-primary-600 bg-primary-50'
                              : 'border-gray-200 hover:border-primary-300'
                          }`}
                        >
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2">
                                <span className={`px-2 py-1 rounded text-xs font-semibold ${getOptionBadgeColor(option.type)}`}>
                                  {option.type}
                                </span>
                                {option.condition && option.condition !== 'new' && (
                                  <span className="text-xs text-gray-600">({option.condition})</span>
                                )}
                              </div>
                              <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                  <p className="text-gray-600">Price</p>
                                  <p className="font-bold text-gray-900">₹{option.price.toFixed(2)}</p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Stock</p>
                                  <p className={`font-semibold ${
                                    option.stock > 10 ? 'text-green-600' :
                                    option.stock > 0 ? 'text-yellow-600' :
                                    'text-red-600'
                                  }`}>
                                    {option.stock > 0 ? `${option.stock} available` : 'Out of stock'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Warranty</p>
                                  <p className="font-semibold text-gray-900 flex items-center gap-1">
                                    <FaShieldAlt className="text-sm" /> {option.warranty}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-gray-600">Vendor</p>
                                  <p className="font-semibold text-gray-900">{option.vendor}</p>
                                </div>
                              </div>
                              {option.type === 'Used' && (
                                <div className="mt-2 p-2 bg-yellow-50 border border-yellow-200 rounded text-xs text-yellow-800">
                                  <FaInfoCircle className="inline mr-1" />
                                  Used parts may have limited warranty. Please verify condition before installation.
                                </div>
                              )}
                            </div>
                            {isOptionSelected && (
                              <FaCheckCircle className="text-primary-600 text-xl ml-4" />
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {compatibleParts.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-600">No compatible parts found. Please check your vehicle details.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PartsBasketBuilder;

