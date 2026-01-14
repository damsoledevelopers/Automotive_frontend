import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useVehicle } from '../../contexts/VehicleContext';
import { useJob } from '../../contexts/JobContext';
import { useEscrow } from '../../contexts/EscrowContext';
import { useAuth } from '../../auth/AuthContext';
import VehicleLookup from './VehicleLookup';
import { FaHome, FaWarehouse, FaMapMarkerAlt, FaClock, FaStar, FaWrench } from 'react-icons/fa';

const ServiceBooking = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addVehicle } = useVehicle();
  const { createJob } = useJob();
  const { createEscrow } = useEscrow();
  
  const [step, setStep] = useState(1);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [serviceMode, setServiceMode] = useState('garage'); // 'garage' or 'athome'
  const [symptoms, setSymptoms] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('');
  const [selectedGarage, setSelectedGarage] = useState(null);
  const [selectedMechanic, setSelectedMechanic] = useState(null);
  const [reservationFee] = useState(500);

  // Mock garages and mechanics
  const garages = [
    {
      id: 1,
      name: 'AutoCare Garage',
      address: '123 Main Street, Pune',
      rating: 4.8,
      reviews: 234,
      distance: '2.5 km',
      services: ['Full Service', 'AC Repair', 'Engine Repair'],
      availableSlots: ['10:00 AM', '2:00 PM', '4:00 PM'],
      priceRange: '₹500 - ₹5000'
    },
    {
      id: 2,
      name: 'QuickFix Auto',
      address: '456 Park Avenue, Pune',
      rating: 4.6,
      reviews: 189,
      distance: '3.2 km',
      services: ['Quick Service', 'Brake Repair', 'Battery Replacement'],
      availableSlots: ['9:00 AM', '11:00 AM', '3:00 PM'],
      priceRange: '₹300 - ₹3000'
    }
  ];

  const mechanics = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      rating: 4.9,
      reviews: 156,
      experience: '8 years',
      specialties: ['AC Service', 'Battery', 'Quick Fixes'],
      availableSlots: ['10:00 AM', '2:00 PM', '5:00 PM'],
      distance: '1.8 km'
    },
    {
      id: 2,
      name: 'Amit Sharma',
      rating: 4.7,
      reviews: 98,
      experience: '6 years',
      specialties: ['Engine', 'Transmission', 'Electrical'],
      availableSlots: ['9:00 AM', '1:00 PM', '4:00 PM'],
      distance: '2.3 km'
    }
  ];

  const handleVehicleSelected = (vehicle) => {
    // If vehicle not in database, add it
    if (!vehicle.id) {
      const newVehicle = addVehicle(vehicle);
      setSelectedVehicle(newVehicle);
    } else {
      setSelectedVehicle(vehicle);
    }
    setStep(2);
  };

  const handleServiceModeSelect = (mode) => {
    setServiceMode(mode);
    setStep(3);
  };

  const handleGarageSelect = (garage) => {
    setSelectedGarage(garage);
    setStep(4);
  };

  const handleMechanicSelect = (mechanic) => {
    setSelectedMechanic(mechanic);
    setStep(4);
  };

  const handleSlotSelect = (slot) => {
    setPreferredSlot(slot);
  };

  const handleBookService = async () => {
    if (!selectedVehicle || !symptoms || !preferredSlot) {
      alert('Please fill all required fields');
      return;
    }

    // Create job
    const job = createJob({
      vehicle: selectedVehicle,
      serviceMode,
      symptoms,
      preferredSlot,
      garage: selectedGarage,
      mechanic: selectedMechanic,
      customerId: user?.id,
      customerName: user?.name,
      customerEmail: user?.email
    });

    // Create escrow for reservation
    createEscrow({
      jobId: job.id,
      amount: reservationFee,
      type: 'reservation'
    });

    // Navigate to job details
    navigate(`/service/job/${job.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-8">
      <div className="section-container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Book Service</h1>
          <p className="text-gray-600">Get your vehicle serviced by verified mechanics</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8 bg-white rounded-xl shadow-soft p-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((s) => (
              <React.Fragment key={s}>
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    step >= s ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {step > s ? '✓' : s}
                  </div>
                  <span className="text-xs mt-2 text-gray-600">
                    {s === 1 ? 'Vehicle' : s === 2 ? 'Service' : s === 3 ? 'Select' : 'Confirm'}
                  </span>
                </div>
                {s < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    step > s ? 'bg-primary-600' : 'bg-gray-200'
                  }`}></div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Step 1: Vehicle Selection */}
        {step === 1 && (
          <VehicleLookup onVehicleSelected={handleVehicleSelected} />
        )}

        {/* Step 2: Service Mode Selection */}
        {step === 2 && selectedVehicle && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Service Mode</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <button
                onClick={() => handleServiceModeSelect('garage')}
                className="card-hover text-left p-6 border-2 border-gray-200 hover:border-primary-600"
              >
                <FaWarehouse className="text-4xl text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Garage Service</h3>
                <p className="text-gray-600 mb-4">
                  Drive-in or get your vehicle picked up for comprehensive service at a verified garage
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Full diagnostic facilities</li>
                  <li>✓ Complete repair services</li>
                  <li>✓ Quality assurance</li>
                </ul>
              </button>

              <button
                onClick={() => handleServiceModeSelect('athome')}
                className="card-hover text-left p-6 border-2 border-gray-200 hover:border-primary-600"
              >
                <FaHome className="text-4xl text-primary-600 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-2">At-Home Service</h3>
                <p className="text-gray-600 mb-4">
                  Get a mechanic at your doorstep for quick fixes and basic services
                </p>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li>✓ Convenient doorstep service</li>
                  <li>✓ Quick fixes & basic services</li>
                  <li>✓ Transparent pricing</li>
                </ul>
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Select Garage/Mechanic */}
        {step === 3 && (
          <div className="space-y-6">
            {/* Symptoms Input */}
            <div className="card">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Describe the Issue</h2>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="e.g., Brake noise, AC not cooling, Engine overheating..."
                className="input-field"
                rows={4}
              />
            </div>

            {/* Garage Selection */}
            {serviceMode === 'garage' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select Garage</h2>
                <div className="space-y-4">
                  {garages.map((garage) => (
                    <div
                      key={garage.id}
                      onClick={() => handleGarageSelect(garage)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedGarage?.id === garage.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{garage.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <FaMapMarkerAlt /> {garage.address}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock /> {garage.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <FaStar className="text-yellow-500" />
                              <span className="ml-1 font-semibold">{garage.rating}</span>
                            </div>
                            <span className="text-gray-500">({garage.reviews} reviews)</span>
                          </div>
                          <p className="text-sm text-gray-600">{garage.priceRange}</p>
                        </div>
                        <button className="btn-primary">Select</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Mechanic Selection */}
            {serviceMode === 'athome' && (
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Select Mechanic</h2>
                <div className="space-y-4">
                  {mechanics.map((mechanic) => (
                    <div
                      key={mechanic.id}
                      onClick={() => handleMechanicSelect(mechanic)}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        selectedMechanic?.id === mechanic.id
                          ? 'border-primary-600 bg-primary-50'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-bold text-gray-900 mb-1">{mechanic.name}</h3>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                            <span className="flex items-center gap-1">
                              <FaWrench /> {mechanic.experience}
                            </span>
                            <span className="flex items-center gap-1">
                              <FaClock /> {mechanic.distance}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 mb-2">
                            <div className="flex items-center">
                              <FaStar className="text-yellow-500" />
                              <span className="ml-1 font-semibold">{mechanic.rating}</span>
                            </div>
                            <span className="text-gray-500">({mechanic.reviews} reviews)</span>
                          </div>
                          <p className="text-sm text-gray-600">
                            Specialties: {mechanic.specialties.join(', ')}
                          </p>
                        </div>
                        <button className="btn-primary">Select</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Step 4: Confirm Booking */}
        {step === 4 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Confirm Booking</h2>
            <div className="space-y-6">
              {/* Vehicle Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Vehicle</h3>
                <p className="text-gray-700">
                  {selectedVehicle?.make} {selectedVehicle?.model} {selectedVehicle?.variant}
                </p>
                <p className="text-sm text-gray-600">
                  Reg: {selectedVehicle?.registrationNumber} | VIN: {selectedVehicle?.vin}
                </p>
              </div>

              {/* Service Info */}
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Service Details</h3>
                <p className="text-gray-700 capitalize mb-2">
                  Mode: {serviceMode === 'garage' ? 'Garage Service' : 'At-Home Service'}
                </p>
                {selectedGarage && (
                  <p className="text-gray-700">Garage: {selectedGarage.name}</p>
                )}
                {selectedMechanic && (
                  <p className="text-gray-700">Mechanic: {selectedMechanic.name}</p>
                )}
                <p className="text-gray-700 mt-2">Symptoms: {symptoms}</p>
              </div>

              {/* Slot Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Select Time Slot</label>
                <div className="grid grid-cols-3 gap-3">
                  {(selectedGarage?.availableSlots || selectedMechanic?.availableSlots || []).map((slot) => (
                    <button
                      key={slot}
                      onClick={() => handleSlotSelect(slot)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        preferredSlot === slot
                          ? 'border-primary-600 bg-primary-50 text-primary-700'
                          : 'border-gray-200 hover:border-primary-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              {/* Reservation Fee */}
              <div className="bg-primary-50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-900">Reservation Fee</p>
                    <p className="text-sm text-gray-600">This will be held in escrow until service completion</p>
                  </div>
                  <p className="text-2xl font-bold text-primary-600">₹{reservationFee}</p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <button
                  onClick={() => setStep(3)}
                  className="btn-outline flex-1"
                >
                  Back
                </button>
                <button
                  onClick={handleBookService}
                  disabled={!preferredSlot}
                  className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Confirm & Pay Reservation
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceBooking;
