import React, { useState } from "react";
import { FaDatabase, FaFacebook, FaApple } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BiFingerprint } from "react-icons/bi";


export const MyProfile = () => {
  const [toast, setToast] = useState("");
  const email = "abc@gmail.com";

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    showToast("Email copied succesfully!");
  };

  const handleSavePhone = () => {
    showToast("Phone number saved!");
  };

  const handleChangePassword = () => {
    showToast(" Password change requested!");
  };

  const handleSaveProfile = () => {
    showToast("Profile saved!");
  };

  const handlePurchase = () => {
    showToast("Points purchased!");
  };

  return (
    <section className="px-3 sm:px-6 md:px-10 bg-white min-h-screen relative">

      {toast && (
        <div className="fixed top-5 right-5 bg-gray-900 text-white px-2 sm:px-4 py-1 sm:py-2 rounded-lg shadow-lg animate-fade-in-out text-xs sm:text-sm">
          {toast}
        </div>
      )}

      {/* Page Header */}
     <div className="flex flex-col md:flex-row md:items-center md:justify-between border-t-2 mb-4 sm:mb-6 md:mb-8 px-2 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 pb-2 sm:pb-3">
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 mb-2 sm:mb-3 md:mb-0">
          My <span className="text-red-500">Profile</span>
        </h1>
       
      </div>

      <div>
        <h2 className="text-base sm:text-lg md:text-2xl text-cyan-800 font-semibold px-2 sm:px-4">
          Personal Information
        </h2>
      </div>

      <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 py-4 sm:py-6">
        {/* Personal Information */}
        <div className="bg-white shadow rounded-lg p-3 sm:p-4 md:p-6">
          <h2 className="text-sm sm:text-base md:text-lg font-semibold text-gray-700 mb-3 sm:mb-4">
            Personal Information
          </h2>

          <form className="space-y-2 sm:space-y-3 md:space-y-4">
            <div>
              <div className="flex items-center gap-1 sm:gap-2">
                <input
                  type="email"
                  defaultValue={email}
                  className="flex-1 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg text-gray-400 focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
                  readOnly
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm border rounded-lg text-red-400 hover:bg-red-500 hover:text-white"
                >
                  Copy
                </button>
              </div>
            </div>

            {/* Name Fields */}
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <input
                type="text"
                placeholder="First name"
                className="w-1/2 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-xs sm:text-sm md:text-base"
              />
              <input
                type="text"
                placeholder="Last name"
                className="w-1/2 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-xs sm:text-sm md:text-base"
              />
            </div>

            {/* Phone */}
            <div>
              <div className="flex gap-1 sm:gap-2">
                <input
                  type="text"
                  placeholder="+91"
                  className="w-1/4 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  className="flex-1 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
                />
                <button
                  type="button"
                  onClick={handleSavePhone}
                  className="px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 text-xs sm:text-sm"
                >
                  Save
                </button>
              </div>
            </div>

            {/* Notification Preferences */}
            <a href="#" className="text-sky-600 text-xs sm:text-sm py-2 sm:py-3 hover:underline">
              Notification preferences
            </a>

            {/* Action Buttons */}
            <div className="flex gap-2 sm:gap-3 md:gap-4">
              <button
                type="button"
                onClick={handleChangePassword}
                className="px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 border rounded-lg hover:bg-red-400 text-xs sm:text-sm"
              >
                Change Password
              </button>
              <button
                type="button"
                onClick={handleSaveProfile}
                className="px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 rounded-lg bg-red-500 text-white font-medium hover:bg-red-600 text-xs sm:text-sm"
              >
                Save
              </button>
            </div>
          </form>
        </div>

        {/* Right Side: Points + Profile Connections */}
        <div className="space-y-4 sm:space-y-5 md:space-y-6">
          {/* Points */}
          <div className="bg-white shadow rounded-lg p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-red-700 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
              Profile Connections <CiCircleQuestion className="text-sm sm:text-base md:text-lg" />
            </h2>
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2">
              <span className="text-gray-800 font-medium text-xs sm:text-sm md:text-base flex items-center gap-1"> <FaDatabase className="text-xs sm:text-sm" />0 Points</span>
              <select className="px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg text-xs sm:text-sm md:text-base flex-1">
                <option>30 Points (₹2.3/point) - ₹69</option>
                <option>300 Points (₹ 1/point) - ₹299</option>
                <option>1000 Points (₹0.8/point) - ₹799</option>
                <option>5000 Points (₹0.7/point) - ₹3,499</option>
                <option>10000 Points (₹0.6/point) - ₹6,499</option>
                <option>30000 Points (₹0.5/point) - ₹15,999</option>
              </select>
              <button
                type="button"
                onClick={handlePurchase}
                className="px-3 sm:px-4 py-2 sm:py-2.5 md:py-3 rounded-lg bg-red-500 text-white hover:bg-red-600 text-xs sm:text-sm"
              >
                Purchase
              </button>
            </div>
            <a
              href="#"
              className="text-sky-600 text-xs sm:text-sm hover:underline block mt-2"
            >
              Check usage history
            </a>
          </div>

          {/* Profile Connections */}
          <div className="bg-white shadow rounded-lg p-3 sm:p-4 md:p-6">
            <h2 className="text-base sm:text-lg md:text-xl font-semibold text-blue-700 mb-3 sm:mb-4 flex items-center gap-1 sm:gap-2">
              Profile Connections <CiCircleQuestion className="text-sm sm:text-base md:text-lg" />
            </h2>

            <div className="flex gap-4 sm:gap-6 md:gap-10 text-xl sm:text-2xl md:text-3xl text-gray-600">
              <FcGoogle className="hover:scale-110 border transition cursor-pointer" />
              <FaFacebook className="hover:text-blue-600 hover:scale-110 border transition cursor-pointer" />
              <FaApple className="hover:text-red-600 hover:scale-110 border transition cursor-pointer" />
              <BiFingerprint className="hover:text-red-600 hover:scale-110 border transition cursor-pointer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
