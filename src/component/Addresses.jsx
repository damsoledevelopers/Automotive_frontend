import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from './Navbar';
import { FaMapMarkerAlt, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import AddAddressModal from './checkout/AddAddressModal';
import LocationConfirmModal from './checkout/LocationConfirmModal';

export const Addresses = () => {
  const navigate = useNavigate();
  const [addresses, setAddresses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [pendingAddressData, setPendingAddressData] = useState(null);

  // Load addresses from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('savedAddresses');
    if (saved) {
      setAddresses(JSON.parse(saved));
    }
  }, []);

  // Handler for when AddAddressModal wants to confirm location
  const handleNewAddressConfirmLocation = (addressFormData) => {
    setPendingAddressData(addressFormData);
    setShowAddModal(false);
    setShowLocationModal(true);
  };

  // After map confirmation, save address
  const handleConfirmLocation = () => {
    if (!pendingAddressData) return;

    const newAddress = {
      id: Date.now(),
      title: pendingAddressData.addressTitle || `${pendingAddressData.firstName}'s Address`,
      name: `${pendingAddressData.firstName} ${pendingAddressData.lastName}`,
      mobile: pendingAddressData.mobile,
      address: pendingAddressData.address,
      cityState: pendingAddressData.cityState,
      postalCode: pendingAddressData.postalCode,
    };

    // Add to addresses and save to localStorage
    setAddresses(prev => {
      const updated = [...prev, newAddress];
      localStorage.setItem('savedAddresses', JSON.stringify(updated));
      return updated;
    });

    // Reset and close modals
    setPendingAddressData(null);
    setShowLocationModal(false);
  };

  // Delete address
  const handleDeleteAddress = (addressId) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => {
        const updated = prev.filter(addr => addr.id !== addressId);
        localStorage.setItem('savedAddresses', JSON.stringify(updated));
        
        // Also remove from shippingAddress if it was selected
        const shippingAddress = localStorage.getItem('shippingAddress');
        if (shippingAddress) {
          const address = JSON.parse(shippingAddress);
          if (address.id === addressId) {
            localStorage.removeItem('shippingAddress');
          }
        }
        
        return updated;
      });
    }
  };

  // Set as default shipping address
  const handleSetDefault = (address) => {
    localStorage.setItem('shippingAddress', JSON.stringify(address));
    alert('Default shipping address updated!');
  };

  // Open Google Maps with address
  const handleOpenMap = (address) => {
    const fullAddress = `${address.address}, ${address.cityState}, ${address.postalCode}`;
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
    window.open(googleMapsUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
            My <span className="text-red-500">Addresses</span>
          </h1>
          <Navbar />
        </div>

        {/* Add Address Button */}
        <div className="mb-6">
          <button
            onClick={() => setShowAddModal(true)}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
          >
            <FaPlus />
            Add New Address
          </button>
        </div>

        {/* Addresses List */}
        {addresses.length === 0 ? (
          <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-6 bg-white rounded-xl shadow-sm py-20">
            <div className="text-6xl mb-4">📍</div>
            <h2 className="text-cyan-800 font-semibold text-2xl mb-4">
              No Address Added
            </h2>
            <p className="text-gray-700 mb-6">
              Save delivery address here and select it during Checkout
            </p>
            <button
              onClick={() => setShowAddModal(true)}
              className="bg-sky-400 hover:bg-sky-500 text-white rounded py-4 px-6 font-semibold transition-colors"
            >
              Add Address now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => {
              const isDefault = (() => {
                const shippingAddress = localStorage.getItem('shippingAddress');
                if (shippingAddress) {
                  const defaultAddr = JSON.parse(shippingAddress);
                  return defaultAddr.id === address.id;
                }
                return false;
              })();

              return (
                <div
                  key={address.id}
                  className={`bg-white rounded-lg shadow-sm border-2 p-6 ${
                    isDefault ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}
                >
                  {/* Address Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenMap(address)}
                        className="text-red-600 text-xl hover:text-red-700 transition-colors cursor-pointer"
                        title="Open in Google Maps"
                        style={{ color: '#EA4335' }}
                      >
                        <FaMapMarkerAlt />
                      </button>
                      <h3 className="font-semibold text-gray-800">
                        {address.title}
                      </h3>
                    </div>
                    {isDefault && (
                      <span className="px-2 py-1 bg-blue-500 text-white text-xs font-medium rounded">
                        Default
                      </span>
                    )}
                  </div>

                  {/* Address Details */}
                  <div className="space-y-2 mb-4">
                    <p className="text-sm text-gray-700 font-medium">
                      {address.name}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.mobile}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      {address.cityState}, {address.postalCode}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-4 border-t border-gray-200">
                    {!isDefault && (
                      <button
                        onClick={() => handleSetDefault(address)}
                        className="flex-1 px-4 py-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                      >
                        Set as Default
                      </button>
                    )}
                    <button
                      onClick={() => handleDeleteAddress(address.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Address"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Add Address Modal */}
      <AddAddressModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        onConfirmLocation={handleNewAddressConfirmLocation}
      />

      {/* Location Confirmation Modal */}
      <LocationConfirmModal
        isOpen={showLocationModal}
        onClose={() => {
          setShowLocationModal(false);
          setPendingAddressData(null);
        }}
        onConfirm={handleConfirmLocation}
        address={pendingAddressData}
      />
    </div>
  );
};
