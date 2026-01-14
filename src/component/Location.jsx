import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaMapMarkerAlt, FaPlus, FaEdit, FaTrash, FaCheck, FaTimes, FaHome, FaBuilding, FaWarehouse } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const Location = () => {
  const navigate = useNavigate();
  const [locations, setLocations] = useState([
    { id: 1, type: 'Home', address: 'A Block Bol, Swastik Residacy', isDefault: true },
    { id: 2, type: 'Office', address: '123 Business Park, Sector 5', isDefault: false },
    { id: 3, type: 'Garage', address: 'Auto Service Center, Main Road', isDefault: false },
  ]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingLocation, setEditingLocation] = useState(null);
  const [newLocation, setNewLocation] = useState({ type: 'Home', address: '', isDefault: false });

  const getLocationIcon = (type) => {
    switch (type) {
      case 'Home':
        return <FaHome className="text-xl" />;
      case 'Office':
        return <FaBuilding className="text-xl" />;
      case 'Garage':
        return <FaWarehouse className="text-xl" />;
      default:
        return <FaMapMarkerAlt className="text-xl" />;
    }
  };

  const handleAddLocation = () => {
    if (newLocation.address.trim()) {
      const location = {
        id: Date.now(),
        ...newLocation,
        isDefault: locations.length === 0 || newLocation.isDefault
      };
      
      if (location.isDefault) {
        setLocations(prev => prev.map(loc => ({ ...loc, isDefault: false })));
      }
      
      setLocations(prev => [...prev, location]);
      setNewLocation({ type: 'Home', address: '', isDefault: false });
      setShowAddModal(false);
    }
  };

  const handleEditLocation = (location) => {
    setEditingLocation(location);
    setNewLocation({ ...location });
    setShowAddModal(true);
  };

  const handleUpdateLocation = () => {
    if (newLocation.address.trim()) {
      setLocations(prev => prev.map(loc => 
        loc.id === editingLocation.id 
          ? { ...newLocation, isDefault: newLocation.isDefault ? (prev.find(l => l.id === editingLocation.id)?.isDefault || false) : loc.isDefault }
          : newLocation.isDefault ? { ...loc, isDefault: false } : loc
      ));
      setEditingLocation(null);
      setNewLocation({ type: 'Home', address: '', isDefault: false });
      setShowAddModal(false);
    }
  };

  const handleDeleteLocation = (id) => {
    if (window.confirm('Are you sure you want to delete this location?')) {
      const location = locations.find(loc => loc.id === id);
      setLocations(prev => {
        const updated = prev.filter(loc => loc.id !== id);
        if (location.isDefault && updated.length > 0) {
          updated[0].isDefault = true;
        }
        return updated;
      });
    }
  };

  const handleSetDefault = (id) => {
    setLocations(prev => prev.map(loc => ({
      ...loc,
      isDefault: loc.id === id
    })));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-900 mb-4 flex items-center gap-2 transition-colors"
          >
            <span>←</span> Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900">
                Saved <span className="text-red-500">Locations</span>
              </h1>
              <p className="text-gray-600 mt-2 text-sm sm:text-base">
                Manage your delivery and service locations
              </p>
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setEditingLocation(null);
                setNewLocation({ type: 'Home', address: '', isDefault: false });
                setShowAddModal(true);
              }}
              className="bg-red-500 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-semibold flex items-center gap-2 hover:bg-red-600 transition-colors shadow-lg"
            >
              <FaPlus />
              <span className="hidden sm:inline">Add Location</span>
              <span className="sm:hidden">Add</span>
            </motion.button>
          </div>
        </div>

        {/* Locations List */}
        <div className="space-y-4">
          {locations.map((location, index) => (
            <motion.div
              key={location.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white rounded-xl shadow-lg p-4 sm:p-6 border-2 ${
                location.isDefault ? 'border-red-500' : 'border-gray-200'
              } hover:shadow-xl transition-all`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <div className={`p-3 rounded-full ${
                    location.isDefault ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getLocationIcon(location.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900">{location.type}</h3>
                      {location.isDefault && (
                        <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-semibold">
                          DEFAULT
                        </span>
                      )}
                    </div>
                    <p className="text-sm sm:text-base text-gray-600 mb-3">{location.address}</p>
                    {!location.isDefault && (
                      <button
                        onClick={() => handleSetDefault(location.id)}
                        className="text-xs sm:text-sm text-red-600 hover:text-red-700 font-medium"
                      >
                        Set as Default
                      </button>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => handleEditLocation(location)}
                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Edit"
                  >
                    <FaEdit />
                  </motion.button>
                  {!location.isDefault && (
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleDeleteLocation(location.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <FaTrash />
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {locations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FaMapMarkerAlt className="text-6xl text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No locations saved</h3>
            <p className="text-gray-500 mb-6">Add your first location to get started</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAddModal(true)}
              className="bg-red-500 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-600 transition-colors"
            >
              Add Location
            </motion.button>
          </motion.div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {showAddModal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
              onClick={() => {
                setShowAddModal(false);
                setEditingLocation(null);
                setNewLocation({ type: 'Home', address: '', isDefault: false });
              }}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 sm:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                    {editingLocation ? 'Edit Location' : 'Add New Location'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingLocation(null);
                      setNewLocation({ type: 'Home', address: '', isDefault: false });
                    }}
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    <FaTimes className="text-xl" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Location Type
                    </label>
                    <select
                      value={newLocation.type}
                      onChange={(e) => setNewLocation({ ...newLocation, type: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500"
                    >
                      <option value="Home">Home</option>
                      <option value="Office">Office</option>
                      <option value="Garage">Garage</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Address
                    </label>
                    <textarea
                      value={newLocation.address}
                      onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
                      placeholder="Enter complete address..."
                      rows="3"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-red-500 resize-none"
                    />
                  </div>

                  {!editingLocation && (
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="default"
                        checked={newLocation.isDefault}
                        onChange={(e) => setNewLocation({ ...newLocation, isDefault: e.target.checked })}
                        className="w-4 h-4 text-red-500 rounded focus:ring-red-500"
                      />
                      <label htmlFor="default" className="text-sm text-gray-700">
                        Set as default location
                      </label>
                    </div>
                  )}

                  <div className="flex gap-3 pt-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        setShowAddModal(false);
                        setEditingLocation(null);
                        setNewLocation({ type: 'Home', address: '', isDefault: false });
                      }}
                      className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={editingLocation ? handleUpdateLocation : handleAddLocation}
                      className="flex-1 px-4 py-3 bg-red-500 text-white rounded-xl font-semibold hover:bg-red-600 transition-colors flex items-center justify-center gap-2"
                    >
                      <FaCheck />
                      {editingLocation ? 'Update' : 'Add'} Location
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Location;

