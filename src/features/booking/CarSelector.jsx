import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useBooking } from './BookingContext';
import { FaCar, FaPlus } from 'react-icons/fa';

const carBrands = [
  { id: 1, name: 'Maruti Suzuki' },
  { id: 2, name: 'Hyundai' },
  { id: 3, name: 'Tata' },
  { id: 4, name: 'Mahindra' },
  { id: 5, name: 'Honda' },
  { id: 6, name: 'Toyota' },
  { id: 7, name: 'Volkswagen' },
  { id: 8, name: 'Ford' },
];

const CarSelector = () => {
  const { state, setCar, setStep } = useBooking();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [carDetails, setCarDetails] = useState({
    brand: '',
    model: '',
    year: '',
    registrationNumber: '',
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddCar = (e) => {
    e.preventDefault();
    const newCar = {
      id: Date.now(),
      ...carDetails,
    };
    setCar(newCar);
    setStep(2);
  };

  const handleSelectSavedCar = (car) => {
    setCar(car);
    setStep(2);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Your Car</h2>

      {/* Brand Selection */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {carBrands.map((brand) => (
          <motion.button
            key={brand.id}
            onClick={() => setSelectedBrand(brand)}
            className={`p-4 rounded-lg border ${
              selectedBrand?.id === brand.id
                ? 'border-red-500 bg-red-50'
                : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
            } transition-colors`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {brand.name}
          </motion.button>
        ))}
      </div>

      {/* Saved Cars */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Your Cars</h3>
          <motion.button
            onClick={() => setShowAddForm(!showAddForm)}
            className="flex items-center gap-2 text-red-500 hover:text-red-600"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FaPlus /> Add New Car
          </motion.button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Example saved cars */}
          <motion.button
            onClick={() => handleSelectSavedCar({
              id: 1,
              brand: 'Maruti Suzuki',
              model: 'Swift',
              year: '2020',
              registrationNumber: 'MH12AB1234'
            })}
            className="flex items-center gap-4 p-4 rounded-lg border border-gray-200 hover:border-red-500 hover:bg-red-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <FaCar className="text-3xl text-gray-600" />
            <div className="text-left">
              <h4 className="font-medium">Maruti Suzuki Swift</h4>
              <p className="text-sm text-gray-500">MH12AB1234</p>
            </div>
          </motion.button>
        </div>
      </div>

      {/* Add New Car Form */}
      <AnimatePresence>
        {showAddForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden"
          >
            <form onSubmit={handleAddCar} className="bg-gray-50 p-6 rounded-lg space-y-4">
              <h3 className="text-lg font-semibold mb-4">Add New Car</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Brand</label>
                  <select
                    value={carDetails.brand}
                    onChange={(e) => setCarDetails({ ...carDetails, brand: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  >
                    <option value="">Select Brand</option>
                    {carBrands.map((brand) => (
                      <option key={brand.id} value={brand.name}>
                        {brand.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Model</label>
                  <input
                    type="text"
                    value={carDetails.model}
                    onChange={(e) => setCarDetails({ ...carDetails, model: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Year</label>
                  <input
                    type="number"
                    value={carDetails.year}
                    onChange={(e) => setCarDetails({ ...carDetails, year: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    min="1900"
                    max={new Date().getFullYear()}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Registration Number
                  </label>
                  <input
                    type="text"
                    value={carDetails.registrationNumber}
                    onChange={(e) =>
                      setCarDetails({ ...carDetails, registrationNumber: e.target.value })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500"
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-4 mt-6">
                <motion.button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cancel
                </motion.button>
                <motion.button
                  type="submit"
                  className="px-4 py-2 text-white bg-red-500 rounded-md hover:bg-red-600"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add Car
                </motion.button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CarSelector;