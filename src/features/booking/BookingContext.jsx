import React, { createContext, useContext, useReducer } from 'react';

const BookingContext = createContext(null);

const initialState = {
  selectedCar: null,
  selectedServices: [],
  schedule: null,
  totalPrice: 0,
  step: 1,
};

const bookingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_CAR':
      return { ...state, selectedCar: action.payload };
    case 'ADD_SERVICE':
      const newServices = [...state.selectedServices, action.payload];
      const newTotal = newServices.reduce((sum, service) => sum + service.price, 0);
      return {
        ...state,
        selectedServices: newServices,
        totalPrice: newTotal,
      };
    case 'REMOVE_SERVICE':
      const filteredServices = state.selectedServices.filter(
        (service) => service.id !== action.payload
      );
      const updatedTotal = filteredServices.reduce((sum, service) => sum + service.price, 0);
      return {
        ...state,
        selectedServices: filteredServices,
        totalPrice: updatedTotal,
      };
    case 'SET_SCHEDULE':
      return { ...state, schedule: action.payload };
    case 'SET_STEP':
      return { ...state, step: action.payload };
    case 'RESET_BOOKING':
      return initialState;
    default:
      return state;
  }
};

export const BookingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(bookingReducer, initialState);

  const value = {
    state,
    setCar: (car) => dispatch({ type: 'SET_CAR', payload: car }),
    addService: (service) => dispatch({ type: 'ADD_SERVICE', payload: service }),
    removeService: (serviceId) =>
      dispatch({ type: 'REMOVE_SERVICE', payload: serviceId }),
    setSchedule: (schedule) => dispatch({ type: 'SET_SCHEDULE', payload: schedule }),
    setStep: (step) => dispatch({ type: 'SET_STEP', payload: step }),
    resetBooking: () => dispatch({ type: 'RESET_BOOKING' }),
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};