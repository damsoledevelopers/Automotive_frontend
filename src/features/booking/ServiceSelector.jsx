import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './BookingContext';
import { FaCheck, FaPlus, FaMinus, FaTools, FaOilCan, FaCar } from 'react-icons/fa';

const services = [
  {
    id: 1,
    category: 'Regular Maintenance',
    items: [
      { id: 101, name: 'Oil Change', price: 999, time: '45 mins' },
      { id: 102, name: 'Filter Replacement', price: 499, time: '30 mins' },
      { id: 103, name: 'Brake Check', price: 299, time: '20 mins' },
    ],
  },
  {
    id: 2,
    category: 'Repair Services',
    items: [
      { id: 201, name: 'Brake Repair', price: 2499, time: '2 hrs' },
      { id: 202, name: 'Engine Tune-up', price: 1999, time: '1.5 hrs' },
      { id: 203, name: 'Suspension Work', price: 3499, time: '3 hrs' },
    ],
  },
  {
    id: 3,
    category: 'Diagnostics',
    items: [
      { id: 301, name: 'Full Car Inspection', price: 799, time: '1 hr' },
      { id: 302, name: 'Engine Diagnostics', price: 999, time: '45 mins' },
      { id: 303, name: 'AC Performance Check', price: 599, time: '30 mins' },
    ],
  },
];

const ServiceSelector = () => {
  const { state, addService, removeService, setStep } = useBooking();
  const { selectedServices } = state;

  const isServiceSelected = (serviceId) =>
    selectedServices.some((service) => service.id === serviceId);

  const handleServiceToggle = (service) => {
    if (isServiceSelected(service.id)) {
      removeService(service.id);
    } else {
      addService(service);
    }
  };

  const getTotalTime = () => {
    return selectedServices.reduce((total, service) => {
      const [time, unit] = service.time.split(' ');
      const minutes = unit === 'hrs' ? parseInt(time) * 60 : parseInt(time);
      return total + minutes;
    }, 0);
  };

  const formatTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours === 0) return `${mins} mins`;
    if (mins === 0) return `${hours} hrs`;
    return `${hours} hrs ${mins} mins`;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Select Services</h2>

      {/* Selected Services Summary */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Selected Services</h3>
          <div className="text-sm text-gray-600">
            Total Time: {formatTime(getTotalTime())}
          </div>
        </div>
        <AnimatePresence>
          {selectedServices.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="flex justify-between items-center bg-white p-3 rounded-md mb-2 shadow-sm"
            >
              <div className="flex items-center gap-3">
                <FaTools className="text-gray-500" />
                <div>
                  <p className="font-medium">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.time}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <p className="font-semibold">₹{service.price}</p>
                <button
                  onClick={() => removeService(service.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FaMinus />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        {selectedServices.length === 0 && (
          <p className="text-gray-500 text-center py-4">No services selected</p>
        )}
      </div>

      {/* Service Categories */}
      <div className="space-y-6">
        {services.map((category) => (
          <div key={category.id} className="bg-white rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-4">{category.category}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {category.items.map((service) => (
                <motion.button
                  key={service.id}
                  onClick={() => handleServiceToggle(service)}
                  className={`p-4 rounded-lg border ${
                    isServiceSelected(service.id)
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
                  } text-left transition-colors`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-gray-500">{service.time}</p>
                    </div>
                    {isServiceSelected(service.id) ? (
                      <FaCheck className="text-red-500" />
                    ) : (
                      <FaPlus className="text-gray-400" />
                    )}
                  </div>
                  <p className="mt-2 font-semibold">₹{service.price}</p>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          onClick={() => setStep(1)}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={() => setStep(3)}
          disabled={selectedServices.length === 0}
          className={`px-6 py-2 rounded-lg text-white ${
            selectedServices.length === 0
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
          whileHover={selectedServices.length > 0 ? { scale: 1.02 } : {}}
          whileTap={selectedServices.length > 0 ? { scale: 0.98 } : {}}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
};

export default ServiceSelector;