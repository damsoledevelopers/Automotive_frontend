import React, { useState } from "react";

export const Company_GST = () => {
  const [address, setAddress] = useState("");

  return (
    <div className="px-3 sm:px-6 md:px-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-10 py-4 sm:py-6 md:py-10 pb-2 sm:pb-3">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-700 mb-2 sm:mb-3 md:mb-0">
          Company <span className="text-red-500">/GST</span>
        </h1>
     
      </div>

      {/* Title */}
      <h2 className="text-base sm:text-lg md:text-2xl font-semibold text-red-500 mb-4 sm:mb-5 md:mb-6 px-2 sm:px-4">
        Billing information
      </h2>

      {/* Form */}
      <form className="space-y-4 sm:space-y-6 md:space-y-8 max-w-2xl px-2 sm:px-4">
        {/* Company + Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Company name"
            className="border rounded px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 w-full focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
          />
          <div className="flex gap-1 sm:gap-2">
            <span className="flex items-center border rounded px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-gray-100 text-xs sm:text-sm md:text-base">
              +91
            </span>
            <input
              type="text"
              placeholder="Mobile"
              className="border rounded px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 w-full focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
            />
          </div>
        </div>

        {/* GST Number */}
        <div>
          <input
            type="text"
            placeholder="GST number"
            className="border rounded px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 w-full focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
          />
          <label className="flex items-center gap-2 mt-2 text-gray-600 text-xs sm:text-sm">
            <input type="checkbox" className="h-3 w-3 sm:h-4 sm:w-4" />
            My company is not GST registered
          </label>
        </div>

        {/* Address */}
        <div>
          <textarea
            placeholder="Address"
            maxLength={110}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border rounded px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 w-full min-h-[80px] sm:min-h-[100px] resize focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
          />
          <p className="text-xs text-gray-500 text-right mt-1">
            {address.length}/110
          </p>
        </div>

        {/* Pincode + Country */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
          <input
            type="text"
            placeholder="Pincode"
            className="border rounded px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 w-full focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
          />
          <input
            type="text"
            value="India"
            readOnly
            className="border rounded px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 w-full bg-gray-100 text-xs sm:text-sm md:text-base"
          />
        </div>

        {/* Address Title */}
        <input
          type="text"
          placeholder="Address Title (Optional)"
          className="border rounded px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 w-full focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
        />

        {/* Save Button */}
        <button
          type="submit"
          className="bg-sky-400 hover:bg-sky-500 text-white px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded font-semibold text-xs sm:text-sm md:text-base"
        >
          Save
        </button>
      </form>
    </div>
  );
};
