import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";

const LocationConfirmModal = ({ isOpen, onClose, onConfirm, address }) => {
  // Full address string
  const fullAddress = address && address.address
    ? `${address.address}, ${address.postalCode}, ${address.cityState}`
    : "MV5W+Q69, Alandi Rd, Chovisawadi, Charholi Budruk, Pune, Maharashtra 412105, India";

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-800">
                Confirm Your Delivery Location
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Address Display */}
            <div className="p-4 border-b border-gray-200 bg-gray-50">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-xl mt-1 flex-shrink-0" style={{ color: '#EA4335' }} />
                <p className="text-gray-700 text-sm leading-relaxed">
                  {fullAddress}
                </p>
              </div>
            </div>

            {/* Google Map */}
            <div className="flex-1 relative" style={{ minHeight: "400px" }}>
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: "400px" }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src={`https://www.google.com/maps?q=${encodeURIComponent(fullAddress)}&output=embed&zoom=15`}
                title="Delivery Location Map"
              ></iframe>
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-200 flex justify-end">
              <motion.button
                onClick={onConfirm}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Confirm
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LocationConfirmModal;
