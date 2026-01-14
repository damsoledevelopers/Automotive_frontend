import React from 'react';
import { motion } from 'framer-motion';
import { useBooking } from './BookingContext';
import { format } from 'date-fns';
import {
  FaCar,
  FaTools,
  FaClock,
  FaMapMarkerAlt,
  FaMoneyBillWave,
  FaPercent,
} from 'react-icons/fa';

const BookingSummary = () => {
  const { state, setStep } = useBooking();
  const { selectedCar, selectedServices, schedule } = state;

  const calculateSubtotal = () => {
    return selectedServices.reduce((total, service) => total + service.price, 0);
  };

  const calculateTax = (subtotal) => {
    return subtotal * 0.18; // 18% GST
  };

  const calculateDiscount = (subtotal) => {
    // Example: 5% discount for booking more than 2 services
    return selectedServices.length > 2 ? subtotal * 0.05 : 0;
  };

  const calculateTotal = () => {
    const subtotal = calculateSubtotal();
    const tax = calculateTax(subtotal);
    const discount = calculateDiscount(subtotal);
    return subtotal + tax - discount;
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Booking Summary</h2>

      <div className="space-y-6">
        {/* Car Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaCar className="text-red-500" />
            Vehicle Details
          </h3>
          <div className="ml-8">
            <p className="text-gray-700">{selectedCar.brand} {selectedCar.model}</p>
            <p className="text-gray-500">{selectedCar.year} • {selectedCar.variant}</p>
            <p className="text-sm text-gray-500 mt-1">Registration: {selectedCar.registrationNumber}</p>
          </div>
        </motion.div>

        {/* Selected Services */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaTools className="text-red-500" />
            Selected Services
          </h3>
          <div className="space-y-3 ml-8">
            {selectedServices.map((service) => (
              <div key={service.id} className="flex justify-between items-center">
                <div>
                  <p className="text-gray-700">{service.name}</p>
                  <p className="text-sm text-gray-500">{service.time}</p>
                </div>
                <p className="font-semibold">₹{service.price}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Schedule Details */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaClock className="text-red-500" />
            Schedule Details
          </h3>
          <div className="ml-8">
            <p className="text-gray-700">
              {format(schedule.date, 'EEEE, MMMM d, yyyy')}
            </p>
            <p className="text-gray-500">Appointment Time: {schedule.time}</p>
            <p className="text-sm text-gray-500 mt-1">
              Estimated Duration: {selectedServices.reduce((total, service) => {
                const [time, unit] = service.time.split(' ');
                const minutes = unit === 'hrs' ? parseInt(time) * 60 : parseInt(time);
                return total + minutes;
              }, 0)} minutes
            </p>
          </div>
        </motion.div>

        {/* Price Breakdown */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg shadow-sm p-4"
        >
          <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
            <FaMoneyBillWave className="text-red-500" />
            Price Details
          </h3>
          <div className="space-y-3 ml-8">
            <div className="flex justify-between">
              <p className="text-gray-600">Subtotal</p>
              <p>₹{calculateSubtotal()}</p>
            </div>
            <div className="flex justify-between">
              <p className="text-gray-600">GST (18%)</p>
              <p>₹{calculateTax(calculateSubtotal()).toFixed(2)}</p>
            </div>
            {selectedServices.length > 2 && (
              <div className="flex justify-between text-green-600">
                <p className="flex items-center gap-1">
                  <FaPercent className="text-sm" />
                  Multi-service Discount
                </p>
                <p>-₹{calculateDiscount(calculateSubtotal()).toFixed(2)}</p>
              </div>
            )}
            <div className="border-t pt-3 mt-3">
              <div className="flex justify-between font-semibold text-lg">
                <p>Total</p>
                <p>₹{calculateTotal().toFixed(2)}</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          onClick={() => setStep(3)}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={() => setStep(5)}
          className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Proceed to Payment
        </motion.button>
      </div>
    </div>
  );
};

export default BookingSummary;