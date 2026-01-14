import React, { useState } from 'react';
import { useVehicle } from '../../contexts/VehicleContext';
import { FaSearch, FaCar, FaIdCard } from 'react-icons/fa';

const VehicleLookup = ({ onVehicleSelected }) => {
  const { lookupByVIN, lookupByRegistration, searchByFilters } = useVehicle();
  const [searchType, setSearchType] = useState('registration'); // 'registration' or 'vin' or 'filters'
  const [searchValue, setSearchValue] = useState('');
  const [filters, setFilters] = useState({
    make: '',
    model: '',
    variant: '',
    year: '',
    fuelType: ''
  });
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleSearch = () => {
    setError('');
    setResults([]);

    if (searchType === 'registration') {
      const vehicle = lookupByRegistration(searchValue);
      if (vehicle) {
        setResults([vehicle]);
        onVehicleSelected?.(vehicle);
      } else {
        setError('Vehicle not found. Please check your registration number.');
      }
    } else if (searchType === 'vin') {
      const vehicle = lookupByVIN(searchValue);
      if (vehicle) {
        setResults([vehicle]);
        onVehicleSelected?.(vehicle);
      } else {
        setError('Vehicle not found. Please check your VIN.');
      }
    } else if (searchType === 'filters') {
      const found = searchByFilters(filters);
      setResults(found);
      if (found.length === 0) {
        setError('No vehicles found matching your criteria.');
      }
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Find Your Vehicle</h2>

      {/* Search Type Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setSearchType('registration')}
          className={`px-4 py-2 font-semibold transition-colors ${
            searchType === 'registration'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <FaIdCard className="inline mr-2" />
          Registration Number
        </button>
        <button
          onClick={() => setSearchType('vin')}
          className={`px-4 py-2 font-semibold transition-colors ${
            searchType === 'vin'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <FaCar className="inline mr-2" />
          VIN
        </button>
        <button
          onClick={() => setSearchType('filters')}
          className={`px-4 py-2 font-semibold transition-colors ${
            searchType === 'filters'
              ? 'text-primary-600 border-b-2 border-primary-600'
              : 'text-gray-600 hover:text-primary-600'
          }`}
        >
          <FaSearch className="inline mr-2" />
          Filters
        </button>
      </div>

      {/* Search Form */}
      {searchType === 'filters' ? (
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Make</label>
              <select
                value={filters.make}
                onChange={(e) => setFilters({ ...filters, make: e.target.value })}
                className="input-field"
              >
                <option value="">Select Make</option>
                <option value="Maruti">Maruti</option>
                <option value="Hyundai">Hyundai</option>
                <option value="Tata">Tata</option>
                <option value="Mahindra">Mahindra</option>
                <option value="Honda">Honda</option>
                <option value="Toyota">Toyota</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Model</label>
              <input
                type="text"
                value={filters.model}
                onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                placeholder="e.g., Swift"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Variant</label>
              <input
                type="text"
                value={filters.variant}
                onChange={(e) => setFilters({ ...filters, variant: e.target.value })}
                placeholder="e.g., VDI"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
              <input
                type="number"
                value={filters.year}
                onChange={(e) => setFilters({ ...filters, year: e.target.value })}
                placeholder="e.g., 2020"
                className="input-field"
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {searchType === 'registration' ? 'Registration Number' : 'VIN'}
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value.toUpperCase())}
              placeholder={searchType === 'registration' ? 'MH12AB1234' : 'Enter 17-digit VIN'}
              className="input-field flex-1"
              maxLength={searchType === 'vin' ? 17 : undefined}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <button onClick={handleSearch} className="btn-primary w-full mb-6">
        <FaSearch className="inline mr-2" />
        Search Vehicle
      </button>

      {/* Results */}
      {results.length > 0 && (
        <div className="space-y-3">
          <h3 className="font-semibold text-gray-900">Search Results:</h3>
          {results.map((vehicle) => (
            <div
              key={vehicle.id}
              className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition cursor-pointer"
              onClick={() => onVehicleSelected?.(vehicle)}
            >
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {vehicle.make} {vehicle.model} {vehicle.variant}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {vehicle.year} • {vehicle.fuelType} • {vehicle.engine}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Reg: {vehicle.registrationNumber} | VIN: {vehicle.vin}
                  </p>
                </div>
                <button className="btn-primary text-sm">
                  Select
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleLookup;

