import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, USER_ROLES } from "../auth/AuthContext";
import createAccountOffice from "../assets/img/create-account-office.jpeg";
import createAccountOfficeDark from "../assets/img/create-account-office-dark.jpeg";
import { FaBuilding, FaCreditCard, FaStore, FaBox, FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Signup = () => {
  const navigate = useNavigate();
  const { register, loading, error } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    agreeToTerms: false,
    // Vendor-specific fields
    businessName: "",
    businessRegistrationNumber: "",
    businessAddress: "",
    businessCity: "",
    businessState: "",
    businessPincode: "",
    gstNumber: "",
    panNumber: "",
    bankAccountNumber: "",
    bankIFSC: "",
    bankName: "",
    accountHolderName: "",
    storeName: "",
    storeDescription: "",
    productCategories: []
  });
  const [localError, setLocalError] = useState("");
  
  const isVendor = formData.role === USER_ROLES.VENDOR;
  const totalSteps = isVendor ? 5 : 1;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const prevRole = formData.role;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Reset step if role changes
    if (name === 'role' && prevRole !== value) {
      setCurrentStep(1);
    }
    
    setLocalError("");
  };

  const handleCategoryToggle = (category) => {
    setFormData(prev => ({
      ...prev,
      productCategories: prev.productCategories.includes(category)
        ? prev.productCategories.filter(c => c !== category)
        : [...prev.productCategories, category]
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        if (!formData.name || !formData.email || !formData.password || !formData.role) {
          setLocalError("All fields are required");
          return false;
        }
        if (formData.password.length < 6) {
          setLocalError("Password must be at least 6 characters");
          return false;
        }
        if (formData.password !== formData.confirmPassword) {
          setLocalError("Passwords do not match");
          return false;
        }
        if (!formData.agreeToTerms) {
          setLocalError("You must agree to the privacy policy");
          return false;
        }
        return true;
      case 2:
        if (!formData.businessName || !formData.businessRegistrationNumber || !formData.businessAddress || 
            !formData.businessCity || !formData.businessState || !formData.businessPincode) {
          setLocalError("All business details are required");
          return false;
        }
        return true;
      case 3:
        if (!formData.bankAccountNumber || !formData.bankIFSC || !formData.bankName || !formData.accountHolderName) {
          setLocalError("All bank details are required");
          return false;
        }
        return true;
      case 4:
        if (!formData.storeName || !formData.storeDescription) {
          setLocalError("Store name and description are required");
          return false;
        }
        return true;
      case 5:
        if (formData.productCategories.length === 0) {
          setLocalError("Please select at least one product category");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
      setLocalError("");
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
    setLocalError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!validateStep(currentStep)) {
      return;
    }

    // If not on last step, go to next step
    if (currentStep < totalSteps) {
      handleNext();
      return;
    }

    // Final submission
    try {
      const userData = {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        role: formData.role
      };

      // Add vendor-specific data if vendor
      if (isVendor) {
        userData.vendorDetails = {
          businessName: formData.businessName,
          businessRegistrationNumber: formData.businessRegistrationNumber,
          businessAddress: formData.businessAddress,
          businessCity: formData.businessCity,
          businessState: formData.businessState,
          businessPincode: formData.businessPincode,
          gstNumber: formData.gstNumber,
          panNumber: formData.panNumber,
          bankAccountNumber: formData.bankAccountNumber,
          bankIFSC: formData.bankIFSC,
          bankName: formData.bankName,
          accountHolderName: formData.accountHolderName,
          storeName: formData.storeName,
          storeDescription: formData.storeDescription,
          productCategories: formData.productCategories
        };
      }

      const user = await register(userData.name, userData.email, userData.password, userData.role);
      
      // Store vendor details in localStorage if vendor
      if (isVendor && userData.vendorDetails) {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const userIndex = users.findIndex(u => u.email === userData.email);
        if (userIndex !== -1) {
          users[userIndex].vendorDetails = userData.vendorDetails;
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
      
      // Navigate to appropriate dashboard based on role
      const dashboardPaths = {
        [USER_ROLES.CUSTOMER]: "/",
        [USER_ROLES.VENDOR]: "/vendor/dashboard",
        [USER_ROLES.MECHANICS]: "/mechanics/dashboard",
        [USER_ROLES.GARAGE]: "/garage/dashboard",
        [USER_ROLES.SHIPPING]: "/shipping/dashboard",
        [USER_ROLES.SUPER_ADMIN]: "/admin/dashboard"
      };
      
      navigate(dashboardPaths[formData.role] || "/");
    } catch (err) {
      setLocalError(err.message || "Registration failed. Please try again.");
    }
  };

  const displayError = localError || error;

  const productCategoriesList = [
    "Engine Parts",
    "Brake System",
    "Suspension",
    "Electrical",
    "Body Parts",
    "Interior Accessories",
    "Exterior Accessories",
    "Tires & Wheels",
    "Filters",
    "Lights & Lighting",
    "Cooling System",
    "Transmission"
  ];

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h1 className="mb-4 text-2xl font-bold text-primary-600">Create Account</h1>
            {displayError && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-xs">
                {displayError}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field text-sm py-2"
                  required
                  minLength={6}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Account Type</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="input-field text-sm py-2"
                  required
                >
                  <option value="">Select account type</option>
                  <option value={USER_ROLES.CUSTOMER}>Customer</option>
                  <option value={USER_ROLES.VENDOR}>Vendor</option>
                  <option value={USER_ROLES.MECHANICS}>Mechanics</option>
                  <option value={USER_ROLES.GARAGE}>Garage</option>
                  <option value={USER_ROLES.SHIPPING}>Shipping</option>
                  <option value={USER_ROLES.SUPER_ADMIN}>Super Admin</option>
                </select>
              </div>
              <div className="mt-2">
                <label className="inline-flex items-center text-xs text-gray-600 cursor-pointer">
                  <input
                    type="checkbox"
                    name="agreeToTerms"
                    checked={formData.agreeToTerms}
                    onChange={handleChange}
                    className="form-checkbox text-primary-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                  <span className="ml-2">
                    I agree to the{" "}
                    <a href="/privacy-policy" className="text-primary-600 hover:underline">
                      privacy policy
                    </a>{" "}
                    and{" "}
                    <a href="/terms-of-use" className="text-primary-600 hover:underline">
                      terms of use
                    </a>
                  </span>
                </label>
              </div>
              {!isVendor && (
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>
              )}
              {isVendor && (
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary w-full flex items-center justify-center gap-2 text-sm py-2"
                >
                  Next: Business Details <FaChevronRight />
                </button>
              )}
            </form>
          </>
        );
      
      case 2:
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <FaBuilding className="text-primary-600 text-lg" />
              <h1 className="text-xl font-bold text-primary-600">Business Details</h1>
            </div>
            {displayError && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-xs">
                {displayError}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Business Name *</label>
                <input
                  type="text"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="ABC Auto Parts Pvt Ltd"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Business Registration Number *</label>
                <input
                  type="text"
                  name="businessRegistrationNumber"
                  value={formData.businessRegistrationNumber}
                  onChange={handleChange}
                  placeholder="CIN/UIN/Registration Number"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Business Address *</label>
                <textarea
                  name="businessAddress"
                  value={formData.businessAddress}
                  onChange={handleChange}
                  placeholder="Street address"
                  rows="2"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">City *</label>
                  <input
                    type="text"
                    name="businessCity"
                    value={formData.businessCity}
                    onChange={handleChange}
                    placeholder="Mumbai"
                    className="input-field text-sm py-2"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">State *</label>
                  <input
                    type="text"
                    name="businessState"
                    value={formData.businessState}
                    onChange={handleChange}
                    placeholder="Maharashtra"
                    className="input-field text-sm py-2"
                    required
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Pincode *</label>
                <input
                  type="text"
                  name="businessPincode"
                  value={formData.businessPincode}
                  onChange={handleChange}
                  placeholder="400001"
                  className="input-field text-sm py-2"
                  required
                  pattern="[0-9]{6}"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">GST Number</label>
                  <input
                    type="text"
                    name="gstNumber"
                    value={formData.gstNumber}
                    onChange={handleChange}
                    placeholder="GSTIN (Optional)"
                    className="input-field text-sm py-2"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-0.5">PAN Number</label>
                  <input
                    type="text"
                    name="panNumber"
                    value={formData.panNumber}
                    onChange={handleChange}
                    placeholder="PAN (Optional)"
                    className="input-field text-sm py-2"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline flex-1 flex items-center justify-center gap-1 text-sm py-2"
                >
                  <FaChevronLeft /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1 flex items-center justify-center gap-1 text-sm py-2"
                >
                  Next: Bank Details <FaChevronRight />
                </button>
              </div>
            </form>
          </>
        );
      
      case 3:
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <FaCreditCard className="text-primary-600 text-lg" />
              <h1 className="text-xl font-bold text-primary-600">Bank Details</h1>
            </div>
            {displayError && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-xs">
                {displayError}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Account Holder Name *</label>
                <input
                  type="text"
                  name="accountHolderName"
                  value={formData.accountHolderName}
                  onChange={handleChange}
                  placeholder="Account holder name"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Bank Name *</label>
                <input
                  type="text"
                  name="bankName"
                  value={formData.bankName}
                  onChange={handleChange}
                  placeholder="State Bank of India"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Account Number *</label>
                <input
                  type="text"
                  name="bankAccountNumber"
                  value={formData.bankAccountNumber}
                  onChange={handleChange}
                  placeholder="Account number"
                  className="input-field text-sm py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">IFSC Code *</label>
                <input
                  type="text"
                  name="bankIFSC"
                  value={formData.bankIFSC}
                  onChange={handleChange}
                  placeholder="SBIN0001234"
                  className="input-field text-sm py-2"
                  required
                  pattern="[A-Z]{4}0[A-Z0-9]{6}"
                />
                <p className="text-xs text-gray-500 mt-0.5">Format: ABCD0123456</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline flex-1 flex items-center justify-center gap-1 text-sm py-2"
                >
                  <FaChevronLeft /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1 flex items-center justify-center gap-1 text-sm py-2"
                >
                  Next: Store Setup <FaChevronRight />
                </button>
              </div>
            </form>
          </>
        );
      
      case 4:
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <FaStore className="text-primary-600 text-lg" />
              <h1 className="text-xl font-bold text-primary-600">Store Setup</h1>
            </div>
            {displayError && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-xs">
                {displayError}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Store Name *</label>
                <input
                  type="text"
                  name="storeName"
                  value={formData.storeName}
                  onChange={handleChange}
                  placeholder="My Auto Parts Store"
                  className="input-field text-sm py-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-0.5">This will be displayed to customers</p>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-0.5">Store Description *</label>
                <textarea
                  name="storeDescription"
                  value={formData.storeDescription}
                  onChange={handleChange}
                  placeholder="Describe your store, products, and services..."
                  rows="3"
                  className="input-field text-sm py-2"
                  required
                />
                <p className="text-xs text-gray-500 mt-0.5">Tell customers about your store</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline flex-1 flex items-center justify-center gap-1 text-sm py-2"
                >
                  <FaChevronLeft /> Back
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1 flex items-center justify-center gap-1 text-sm py-2"
                >
                  Next: Product Categories <FaChevronRight />
                </button>
              </div>
            </form>
          </>
        );
      
      case 5:
        return (
          <>
            <div className="flex items-center gap-2 mb-4">
              <FaBox className="text-primary-600 text-lg" />
              <h1 className="text-xl font-bold text-primary-600">Product Categories</h1>
            </div>
            {displayError && (
              <div className="mb-3 p-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-600 text-xs">
                {displayError}
              </div>
            )}
            <form className="space-y-3" onSubmit={handleSubmit}>
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-2">
                  Select product categories you want to sell * (Select at least one)
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {productCategoriesList.map((category) => (
                    <label
                      key={category}
                      className={`flex items-center p-2 border-2 rounded-lg cursor-pointer transition ${
                        formData.productCategories.includes(category)
                          ? "border-primary-600 bg-primary-50"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={formData.productCategories.includes(category)}
                        onChange={() => handleCategoryToggle(category)}
                        className="form-checkbox text-primary-600 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <span className="ml-2 text-xs font-medium text-gray-700">{category}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handleBack}
                  className="btn-outline flex-1 flex items-center justify-center gap-1 text-sm py-2"
                >
                  <FaChevronLeft /> Back
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary flex-1 flex items-center justify-center gap-1 text-sm py-2 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white"></div>
                      Creating Account...
                    </>
                  ) : (
                    "Complete Registration"
                  )}
                </button>
              </div>
            </form>
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-50 p-3">
      <div className={`flex flex-col md:flex-row w-full ${isVendor ? 'max-w-5xl' : 'max-w-4xl'} overflow-hidden rounded-lg shadow-xl bg-white`}>
        {/* Left Image Section */}
        <div className="md:w-1/2 h-48 md:h-auto relative">
          <img
            aria-hidden="true"
            src={createAccountOffice}
            alt="Office"
            className="object-cover w-full h-full rounded-l-lg"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/40 to-transparent rounded-l-lg"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <h2 className="text-xl font-bold">Join Us</h2>
            <p className="text-gray-200 mt-1 text-xs">
              {isVendor ? "Start selling on our platform" : "Create your account and get started"}
            </p>
          </div>
        </div>

        {/* Right Form Section */}
        <main className={`${isVendor ? 'md:w-1/2' : 'md:w-1/2'} flex items-center justify-center p-4 sm:p-6 bg-white overflow-y-auto max-h-screen`}>
          <div className="w-full max-w-md">
            {/* Progress Steps for Vendor */}
            {isVendor && (
              <div className="mb-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
                  <span className="text-xs font-medium text-primary-600">{Math.round((currentStep / totalSteps) * 100)}% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-primary-600 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  ></div>
                </div>
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                  <span>Basic Info</span>
                  <span>Business</span>
                  <span>Bank</span>
                  <span>Store</span>
                  <span>Products</span>
                </div>
              </div>
            )}
            
            {renderStepContent()}

            {/* Social Login - Only show on first step and non-vendor */}
            {currentStep === 1 && !isVendor && (
              <>
                <div className="mt-4 space-y-2">
                  <button
                    disabled
                    className="w-full h-10 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                    Sign up with Facebook
                  </button>
                  <button
                    disabled
                    className="w-full h-10 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Sign up with Google
                  </button>
                </div>
                <p className="mt-4 text-xs text-center text-gray-600">
                  Already have an account?{" "}
                  <a href="/login" className="text-primary-600 hover:underline font-semibold">
                    Login
                  </a>
                </p>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Signup;
