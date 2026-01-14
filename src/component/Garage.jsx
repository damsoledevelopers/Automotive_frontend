import React, { useState } from 'react'

import { useVehicle } from '../contexts/VehicleContext'
import { FaEdit, FaTrash, FaPlus, FaTimes } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { getVehicleImageUrl } from '../data/vehicleData'
import { SearchSection } from './SearchSection'

export const Garage = () => {
  const { vehicles, removeVehicle } = useVehicle();
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [selectedVehicleForServiceKit, setSelectedVehicleForServiceKit] = useState(null);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);

  const handleDelete = (vehicle) => {
    setVehicleToDelete(vehicle);
  };

  const confirmDelete = () => {
    if (vehicleToDelete) {
      removeVehicle(vehicleToDelete.id);
      setVehicleToDelete(null);
    }
  };

  const cancelDelete = () => {
    setVehicleToDelete(null);
  };

  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowAddModal(true);
  };

  // Get car image from vehicle data (boodmo.com format)
  const getCarImage = (make, model) => {
    // Try to get image from vehicle data
    const imageUrl = getVehicleImageUrl(make, model);
    if (imageUrl) {
      return imageUrl;
    }
    
    // Fallback placeholder if image not found
    return 'https://via.placeholder.com/300x200?text=Car';
  };

  // Extract engine info from variant (if available)
  const getEngineInfo = (variant) => {
    // Try to extract engine info from variant string
    const engineMatch = variant?.match(/(\d+\.?\d*L)/i);
    return engineMatch ? engineMatch[1] : 'N/A';
  };

  // Format vehicle name for service kit
  const getVehicleDisplayName = (vehicle) => {
    const engineInfo = getEngineInfo(vehicle.variant);
    return `${vehicle.make} ${vehicle.model} ${engineInfo} ${vehicle.variant || ''}`.trim();
  };

  const handleOpenServiceKit = (vehicle) => {
    setSelectedVehicleForServiceKit(vehicle);
  };

  const handleOemServiceKit = () => {
    if (selectedVehicleForServiceKit) {
      const params = new URLSearchParams({
        maker: selectedVehicleForServiceKit.make,
        model: selectedVehicleForServiceKit.model,
        year: selectedVehicleForServiceKit.year,
        mod: selectedVehicleForServiceKit.variant || '',
      });
      navigate(`/oem-service-kit?${params.toString()}`);
      setSelectedVehicleForServiceKit(null);
    }
  };

  const handleAftermarketServiceKit = () => {
    if (selectedVehicleForServiceKit) {
      const params = new URLSearchParams({
        maker: selectedVehicleForServiceKit.make,
        model: selectedVehicleForServiceKit.model,
        year: selectedVehicleForServiceKit.year,
        mod: selectedVehicleForServiceKit.variant || '',
      });
      navigate(`/aftermarket-service-kit?${params.toString()}`);
      setSelectedVehicleForServiceKit(null);
    }
  };

  return (
    <div className="px-3 sm:px-4 md:px-10 py-4 sm:py-6 md:py-10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6 md:mb-8">
        <h1 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-800">
          My <span className="text-red-500">Garage</span>
        </h1>
     
      </div>

      {vehicles.length === 0 ? (
        <div className="flex flex-col justify-center items-center min-h-[50vh] sm:min-h-[55vh] md:min-h-[60vh] text-center px-4 sm:px-6">
          <h2 className="text-cyan-800 font-semibold text-base sm:text-lg md:text-3xl mb-3 sm:mb-4">No Cars Added</h2>
          <p className="text-gray-700 mb-4 sm:mb-5 md:mb-6 text-xs sm:text-sm md:text-base">
            Save your cars to My Garage and find spare parts for them in the catalogue with just one click!
          </p>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-red-500 hover:bg-red-600 text-white rounded py-2 sm:py-2.5 md:py-3 px-4 sm:px-5 md:px-6 font-semibold text-xs sm:text-sm md:text-base"
          >
            Add Cars Now
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-2 sm:gap-3.5 md:gap-4">
          {/* Vehicle Cards */}
          {vehicles.map((vehicle) => (
            <div key={vehicle.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
              {/* Car Image */}
              <div className="relative h-32 sm:h-36 md:h-40 bg-white flex items-center justify-center p-1.5 sm:p-2">
                <img
                  src={getCarImage(vehicle.make, vehicle.model)}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  className="max-w-full max-h-full object-contain"
                  onError={(e) => {
                    // Fallback to placeholder if image fails to load
                    e.target.src = 'https://via.placeholder.com/300x200?text=Car';
                  }}
                />
                {/* Edit and Delete Icons */}
                <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 flex gap-0.5 sm:gap-1">
                  <button
                    onClick={() => handleEdit(vehicle)}
                    className="bg-blue-500 text-white p-1 sm:p-1.5 rounded-full hover:bg-blue-600 transition-colors shadow-md"
                    title="Edit"
                  >
                    <FaEdit className="text-[8px] sm:text-[10px] md:text-xs" />
                  </button>
                  <button
                    onClick={() => handleDelete(vehicle)}
                    className="bg-red-500 text-white p-1 sm:p-1.5 rounded-full hover:bg-red-600 transition-colors shadow-md"
                    title="Delete"
                  >
                    <FaTrash className="text-[8px] sm:text-[10px] md:text-xs" />
                  </button>
                </div>
              </div>

              {/* Car Details */}
              <div className="p-2 sm:p-2.5 md:p-3">
                <h3 className="text-xs sm:text-sm font-bold text-blue-900 mb-1 sm:mb-1.5 uppercase line-clamp-1">
                  {vehicle.make} {vehicle.model}
                </h3>
                <div className="space-y-0.5 text-[10px] sm:text-xs text-gray-600 mb-2 sm:mb-2.5 md:mb-3">
                  <p className="font-medium truncate">{getEngineInfo(vehicle.variant)} / {vehicle.variant || 'N/A'}</p>
                  <p>Model Year: {vehicle.year}</p>
                  {vehicle.registrationNumber && (
                    <p className="truncate">Reg: {vehicle.registrationNumber}</p>
                  )}
                  {vehicle.vin && (
                    <p className="truncate">VIN: {vehicle.vin}</p>
                  )}
                </div>
                <button 
                  onClick={() => handleOpenServiceKit(vehicle)}
                  className="w-full border-2 border-gray-400 text-gray-600 py-1 sm:py-1.5 rounded-md text-[10px] sm:text-xs font-semibold hover:bg-blue-50 transition-colors uppercase"
                >
                  OPEN SERVICE KIT
                </button>
              </div>
            </div>
          ))}

          {/* Add New Car Card */}
          <div 
            onClick={() => setShowAddModal(true)}
            className="bg-white rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-blue-400 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center min-h-[200px] sm:min-h-[240px] md:min-h-[280px]"
          >
            <div className="text-center p-3 sm:p-4">
              <FaPlus className="text-3xl sm:text-3.5xl md:text-4xl text-blue-400 mx-auto mb-1.5 sm:mb-2" />
              <h3 className="text-xs sm:text-sm font-bold text-gray-800">Add New Car</h3>
            </div>
          </div>
        </div>
      )}

      {/* Add/Edit Car Modal */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-lg p-6 w-[90%] md:w-[50%] lg:w-[30%] shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-600 hover:text-black text-xl font-bold"
              onClick={() => {
                setShowAddModal(false);
                setEditingVehicle(null);
              }}
            >
              ✖
            </button>
            <SearchSection 
              onClose={() => {
                setShowAddModal(false);
                setEditingVehicle(null);
              }}
              initialVehicle={editingVehicle}
            />
          </div>
        </div>
      )}

      {/* Open Service Kit Modal */}
      {selectedVehicleForServiceKit && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 w-[90%] md:w-[500px] shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedVehicleForServiceKit(null)}
              className="absolute top-4 right-4 text-gray-800 hover:text-red-600 text-xl font-bold transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-3">
              <span className="text-blue-800">Open</span>{' '}
              <span className="text-blue-400">Service Kit</span>
            </h2>

            {/* Vehicle Info */}
            <p className="text-gray-700 text-base mb-8 font-medium">
              For {getVehicleDisplayName(selectedVehicleForServiceKit)}
            </p>

            {/* Service Kit Buttons */}
            <div className="space-y-4">
              <button
                onClick={handleOemServiceKit}
                className="w-full bg-red-100 hover:bg-blue-200 text-blue-700 font-semibold py-4 px-6 rounded-lg text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                OEM SERVICE KIT
              </button>
              
              <button
                onClick={handleAftermarketServiceKit}
                className="w-full bg-red-100 hover:bg-blue-200 text-blue-700 font-semibold py-4 px-6 rounded-lg text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                AFTERMARKET SERVICE KIT
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Car Confirmation Modal */}
      {vehicleToDelete && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 backdrop-blur-sm">
          <div className="bg-white rounded-xl p-8 w-[90%] md:w-[500px] shadow-2xl relative">
            {/* Close Button */}
            <button
              onClick={cancelDelete}
              className="absolute top-4 right-4 text-blue-800 hover:text-blue-600 text-xl font-bold transition-colors"
            >
              <FaTimes className="text-2xl" />
            </button>

            {/* Title */}
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-blue-800">Delete</span>{' '}
              <span className="text-blue-400">Car</span>
            </h2>

            {/* Vehicle Info */}
            <p className="text-blue-800 font-bold text-lg mb-4">
              {vehicleToDelete.make} {vehicleToDelete.model} {getEngineInfo(vehicleToDelete.variant)} {vehicleToDelete.variant || ''} {vehicleToDelete.year}
            </p>

            {/* Confirmation Question */}
            <p className="text-gray-700 text-base mb-8">
              Are you sure that you want to delete this car?
            </p>

            {/* Delete Button */}
            <button
              onClick={confirmDelete}
              className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
            >
              Delete
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
