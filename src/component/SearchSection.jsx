import React, { useState, useEffect, useMemo, useCallback } from "react";
import { FaSearch, FaCar, FaMotorcycle, FaTimes, FaChevronDown, FaEdit, FaTrash, FaPlus } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useVehicle } from "../contexts/VehicleContext";
import { useNavigate } from "react-router-dom";
import { 
  getVehicleMakers, 
  getModelsForMaker, 
  getYearsForModel, 
  getModificationsForYear,
  getVehicleImageUrl
} from "../data/vehicleData";
import { categories } from "./SearchByCategory";

export const SearchSection = ({ onClose, initialVehicle = null }) => {
  const { addVehicle, updateVehicle, removeVehicle, vehicles } = useVehicle();
  const navigate = useNavigate();
  
  // Modal states
  const [showVehicleTypeModal, setShowVehicleTypeModal] = useState(false);
  const [showAddVehicleModal, setShowAddVehicleModal] = useState(false);
  const [vehicleType, setVehicleType] = useState(""); // "car" or "twoWheeler"
  const [editingVehicle, setEditingVehicle] = useState(null);
  const [vehicleToDelete, setVehicleToDelete] = useState(null);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);
  const [spareType, setSpareType] = useState('new'); // 'new' or 'used'
  
  // Form states
  const [selectedMaker, setSelectedMaker] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedModification, setSelectedModification] = useState("");
  const [numberPlate, setNumberPlate] = useState("");
  const [vin, setVin] = useState("");
  const [models, setModels] = useState([]);
  const [years, setYears] = useState([]);
  const [modifications, setModifications] = useState([]);

  // Get all vehicles sorted by creation date (most recent first)
  const sortedVehicles = useMemo(() => {
    return [...vehicles]
      .sort((a, b) => {
        const dateA = new Date(a.createdAt || a.updatedAt || 0);
        const dateB = new Date(b.createdAt || b.updatedAt || 0);
        return dateB - dateA;
      });
  }, [vehicles]);

  // Extract engine info from variant (if available)
  const getEngineInfo = (variant) => {
    const engineMatch = variant?.match(/(\d+\.?\d*L)/i);
    return engineMatch ? engineMatch[1] : 'N/A';
  };

  // Get vehicle image
  const getVehicleImage = (make, model) => {
    const imageUrl = getVehicleImageUrl(make, model);
    return imageUrl || 'https://via.placeholder.com/100x60?text=Car';
  };

  // HandleNew Spares
  const handleOemServiceKit = (vehicle) => {
    const params = new URLSearchParams({
      maker: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mod: vehicle.variant || '',
    });
    navigate(`/oem-service-kit?${params.toString()}`);
  };

  // HandleUsed Spares
  const handleAftermarketServiceKit = (vehicle) => {
    const params = new URLSearchParams({
      maker: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mod: vehicle.variant || '',
    });
    navigate(`/aftermarket-service-kit?${params.toString()}`);
  };

  // Handle View OEM Catalog
  const handleViewOemCatalog = (vehicle) => {
    const params = new URLSearchParams({
      maker: vehicle.make,
      model: vehicle.model,
      year: vehicle.year,
      mod: vehicle.variant || '',
    });
    navigate(`/oem-catalog?${params.toString()}`);
  };

  // Handle Category Click from Modal
  const handleCategoryClick = useCallback((categoryHref) => {
    // Navigate to category with spare type filter
    const url = `${categoryHref}?spareType=${spareType}`;
    navigate(url);
    setShowCategoriesModal(false);
  }, [spareType, navigate]);

  // Handle Edit Vehicle
  const handleEdit = (vehicle) => {
    setEditingVehicle(vehicle);
    setShowVehicleTypeModal(false);
    setTimeout(() => {
      setShowAddVehicleModal(true);
    }, 200);
  };

  // Handle Delete Vehicle
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


  // Pre-fill form when editing (when initialVehicle or editingVehicle is provided)
  useEffect(() => {
    const vehicleToEdit = initialVehicle || editingVehicle;
    if (vehicleToEdit) {
      setSelectedMaker(vehicleToEdit.make || "");
      setNumberPlate(vehicleToEdit.registrationNumber || "");
      setVin(vehicleToEdit.vin || "");
      setSelectedYear(vehicleToEdit.year || "");
      setSelectedModification(vehicleToEdit.variant || "");
      setVehicleType(vehicleToEdit.type || "car");
      
      if (vehicleToEdit.make) {
        const makerModels = getModelsForMaker(vehicleToEdit.make, vehicleToEdit.type || 'car');
        setModels(makerModels);
        setSelectedModel(vehicleToEdit.model || "");
        
        if (vehicleToEdit.model) {
          const modelYears = getYearsForModel(vehicleToEdit.make, vehicleToEdit.model, vehicleToEdit.type || 'car');
          setYears(modelYears);
          
          if (vehicleToEdit.year) {
            const yearModifications = getModificationsForYear(
              vehicleToEdit.make, 
              vehicleToEdit.model, 
              parseInt(vehicleToEdit.year),
              vehicleToEdit.type || 'car'
            );
            setModifications(yearModifications);
          }
        }
      }
    } else {
      // Reset form if not editing
      setSelectedMaker("");
      setSelectedModel("");
      setSelectedYear("");
      setSelectedModification("");
      setNumberPlate("");
      setVin("");
      setModels([]);
      setYears([]);
      setModifications([]);
      setVehicleType("");
    }
  }, [initialVehicle, editingVehicle]);

  const handleVehicleTypeSelect = (type) => {
    setVehicleType(type);
    setShowVehicleTypeModal(false);
    // Small delay for smooth transition
    setTimeout(() => {
      setShowAddVehicleModal(true);
    }, 200);
  };

  const handleMakerChange = (e) => {
    const maker = e.target.value;
    setSelectedMaker(maker);
    const makerModels = getModelsForMaker(maker, vehicleType);
    setModels(makerModels);
    setSelectedModel("");
    setSelectedYear("");
    setYears([]);
    setModifications([]);
    setSelectedModification("");
  };

  const handleModelChange = (e) => {
    const model = e.target.value;
    setSelectedModel(model);
    const modelYears = getYearsForModel(selectedMaker, model, vehicleType);
    setYears(modelYears);
    setSelectedYear("");
    setModifications([]);
    setSelectedModification("");
  };

  const handleYearChange = (e) => {
    const year = e.target.value;
    setSelectedYear(year);
    const yearModifications = getModificationsForYear(selectedMaker, selectedModel, parseInt(year), vehicleType);
    setModifications(yearModifications);
    setSelectedModification("");
  };

  const handleSaveVehicle = () => {
    if (!selectedMaker || !selectedModel || !selectedYear || !selectedModification) {
      alert(`Please select ${vehicleType || "Car"} Maker, Model, Year, and Modification`);
      return;
    }

    const vehicleData = {
      make: selectedMaker,
      model: selectedModel,
      variant: selectedModification,
      year: selectedYear.toString(),
      registrationNumber: numberPlate.trim() || undefined,
      vin: vin.trim() || undefined,
      type: vehicleType || "car",
    };

    // Update or add vehicle
    const vehicleToEdit = initialVehicle || editingVehicle;
    if (vehicleToEdit) {
      updateVehicle(vehicleToEdit.id, vehicleData);
      alert(`Vehicle updated successfully!\n${selectedMaker} ${selectedModel} ${selectedModification} (${selectedYear})`);
      setEditingVehicle(null);
    } else {
      addVehicle(vehicleData);
      alert(`${vehicleType === "car" ? "Car" : "Two Wheeler"} saved successfully!\n${selectedMaker} ${selectedModel} ${selectedModification} (${selectedYear})`);
    }

    // Reset form
    setSelectedMaker("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedModification("");
    setNumberPlate("");
    setVin("");
    setModels([]);
    setYears([]);
    setModifications([]);
    setShowAddVehicleModal(false);
    setVehicleType("");

    // Close modal if onClose is provided (for Garage.jsx usage)
    if (onClose) {
      onClose();
    }
  };

  const handleCloseAddVehicleModal = () => {
    setShowAddVehicleModal(false);
    setVehicleType("");
    setEditingVehicle(null);
    // Reset form when closing
    setSelectedMaker("");
    setSelectedModel("");
    setSelectedYear("");
    setSelectedModification("");
    setNumberPlate("");
    setVin("");
    setModels([]);
    setYears([]);
    setModifications([]);
  };

  return (
    <>
      <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-50 pt-12 pb-3 sm:pt-16 md:pt-16 sm:pb-6 md:pb-8">
        <div className="w-full mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          {/* Title Section - Aligned with Header */}
         
          {/* Vehicle Cards Grid */}
          {sortedVehicles.length === 0 ? (
            <div className="flex justify-center mb-6 sm:mb-8 md:mb-10">
              <button
                onClick={() => setShowVehicleTypeModal(true)}
                className="w-full max-w-md bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-md border border-gray-200 p-6 flex flex-col items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md">
                  <FaPlus className="text-white text-lg" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-gray-900 text-lg">Add Vehicle</div>
                  <div className="text-sm text-gray-500">Add your car or bike to get personalized results</div>
                </div>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap justify-center items-start gap-2 sm:gap-3 md:gap-4 lg:gap-5 mb-3 sm:mb-4 md:mb-6 lg:mb-8">
              {/* Vehicle Cards */}
              {sortedVehicles.map((vehicle) => (
                <motion.div 
                  key={vehicle.id} 
                  className="w-[calc((100%-2*0.5rem)/3)] sm:w-[calc((100%-1*0.75rem)/2)] md:w-[240px] lg:w-[220px] xl:w-[200px] bg-white rounded-lg sm:rounded-xl shadow-md hover:shadow-xl overflow-hidden border border-gray-200 hover:border-blue-400 transition-all duration-300 group flex flex-col"
                  style={{ height: 'calc(24*0.25rem + 80px)' }}
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Vehicle Image - Clickable */}
                  <div 
                    onClick={() => setShowCategoriesModal(true)}
                    className="relative h-24 sm:h-28 md:h-32 lg:h-36 xl:h-40 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-1 sm:p-1.5 md:p-2 lg:p-3 overflow-hidden cursor-pointer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <img
                      src={getVehicleImage(vehicle.make, vehicle.model)}
                      alt={`${vehicle.make} ${vehicle.model}`}
                      className="max-w-full max-h-full object-contain relative z-10 transform group-hover:scale-105 transition-transform duration-300"
                      onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/300x200?text=Vehicle';
                      }}
                    />
                    {/* Edit and Delete Icons */}
                    <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex gap-1 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleEdit(vehicle);
                        }}
                        className="bg-blue-500 hover:bg-blue-600 text-white p-1 sm:p-1.5 rounded-full transition-all shadow-md"
                        title="Edit"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaEdit className="text-[8px] sm:text-[10px] md:text-xs" />
                      </motion.button>
                      <motion.button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDelete(vehicle);
                        }}
                        className="bg-red-500 hover:bg-red-600 text-white p-1 sm:p-1.5 rounded-full transition-all shadow-md"
                        title="Delete"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTrash className="text-[8px] sm:text-[10px] md:text-xs" />
                      </motion.button>
                    </div>
                    {/* Vehicle Type Badge */}
                    <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 z-20">
                      <span className={`px-1.5 sm:px-2 py-0.5 rounded-full text-[7px] sm:text-[8px] md:text-[9px] font-bold ${
                        vehicle.type === 'twoWheeler' 
                          ? 'bg-orange-500 text-white' 
                          : 'bg-blue-500 text-white'
                      }`}>
                        {vehicle.type === 'twoWheeler' ? 'BIKE' : 'CAR'}
                      </span>
                    </div>
                  </div>

                  {/* Vehicle Details */}
                  <div className="p-2 sm:p-2.5 md:p-3 bg-white flex flex-col justify-between min-h-[80px] sm:min-h-[85px] md:min-h-[90px]">
                    <h3 className="text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-bold text-blue-900 mb-1 sm:mb-1.5 uppercase line-clamp-1">
                      {vehicle.make} {vehicle.model}
                    </h3>
                    <div className="space-y-0.5 sm:space-y-0.5 md:space-y-1 text-[8px] sm:text-[9px] md:text-[10px] lg:text-xs text-gray-600">
                      <p className="font-medium text-gray-700 truncate">
                        <span className="text-blue-600 font-semibold">{getEngineInfo(vehicle.variant)}</span> / {vehicle.variant || 'N/A'}
                      </p>
                      <p className="flex items-center gap-1">
                        <span className="font-medium text-gray-500">Year:</span>
                        <span className="text-gray-800 font-bold">{vehicle.year}</span>
                      </p>
                      {vehicle.registrationNumber && (
                        <p className="truncate text-gray-600 text-[8px] sm:text-[9px]">
                          <span className="font-medium">Reg:</span> {vehicle.registrationNumber}
                        </p>
                      )}
                      {vehicle.vin && (
                        <p className="truncate text-gray-600 text-[7px] sm:text-[8px] md:text-[9px]">
                          <span className="font-medium">VIN:</span> {vehicle.vin}
                        </p>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Add New Vehicle Card */}
              <div 
                onClick={() => setShowVehicleTypeModal(true)}
                className="w-[calc((100%-2*0.5rem)/3)] sm:w-[calc((100%-1*0.75rem)/2)] md:w-[240px] lg:w-[220px] xl:w-[200px] bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-lg sm:rounded-xl shadow-md border border-gray-200 hover:shadow-lg transition-all cursor-pointer flex flex-col items-center justify-center p-3 sm:p-4 md:p-6"
                style={{ height: 'calc(24*0.25rem + 80px)' }}
              >
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-md mb-2 sm:mb-3">
                  <FaPlus className="text-white text-base sm:text-lg" />
                </div>
                <div className="text-center">
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-0.5 sm:mb-1">Add New</h3>
                  <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-900 mb-1 sm:mb-1.5">Vehicle</h3>
                  <p className="text-[8px] sm:text-[9px] md:text-[10px] lg:text-sm text-gray-500 leading-tight">Add your car or bike to get personalized results</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Vehicle Type Selection Modal - Compact & Attractive Design */}
      <AnimatePresence>
        {showVehicleTypeModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setShowVehicleTypeModal(false)}
            >
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 10 }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 400,
                  duration: 0.25
                }}
                className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-xl shadow-2xl p-6 sm:p-8 max-w-md w-full border border-blue-100 relative overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Subtle Background  */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                  <div className="absolute inset-0" style={{
                    backgroundImage: `radial-gradient(circle at 1px 1px, rgba(14,65,150,0.03) 1px, transparent 0)`,
                    backgroundSize: '20px 20px'
                  }}></div>
                </div>

                {/* Close Button */}
                <button
                  onClick={() => setShowVehicleTypeModal(false)}
                  className="absolute top-3 right-3 text-gray-600 hover:text-gray-800 p-1.5 rounded-lg hover:bg-white/30 transition-all duration-200 z-10"
                  aria-label="Close modal"
                >
                  <FaTimes className="text-lg" />
                </button>

                {/* Compact Header */}
                <div className="relative z-10 mb-5">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-1 tracking-tight">
                    Select Vehicle Type
                  </h3>
                  <p className="text-sm text-gray-600">Choose whether you want to add a car or a bike</p>
                </div>

                {/* Compact Vehicle Type Cards */}
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {/* Car Option */}
                  <button
                    onClick={() => handleVehicleTypeSelect("car")}
                    className="flex items-center gap-4 px-4 py-5 rounded-lg bg-gradient-to-r from-blue-50 to-white border border-blue-100 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center shadow-md">
                      <FaCar className="text-white text-[18px]" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-base">Car</div>
                    </div>
                  </button>

                  {/* Two Wheeler Option */}
                  <button
                    onClick={() => handleVehicleTypeSelect("twoWheeler")}
                    className="flex items-center gap-4 px-4 py-5 rounded-lg bg-gradient-to-r from-blue-50 to-white border border-blue-100 transition-all duration-200"
                  >
                    <div className="w-12 h-12 rounded-md bg-gradient-to-br from-orange-400 to-orange-500 flex items-center justify-center shadow-md">
                      <FaMotorcycle className="text-white text-[18px]" />
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900 text-base">Two Wheeler</div>
                    </div>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Add Vehicle Form Modal - Horizontal Layout */}
      <AnimatePresence>
        {showAddVehicleModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex items-center justify-center p-4"
              onClick={handleCloseAddVehicleModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0, y: 50 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="bg-gradient-to-br from-white via-blue-50 to-blue-100 rounded-2xl shadow-2xl p-6 md:p-8 max-w-5xl w-full relative max-h-[90vh] overflow-y-auto font-sans text-slate-800"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Close Button */}
                <button
                  onClick={handleCloseAddVehicleModal}
                  className="absolute top-4 right-4 text-blue-700 hover:text-blue-900 p-2 z-10"
                >
                  <FaTimes className="text-xl" />
                </button>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-extrabold text-blue-900 mb-6 text-center">
                  {editingVehicle ? "Edit" : "Add"} {vehicleType === "car" ? "Car" : vehicleType === "twoWheeler" ? "Two Wheeler" : "Vehicle"}
                </h3>

                {/* Number Plate Input */}
                <div className="mb-6">
                  <h4 className="text-lg mb-2 text-blue-900">Find your {vehicleType === "car" ? "car" : "vehicle"} by Number Plate:</h4>
                  <div className="flex items-center border border-gray-200 rounded-lg px-3 py-2 shadow-sm bg-white">
                    <span className="bg-gray-100 px-3 py-2 rounded-l text-sm text-slate-700">IND</span>
                    <input
                      type="text"
                      placeholder="DL1AA2345"
                      value={numberPlate}
                      onChange={(e) => setNumberPlate(e.target.value)}
                      className="flex-1 px-3 py-2 outline-none text-slate-800 bg-transparent"
                    />
                    <FaSearch className="text-blue-600 text-xl cursor-pointer" />
                  </div>
                </div>

                <p className="text-gray-500 my-4 text-center">OR</p>

                {/* Horizontal Row of Dropdowns */}
                <div className="flex flex-wrap items-center justify-center gap-3 md:gap-4 mb-6">
                  {/* Car Maker - White Background */}
                  <div className="flex-1 min-w-[150px] md:min-w-[180px]">
                    <select
                      className="w-full px-4 py-3 md:py-4 rounded-lg border border-gray-200 bg-white text-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                      value={selectedMaker}
                      onChange={handleMakerChange}
                    >
                      <option value="">Select {vehicleType === "car" ? "Car" : "Two Wheeler"} Maker</option>
                      {getVehicleMakers(vehicleType).map((maker) => (
                        <option key={maker} value={maker}>
                          {maker}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Model - Light Gray Background */}
                  <div className="flex-1 min-w-[150px] md:min-w-[180px]">
                    <select
                      className="w-full px-4 py-3 md:py-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                      value={selectedModel}
                      onChange={handleModelChange}
                      disabled={!selectedMaker}
                    >
                      <option value="">Select Model</option>
                      {models.map((model) => (
                        <option key={model} value={model}>
                          {model}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year - Light Gray Background */}
                  <div className="flex-1 min-w-[150px] md:min-w-[180px]">
                    <select
                      className="w-full px-4 py-3 md:py-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                      value={selectedYear}
                      onChange={handleYearChange}
                      disabled={!selectedModel}
                    >
                      <option value="">Select Year</option>
                      {years.map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Modification - Light Gray Background */}
                  <div className="flex-1 min-w-[150px] md:min-w-[180px]">
                    <select
                      className="w-full px-4 py-3 md:py-4 rounded-lg border border-gray-200 bg-gray-100 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all text-sm md:text-base"
                      value={selectedModification}
                      onChange={(e) => setSelectedModification(e.target.value)}
                      disabled={!selectedYear}
                    >
                      <option value="">Select Modification</option>
                      {modifications.map((mod) => (
                        <option key={mod} value={mod}>
                          {mod}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Search Parts Button - Light Gray Background */}
                  <motion.button
                    onClick={handleSaveVehicle}
                    className="px-6 md:px-8 py-3 md:py-4 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold hover:from-blue-700 hover:to-blue-600 transition-colors text-sm md:text-base whitespace-nowrap"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                  Add Vehicle
                  </motion.button>
                </div>

                {/* VIN Input */}
                <div className="mt-6">
                  <input
                    type="text"
                    placeholder="Enter VIN (Optional)"
                    value={vin}
                    onChange={(e) => setVin(e.target.value)}
                    className="w-full border px-4 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm md:text-base"
                  />
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Delete Vehicle Confirmation Modal */}
      <AnimatePresence>
        {vehicleToDelete && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={cancelDelete}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-8 w-[90%] md:w-[500px] shadow-2xl relative"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={cancelDelete}
                className="absolute top-4 right-4 text-gray-800 hover:text-red-600 text-xl font-bold transition-colors"
              >
                <FaTimes className="text-2xl" />
              </button>

              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                <span className="text-blue-800">Delete</span>{' '}
                <span className="text-blue-400">Vehicle</span>
              </h2>

              <p className="text-blue-800 font-bold text-lg mb-4">
                {vehicleToDelete.make} {vehicleToDelete.model} {getEngineInfo(vehicleToDelete.variant)} {vehicleToDelete.variant || ''} {vehicleToDelete.year}
              </p>

              <p className="text-gray-700 text-base mb-8">
                Are you sure that you want to delete this vehicle?
              </p>

              <button
                onClick={confirmDelete}
                className="w-full bg-blue-400 hover:bg-blue-500 text-white font-semibold py-4 px-6 rounded-lg text-lg transition-all shadow-md hover:shadow-lg transform hover:scale-[1.02]"
              >
                Delete
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Categories Modal with Spare Type Filter */}
      <AnimatePresence>
        {showCategoriesModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/70 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setShowCategoriesModal(false)}
            >
              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                transition={{ 
                  type: "spring", 
                  damping: 30, 
                  stiffness: 400,
                  duration: 0.25
                }}
                className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl w-full max-w-6xl max-h-[90vh] overflow-hidden flex flex-col border border-gray-200"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div className="px-4 sm:px-6 md:px-8 py-5 sm:py-6 border-b border-gray-200 bg-gray-50">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">
                        All Categories
                      </h2>
                      <p className="text-sm sm:text-base text-gray-600 font-medium">
                        Browse through all available product categories
                      </p>
                    </div>
                    <motion.button
                      onClick={() => setShowCategoriesModal(false)}
                      className="text-gray-400 hover:text-gray-600 p-2.5 rounded-xl hover:bg-gray-100 transition-all duration-300"
                      aria-label="Close modal"
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <FaTimes className="text-xl sm:text-2xl" />
                    </motion.button>
                  </div>

                  {/* Spare Type Filter Buttons */}
                  <div className="flex gap-3 sm:gap-4">
                    <motion.button
                      onClick={() => setSpareType('new')}
                      className={`flex-1 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                        spareType === 'new'
                          ? 'bg-gray-900 text-white shadow-lg border-2 border-gray-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      New Spares
                    </motion.button>
                    <motion.button
                      onClick={() => setSpareType('used')}
                      className={`flex-1 px-5 sm:px-7 py-3 sm:py-3.5 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 ${
                        spareType === 'used'
                          ? 'bg-gray-900 text-white shadow-lg border-2 border-gray-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border-2 border-gray-200'
                      }`}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Used Spares
                    </motion.button>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-600 mt-4 font-medium">
                    Showing <span className="text-gray-900 font-bold">{spareType === 'new' ? 'new' : 'used'}</span> spare parts for selected categories
                  </p>
                </div>

                {/* Categories Grid - Scrollable */}
                <div className="flex-1 overflow-y-auto px-4 sm:px-6 md:px-8 py-5 sm:py-6 bg-white">
                  {/* Custom Scrollbar */}
                  <style>{`
                    .categories-scroll::-webkit-scrollbar {
                      width: 8px;
                    }
                    .categories-scroll::-webkit-scrollbar-track {
                      background: rgba(229, 231, 235, 0.5);
                      border-radius: 10px;
                    }
                    .categories-scroll::-webkit-scrollbar-thumb {
                      background: linear-gradient(to bottom, #9ca3af, #6b7280);
                      border-radius: 10px;
                    }
                    .categories-scroll::-webkit-scrollbar-thumb:hover {
                      background: linear-gradient(to bottom, #6b7280, #4b5563);
                    }
                  `}</style>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4 md:gap-5 categories-scroll">
                    {categories.map((cat, index) => (
                      <motion.div
                        key={cat.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.03 }}
                        onClick={() => handleCategoryClick(cat.href)}
                        className="group flex flex-col items-center transition-all duration-300 cursor-pointer"
                        whileHover={{ y: -4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mb-2 flex items-center justify-center">
                          <img 
                            src={cat.img} 
                            alt={cat.title} 
                            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300" 
                            onError={(e) => {
                              e.target.src = `https://via.placeholder.com/80x80/9ca3af/ffffff?text=${cat.title.substring(0, 2)}`;
                            }}
                            loading="lazy"
                          />
                        </div>
                        <span className="text-center font-medium text-gray-800 text-[10px] sm:text-xs md:text-sm">
                          {cat.title}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default SearchSection;
