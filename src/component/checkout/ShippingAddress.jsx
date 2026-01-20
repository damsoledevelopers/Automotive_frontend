import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FaShoppingCart, 
  FaMapMarkerAlt, 
  FaFileAlt, 
  FaCreditCard, 
  FaArrowLeft, 
  FaFileInvoice, 
  FaPlus, 
  FaCheck 
} from "react-icons/fa";
import LocationConfirmModal from "./LocationConfirmModal";
import AddAddressModal from "./AddAddressModal";
import WorkflowWrapper from "../workflow/WorkflowWrapper";

const ShippingAddress = () => {
  const navigate = useNavigate();
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showAddAddressModal, setShowAddAddressModal] = useState(false);
  const [showAddressSelection, setShowAddressSelection] = useState(false);
  const [isAddingNewAddress, setIsAddingNewAddress] = useState(false);
  const [pendingAddressData, setPendingAddressData] = useState(null);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    postalCode: "412406",
    cityState: "Pune, MAHARASHTRA, India",
    addressTitle: "",
  });

  // Load saved addresses from localStorage
  const [savedAddresses, setSavedAddresses] = useState(() => {
    const saved = localStorage.getItem('savedAddresses');
    return saved ? JSON.parse(saved) : [];
  });

  // Load selected address ID from localStorage
  const [selectedAddressId, setSelectedAddressId] = useState(() => {
    const saved = localStorage.getItem('shippingAddress');
    if (saved) {
      const address = JSON.parse(saved);
      return address.id || null;
    }
    return null;
  });

  // Get selected address object
  const selectedAddress = useMemo(() => {
    return savedAddresses.find(addr => addr.id === selectedAddressId);
  }, [savedAddresses, selectedAddressId]);

  // Auto-show address selection if addresses exist
  useEffect(() => {
    if (savedAddresses.length > 0 && !showAddressSelection) {
      setShowAddressSelection(true);
      if (!selectedAddressId && savedAddresses.length > 0) {
        setSelectedAddressId(savedAddresses[0].id);
      }
    }
  }, [savedAddresses.length, showAddressSelection, selectedAddressId]);

  // Handle form input changes
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);

  // Handle form submission - opens map confirmation
  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    setShowLocationModal(true);
  }, []);

  // Handler for when AddAddressModal wants to confirm location
  const handleNewAddressConfirmLocation = useCallback((addressFormData) => {
    setPendingAddressData(addressFormData);
    setIsAddingNewAddress(true);
    setShowAddAddressModal(false);
    setShowLocationModal(true);
  }, []);

  // After map confirmation, save address and show selection page
  const handleConfirmLocation = useCallback(() => {
    const dataToUse = isAddingNewAddress ? pendingAddressData : formData;
    
    const newAddress = {
      id: Date.now(),
      title: dataToUse.addressTitle || `${dataToUse.firstName}'s Address`,
      name: `${dataToUse.firstName} ${dataToUse.lastName}`,
      mobile: dataToUse.mobile,
      address: dataToUse.address,
      cityState: dataToUse.cityState,
      postalCode: dataToUse.postalCode,
    };

    setSavedAddresses(prev => {
      const updated = [...prev, newAddress];
      localStorage.setItem('savedAddresses', JSON.stringify(updated));
      return updated;
    });
    
    setSelectedAddressId(newAddress.id);
    setIsAddingNewAddress(false);
    setPendingAddressData(null);
    setShowLocationModal(false);
    
    if (!showAddressSelection) {
      setShowAddressSelection(true);
    }
  }, [isAddingNewAddress, pendingAddressData, formData, showAddressSelection]);

  // Final proceed from address selection page
  const handleFinalProceed = useCallback(() => {
    if (selectedAddress) {
      localStorage.setItem('shippingAddress', JSON.stringify(selectedAddress));
      navigate('/checkout/review');
    }
  }, [selectedAddress, navigate]);

  // Handle back navigation
  const handleBack = useCallback(() => {
    if (showAddressSelection) {
      setShowAddressSelection(false);
    } else {
      navigate('/cart');
    }
  }, [showAddressSelection, navigate]);

  // Open Google Maps with address
  const handleOpenMap = useCallback((address, e) => {
    e?.stopPropagation();
    const fullAddress = `${address.address}, ${address.cityState}, ${address.postalCode}`;
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`, '_blank');
  }, []);

  // Progress Bar Component
  // ProgressBar removed - using WorkflowWrapper instead

  // Address Card Component
  const AddressCard = React.memo(({ address, index, isSelected, onSelect, onOpenMap }) => (
    <motion.div 
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: -100 }}
      transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.03, y: -8, rotate: 0.5 }}
      className={`border rounded-lg p-3 sm:p-4 cursor-pointer transition-all relative overflow-hidden ${
        isSelected
          ? 'border-gray-900 bg-gray-50' 
          : 'border-gray-200 hover:border-gray-400 bg-white hover:bg-gray-50'
      }`}
      onClick={() => onSelect(address.id)}
    >
      {isSelected && (
        <motion.div
          className="absolute top-2 right-2 w-6 h-6 bg-gray-900 rounded-full flex items-center justify-center"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          <FaCheck className="text-white text-xs" />
        </motion.div>
      )}
      <div className="flex items-start gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={(e) => onOpenMap(address, e)}
          className="text-xl mt-1 flex-shrink-0 hover:opacity-80 transition-colors cursor-pointer"
          title="Open in Google Maps"
          style={{ color: '#EA4335' }}
        >
          <FaMapMarkerAlt />
        </motion.button>
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800 mb-2">
            {address.title}
          </h3>
          <p className="text-xs text-gray-600 mb-1">
            {address.name} - {address.mobile}
          </p>
          <p className="text-xs text-gray-600">
            {address.address}, {address.cityState}, {address.postalCode}
          </p>
        </div>
      </div>
      <AnimatePresence>
        {isSelected && (
          <motion.button 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="w-full py-2 bg-gray-900 text-white text-xs font-medium hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
          >
            <FaCheck />
            SELECTED ADDRESS
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  ));

  // Show Address Selection Page (after map confirmation)
  if (showAddressSelection) {
    return (
      <WorkflowWrapper currentStep="address">
        <div className="bg-gray-50 py-3 pb-16">
          <div className="max-w-6xl mx-auto px-4">

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-3"
          >
            <h1 className="text-xl md:text-2xl font-semibold text-gray-900 mb-1">
              Shipping Address
            </h1>
            <p className="text-gray-600 text-sm">Select or add a delivery address</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
          >
            <AnimatePresence mode="popLayout">
              {savedAddresses.map((address, index) => (
                <AddressCard 
                  key={address.id} 
                  address={address} 
                  index={index}
                  isSelected={selectedAddressId === address.id}
                  onSelect={setSelectedAddressId}
                  onOpenMap={handleOpenMap}
                />
              ))}
            </AnimatePresence>

            {/* Add New Address Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: savedAddresses.length * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border-2 border-dashed border-gray-300 rounded-lg p-3 sm:p-4 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center min-h-[150px] bg-white group"
              onClick={() => setShowAddAddressModal(true)}
            >
              <motion.div 
                whileHover={{ rotate: 90 }}
                transition={{ type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4 relative z-10"
              >
                <FaPlus className="text-gray-700 text-2xl font-bold" />
              </motion.div>
              <p className="text-sm text-gray-700 font-medium relative z-10">Add New Address</p>
            </motion.div>

            {/* Register as Business Card */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: (savedAddresses.length + 1) * 0.1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="border border-gray-200 rounded-lg p-3 sm:p-4 cursor-pointer hover:border-gray-400 hover:bg-gray-50 transition-all flex flex-col items-center justify-center min-h-[150px] bg-white"
            >
              <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                <FaFileInvoice className="text-gray-700 text-2xl" />
              </div>
              <p className="text-sm text-gray-700 font-medium text-center">
                Register as Business with <span className="font-semibold">Sparelo.com</span>
              </p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex justify-between items-center pt-4 border-t border-gray-200 pb-4"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleBack}
              className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium bg-white"
            >
              <FaArrowLeft />
              Back
            </motion.button>
            <motion.button
              whileHover={selectedAddress ? { scale: 1.02 } : {}}
              whileTap={selectedAddress ? { scale: 0.98 } : {}}
              onClick={handleFinalProceed}
              disabled={!selectedAddress}
              className={`px-8 py-3 rounded-lg text-sm font-medium transition-colors ${
                selectedAddress
                  ? 'bg-gray-900 text-white hover:bg-gray-800'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Proceed
            </motion.button>
          </motion.div>
        </div>

        <AddAddressModal
          isOpen={showAddAddressModal}
          onClose={() => setShowAddAddressModal(false)}
          onConfirmLocation={handleNewAddressConfirmLocation}
        />
        </div>
      </WorkflowWrapper>
    );
  }

  // Show Form Entry Page (initial state)
  return (
    <WorkflowWrapper currentStep="address">
      <div className="bg-gray-50 py-3 pb-4">
        <div className="max-w-6xl mx-auto px-4">

        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-lg md:text-xl font-semibold text-gray-900 mb-3"
        >
          Shipping Address
        </motion.h1>

        <div className="flex flex-col lg:flex-row gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex-1 bg-white border border-gray-200 p-4 md:p-5 overflow-hidden"
          >
            <div className="bg-gray-900 -m-4 md:-m-5 mb-4 md:mb-5 p-4 md:p-5 text-white">
              <h2 className="text-lg md:text-xl font-semibold mb-0.5">Delivery Information</h2>
              <p className="text-gray-300 text-xs">Enter your shipping details</p>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-900 mb-3">
                  Contact Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      required
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white hover:border-gray-400 text-sm"
                    />
                  </motion.div>
                  <motion.div
                    whileFocus={{ scale: 1.02 }}
                    className="relative"
                  >
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      required
                      className="w-full px-4 py-2.5 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 transition-all bg-white hover:border-gray-400 text-sm"
                    />
                  </motion.div>
                </div>

                <div className="flex gap-2">
                  <div className="w-20">
                    <input
                      type="text"
                      value="+91"
                      readOnly
                      className="w-full px-3 py-2.5 border border-gray-300 rounded-lg bg-gray-100 text-center font-medium text-sm"
                    />
                  </div>
                  <div className="flex-1">
                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="Mobile"
                      required
                      pattern="[0-9]{10}"
                      maxLength="10"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <h2 className="text-base font-semibold text-gray-900 mb-3">
                  Address
                </h2>
                
                <div className="mb-3">
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Address"
                    required
                    rows="3"
                    maxLength="110"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 resize-y text-sm"
                  />
                  <div className="text-right text-xs text-gray-500 mt-1">
                    {formData.address.length}/110
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-3">
                  <div>
                    <input
                      type="text"
                      name="postalCode"
                      value={formData.postalCode}
                      onChange={handleChange}
                      placeholder="Postal Code"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                  <div>
                    <input
                      type="text"
                      name="cityState"
                      value={formData.cityState}
                      onChange={handleChange}
                      placeholder="City, State, Country"
                      required
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    name="addressTitle"
                    value={formData.addressTitle}
                    onChange={handleChange}
                    placeholder="Address Title (Optional)"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-gray-500 text-sm"
                  />
                </div>
              </div>

              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="flex justify-between items-center pt-4 border-t border-gray-200 pb-2"
              >
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBack}
                  className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium"
                >
                  <FaArrowLeft />
                  Back
                </motion.button>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-sm font-medium"
                >
                  Proceed
                </motion.button>
              </motion.div>
            </form>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:w-80 flex-shrink-0"
          >
            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="bg-white border border-gray-200 p-6"
            >
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FaFileInvoice className="text-gray-700 text-2xl" />
                </div>
                <h3 className="text-base font-semibold text-gray-800 mb-2">
                  Register as Business with{" "}
                  <span className="text-gray-900">Sparelo.com</span>
                </h3>
                <p className="text-xs text-gray-600 mb-4">
                  Get exclusive business benefits and bulk pricing
                </p>
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors text-xs font-medium"
                >
                  Register Now
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <LocationConfirmModal
        isOpen={showLocationModal}
        onClose={() => {
          setShowLocationModal(false);
          if (isAddingNewAddress) {
            setIsAddingNewAddress(false);
            setPendingAddressData(null);
          }
        }}
        onConfirm={handleConfirmLocation}
        address={isAddingNewAddress ? pendingAddressData : formData}
      />
      </div>
    </WorkflowWrapper>
  );
};

export default ShippingAddress;
