import React, { useState, useEffect } from "react";
import { FaDatabase, FaFacebook, FaApple } from "react-icons/fa";
import { CiCircleQuestion } from "react-icons/ci";
import { FcGoogle } from "react-icons/fc";
import { BiFingerprint } from "react-icons/bi";
import { useAuth } from "../auth/AuthContext";
import { authService, userService } from "../services/apiService";
import { useNavigate } from "react-router-dom";

export const MyProfile = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, updateUser } = useAuth();
  const [toast, setToast] = useState("");
  const [loading, setLoading] = useState(true);
  const [profileData, setProfileData] = useState({
    email: "",
    name: "",
    firstName: "",
    lastName: "",
    phone: "",
    phoneCode: "+91"
  });

  useEffect(() => {
    const loadProfile = async () => {
      if (!isAuthenticated) {
        navigate('/login');
        return;
      }

      try {
        setLoading(true);
        const response = await authService.getProfile();
        // Backend returns { success: true, data: { user } } or { success: true, data: user }
        const userData = response.data?.user || response.user || response.data || user || {};
        
        // Parse name into first and last name
        const nameParts = (userData.name || "").split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setProfileData({
          email: userData.email || user?.email || "",
          name: userData.name || user?.name || "",
          firstName: firstName || "",
          lastName: lastName || "",
          phone: userData.phone || user?.phone || "",
          phoneCode: userData.phoneCode || user?.phoneCode || "+91"
        });
      } catch (error) {
        console.error('Failed to load profile:', error);
        // Use user from context as fallback
        if (user) {
          const nameParts = (user.name || "").split(" ");
          setProfileData({
            email: user.email || "",
            name: user.name || "",
            firstName: nameParts[0] || "",
            lastName: nameParts.slice(1).join(" ") || "",
            phone: user.phone || "",
            phoneCode: user.phoneCode || "+91"
          });
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, [isAuthenticated, user, navigate]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  const email = profileData.email;

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2000);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(email);
    showToast("Email copied succesfully!");
  };

  const handleSavePhone = async () => {
    try {
      if (!user?.id) {
        showToast("User not found. Please login again.");
        return;
      }

      await userService.updateUser(user.id, {
        phone: profileData.phone,
        phoneCode: profileData.phoneCode
      });
      showToast("Phone number saved!");
    } catch (error) {
      console.error('Failed to save phone:', error);
      showToast("Failed to save phone number. Please try again.");
    }
  };

  const handleChangePassword = () => {
    showToast(" Password change requested!");
  };

  const handleSaveProfile = async () => {
    try {
      if (!user?.id) {
        showToast("User not found. Please login again.");
        return;
      }

      const updatedData = {
        name: `${profileData.firstName} ${profileData.lastName}`.trim(),
        phone: profileData.phone,
        phoneCode: profileData.phoneCode
      };

      const result = await userService.updateUser(user.id, updatedData);
      showToast("Profile saved successfully!");
      
      // Update profile data from response
      const updatedUser = result.user || result.data?.user || result;
      if (updatedUser) {
        const nameParts = (updatedUser.name || "").split(" ");
        setProfileData({
          ...profileData,
          email: updatedUser.email || profileData.email,
          name: updatedUser.name || "",
          firstName: nameParts[0] || "",
          lastName: nameParts.slice(1).join(" ") || "",
          phone: updatedUser.phone || "",
          phoneCode: updatedUser.phoneCode || profileData.phoneCode
        });
        
        // Update auth context with latest user data
        const userToStore = {
          id: updatedUser.id || updatedUser._id || user.id,
          name: updatedUser.name,
          email: updatedUser.email,
          role: updatedUser.role || user.role,
          phone: updatedUser.phone || "",
          phoneCode: updatedUser.phoneCode || "+91"
        };
        
        // Update auth context
        if (updateUser) {
          updateUser(userToStore);
        } else {
          localStorage.setItem('user', JSON.stringify(userToStore));
        }
        
        // Reload profile from backend to get latest data
        try {
          const profileResponse = await authService.getProfile();
          const latestUser = profileResponse.data?.user || profileResponse.user || profileResponse.data;
          if (latestUser) {
            if (updateUser) {
              updateUser(latestUser);
            } else {
              localStorage.setItem('user', JSON.stringify(latestUser));
            }
          }
        } catch (error) {
          console.error('Failed to reload profile:', error);
        }
      }
    } catch (error) {
      console.error('Failed to save profile:', error);
      showToast("Failed to save profile. Please try again.");
    }
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
                value={profileData.firstName}
                onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                className="w-1/2 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-xs sm:text-sm md:text-base"
              />
              <input
                type="text"
                placeholder="Last name"
                value={profileData.lastName}
                onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                className="w-1/2 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-red-500 text-xs sm:text-sm md:text-base"
              />
            </div>

            {/* Phone */}
            <div>
              <div className="flex gap-1 sm:gap-2">
                <input
                  type="text"
                  placeholder="+91"
                  value={profileData.phoneCode}
                  onChange={(e) => setProfileData({ ...profileData, phoneCode: e.target.value })}
                  className="w-1/4 px-2 sm:px-3 py-2 sm:py-2.5 md:py-3 border rounded-lg focus:ring-2 focus:ring-sky-500 text-xs sm:text-sm md:text-base"
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
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
