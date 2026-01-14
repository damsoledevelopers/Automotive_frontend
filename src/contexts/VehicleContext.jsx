import React, { createContext, useContext, useState, useCallback } from 'react';

const VehicleContext = createContext(null);

export const VehicleProvider = ({ children }) => {
  const [vehicles, setVehicles] = useState(() => {
    // Load from localStorage
    const stored = localStorage.getItem('vehicles');
    return stored ? JSON.parse(stored) : [];
  });

  const [partsDatabase] = useState(() => {
    // Mock parts database with compatibility matrix
    return [
      {
        id: 1,
        name: 'Brake Pad Set - Front',
        sku: 'BP-F-001',
        oemNumber: 'OE-12345',
        compatibility: {
          makes: ['Maruti', 'Hyundai', 'Tata'],
          models: ['Swift', 'i20', 'Nexon'],
          variants: ['VDI', 'VXI', 'ZXI'],
          years: ['2018', '2019', '2020', '2021', '2022']
        },
        options: [
          { type: 'OE', price: 3500, stock: 45, condition: 'new', warranty: '12 months', vendor: 'OEM Store' },
          { type: 'OEM', price: 2800, stock: 120, condition: 'new', warranty: '6 months', vendor: 'Auto Parts Hub' },
          { type: 'Aftermarket', price: 1800, stock: 200, condition: 'new', warranty: '3 months', vendor: 'Budget Parts' },
          { type: 'Used', price: 800, stock: 15, condition: 'good', warranty: '1 month', vendor: 'Used Parts Depot' }
        ],
        symptoms: ['brake noise', 'brake squeal', 'brake fade', 'brake vibration']
      },
      {
        id: 2,
        name: 'Air Filter',
        sku: 'AF-002',
        oemNumber: 'OE-67890',
        compatibility: {
          makes: ['Maruti', 'Hyundai', 'Honda', 'Toyota'],
          models: ['Swift', 'i20', 'City', 'Innova'],
          variants: ['VDI', 'VXI', 'ZXI', 'VX'],
          years: ['2018', '2019', '2020', '2021', '2022', '2023']
        },
        options: [
          { type: 'OE', price: 850, stock: 200, condition: 'new', warranty: '12 months', vendor: 'OEM Store' },
          { type: 'OEM', price: 650, stock: 500, condition: 'new', warranty: '6 months', vendor: 'Auto Parts Hub' },
          { type: 'Aftermarket', price: 450, stock: 800, condition: 'new', warranty: '3 months', vendor: 'Budget Parts' }
        ],
        symptoms: ['poor acceleration', 'reduced fuel efficiency', 'engine noise', 'rough idle']
      },
      {
        id: 3,
        name: 'Oil Filter',
        sku: 'OF-003',
        oemNumber: 'OE-11111',
        compatibility: {
          makes: ['Maruti', 'Hyundai', 'Tata', 'Mahindra'],
          models: ['Swift', 'i20', 'Nexon', 'XUV'],
          variants: ['VDI', 'VXI', 'ZXI', 'W8'],
          years: ['2018', '2019', '2020', '2021', '2022', '2023']
        },
        options: [
          { type: 'OE', price: 350, stock: 300, condition: 'new', warranty: '12 months', vendor: 'OEM Store' },
          { type: 'OEM', price: 280, stock: 600, condition: 'new', warranty: '6 months', vendor: 'Auto Parts Hub' },
          { type: 'Aftermarket', price: 180, stock: 1000, condition: 'new', warranty: '3 months', vendor: 'Budget Parts' }
        ],
        symptoms: ['oil leak', 'engine noise', 'oil change due', 'maintenance']
      }
    ];
  });

  // Save vehicles to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('vehicles', JSON.stringify(vehicles));
  }, [vehicles]);

  const addVehicle = useCallback((vehicleData) => {
    const newVehicle = {
      id: Date.now(),
      ...vehicleData,
      createdAt: new Date().toISOString()
    };
    setVehicles(prev => [...prev, newVehicle]);
    return newVehicle;
  }, []);

  const removeVehicle = useCallback((vehicleId) => {
    setVehicles(prev => prev.filter(v => v.id !== vehicleId));
  }, []);

  const updateVehicle = useCallback((vehicleId, vehicleData) => {
    setVehicles(prev => prev.map(v => 
      v.id === vehicleId 
        ? { ...v, ...vehicleData, updatedAt: new Date().toISOString() }
        : v
    ));
  }, []);

  const lookupByRegistration = useCallback((regNumber) => {
    return vehicles.find(v => 
      v.registrationNumber?.toUpperCase() === regNumber.toUpperCase()
    );
  }, [vehicles]);

  const lookupByVIN = useCallback((vin) => {
    return vehicles.find(v => 
      v.vin?.toUpperCase() === vin.toUpperCase()
    );
  }, [vehicles]);

  const searchByFilters = useCallback((filters) => {
    return vehicles.filter(v => {
      if (filters.make && v.make !== filters.make) return false;
      if (filters.model && !v.model?.toLowerCase().includes(filters.model.toLowerCase())) return false;
      if (filters.variant && v.variant !== filters.variant) return false;
      if (filters.year && v.year !== filters.year) return false;
      if (filters.fuelType && v.fuelType !== filters.fuelType) return false;
      return true;
    });
  }, [vehicles]);

  const getCompatibleParts = useCallback((vehicle, symptoms = []) => {
    if (!vehicle) return [];

    const compatibleParts = partsDatabase.filter(part => {
      // Check compatibility
      const makeMatch = !part.compatibility.makes.length || 
        part.compatibility.makes.includes(vehicle.make);
      const modelMatch = !part.compatibility.models.length || 
        part.compatibility.models.some(m => vehicle.model?.includes(m));
      const variantMatch = !part.compatibility.variants.length || 
        part.compatibility.variants.includes(vehicle.variant);
      const yearMatch = !part.compatibility.years.length || 
        part.compatibility.years.includes(vehicle.year);

      // Check symptom match if provided
      const symptomMatch = !symptoms.length || 
        symptoms.some(symptom => 
          part.symptoms.some(s => 
            s.toLowerCase().includes(symptom.toLowerCase())
          )
        );

      return makeMatch && modelMatch && variantMatch && yearMatch && symptomMatch;
    });

    return compatibleParts;
  }, [partsDatabase]);

  const getPartOptions = useCallback((partId, vehicle) => {
    const part = partsDatabase.find(p => p.id === partId);
    if (!part) return [];

    // Filter options based on availability and compatibility
    return part.options.filter(option => option.stock > 0);
  }, [partsDatabase]);

  const value = {
    vehicles,
    partsDatabase,
    addVehicle,
    removeVehicle,
    updateVehicle,
    lookupByRegistration,
    lookupByVIN,
    searchByFilters,
    getCompatibleParts,
    getPartOptions,
  };

  return (
    <VehicleContext.Provider value={value}>
      {children}
    </VehicleContext.Provider>
  );
};

export const useVehicle = () => {
  const context = useContext(VehicleContext);
  if (!context) {
    throw new Error('useVehicle must be used within a VehicleProvider');
  }
  return context;
};
   