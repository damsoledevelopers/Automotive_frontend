import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useBooking } from './BookingContext';
import { FaClock, FaCalendarAlt, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { format, addDays, isToday, isTomorrow, startOfToday } from 'date-fns';

const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
  '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
];

const ScheduleSelector = () => {
  const { state, setSchedule, setStep } = useBooking();
  const [selectedDate, setSelectedDate] = useState(startOfToday());
  const [selectedTime, setSelectedTime] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);

  useEffect(() => {
    // Generate next 7 days
    const dates = Array.from({ length: 7 }, (_, i) => addDays(startOfToday(), i));
    setAvailableDates(dates);
  }, []);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null); // Reset time when date changes
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
    setSchedule({
      date: selectedDate,
      time: time,
    });
  };

  const formatDateLabel = (date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    return format(date, 'EEE, MMM d');
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Schedule Service</h2>

      {/* Date Selection */}
      <div className="mb-8">
        <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
          <FaCalendarAlt className="text-red-500" />
          Select Date
        </h3>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {availableDates.map((date) => (
            <motion.button
              key={date.toString()}
              onClick={() => handleDateSelect(date)}
              className={`flex-shrink-0 p-4 rounded-lg border ${
                selectedDate?.toString() === date.toString()
                  ? 'border-red-500 bg-red-50'
                  : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <p className="text-sm font-medium">{formatDateLabel(date)}</p>
              <p className="text-lg font-bold">{format(date, 'd')}</p>
              <p className="text-xs text-gray-500">{format(date, 'MMM')}</p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      <AnimatePresence mode="wait">
        {selectedDate && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
              <FaClock className="text-red-500" />
              Select Time
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {TIME_SLOTS.map((time) => (
                <motion.button
                  key={time}
                  onClick={() => handleTimeSelect(time)}
                  className={`p-4 rounded-lg border ${
                    selectedTime === time
                      ? 'border-red-500 bg-red-50'
                      : 'border-gray-200 hover:border-red-500 hover:bg-red-50'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {time}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Selected Schedule Summary */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-8 p-4 bg-gray-50 rounded-lg"
        >
          <h3 className="font-semibold mb-2">Selected Schedule</h3>
          <p className="text-gray-600">
            {formatDateLabel(selectedDate)} at {selectedTime}
          </p>
          <p className="text-sm text-gray-500 mt-1">
            Estimated duration: {state.selectedServices.reduce((total, service) => {
              const [time, unit] = service.time.split(' ');
              const minutes = unit === 'hrs' ? parseInt(time) * 60 : parseInt(time);
              return total + minutes;
            }, 0)} minutes
          </p>
        </motion.div>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-8">
        <motion.button
          onClick={() => setStep(2)}
          className="px-6 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Back
        </motion.button>
        <motion.button
          onClick={() => setStep(4)}
          disabled={!selectedDate || !selectedTime}
          className={`px-6 py-2 rounded-lg text-white ${
            !selectedDate || !selectedTime
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-red-500 hover:bg-red-600'
          }`}
          whileHover={selectedDate && selectedTime ? { scale: 1.02 } : {}}
          whileTap={selectedDate && selectedTime ? { scale: 0.98 } : {}}
        >
          Continue
        </motion.button>
      </div>
    </div>
  );
};

export default ScheduleSelector;