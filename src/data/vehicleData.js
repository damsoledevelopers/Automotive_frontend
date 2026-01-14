// Centralized vehicle data aggregator
// Imports models from all vehicle files and transforms them for use in dropdowns
// Data structure follows boodmo.com format: Maker -> Model -> Year -> Modifications

import { marutiModels } from '../component/Vehicles/Maruti';
import { hyundaiModels } from '../component/Vehicles/Hyundai';
import { tataModels } from '../component/Vehicles/Tata';
import { mahindraModels } from '../component/Vehicles/Mahindra';
import { chevroletModels } from '../component/Vehicles/Chevrolet';
import { hondaModels } from '../component/Vehicles/Honda';
import { fiatModels } from '../component/Vehicles/Fiat';
import { kiaModels } from '../component/Vehicles/Kia';
import { nissanModels } from '../component/Vehicles/Nissan';
import { audiModels } from '../component/Vehicles/Audi';
import { fordModels } from '../component/Vehicles/Ford';
import { toyotaModels } from '../component/Vehicles/Toyota';
import { skodaModels } from '../component/Vehicles/Skoda';
import { renaultModels } from '../component/Vehicles/Renault';
import { vwModels } from '../component/Vehicles/Vw';
import { ashokLaylandModels } from '../component/Vehicles/AshokLayland';
import { transformVehicleData, getVehicleImage } from '../utils/vehicleDataAggregator';

// Two-wheeler data (static)
const twoWheelerData = {
  'HERO': {
    'SPLENDOR PLUS': {
      2020: ['110cc Xtec', '110cc Xtec i3S', '110cc Xtec Disc'],
      2021: ['110cc Xtec', '110cc Xtec i3S', '110cc Xtec Disc'],
      2022: ['110cc Xtec', '110cc Xtec i3S', '110cc Xtec Disc'],
      2023: ['110cc Xtec', '110cc Xtec i3S', '110cc Xtec Disc'],
      2024: ['110cc Xtec', '110cc Xtec i3S', '110cc Xtec Disc']
    },
    'PASSION PRO': {
      2020: ['110cc', '110cc i3S'],
      2021: ['110cc', '110cc i3S'],
      2022: ['110cc', '110cc i3S'],
      2023: ['110cc', '110cc i3S']
    },
    'XTREME 160R': {
      2020: ['160cc', '160cc 4V'],
      2021: ['160cc', '160cc 4V'],
      2022: ['160cc', '160cc 4V'],
      2023: ['160cc', '160cc 4V'],
      2024: ['160cc', '160cc 4V']
    }
  },
  'BAJAJ': {
    'PULSAR 150': {
      2020: ['150cc Twin Disc', '150cc Single Disc'],
      2021: ['150cc Twin Disc', '150cc Single Disc'],
      2022: ['150cc Twin Disc', '150cc Single Disc'],
      2023: ['150cc Twin Disc', '150cc Single Disc']
    },
    'PULSAR NS200': {
      2020: ['200cc', '200cc ABS'],
      2021: ['200cc', '200cc ABS'],
      2022: ['200cc', '200cc ABS'],
      2023: ['200cc', '200cc ABS']
    },
    'DOMINAR 400': {
      2020: ['400cc', '400cc ABS'],
      2021: ['400cc', '400cc ABS'],
      2022: ['400cc', '400cc ABS'],
      2023: ['400cc', '400cc ABS']
    }
  },
  'TVS': {
    'APACHE RTR 160': {
      2020: ['160cc', '160cc 4V'],
      2021: ['160cc', '160cc 4V'],
      2022: ['160cc', '160cc 4V'],
      2023: ['160cc', '160cc 4V']
    },
    'APACHE RTR 200': {
      2020: ['200cc', '200cc 4V'],
      2021: ['200cc', '200cc 4V'],
      2022: ['200cc', '200cc 4V'],
      2023: ['200cc', '200cc 4V']
    },
    'JUPITER': {
      2020: ['110cc', '110cc ZX'],
      2021: ['110cc', '110cc ZX'],
      2022: ['110cc', '110cc ZX'],
      2023: ['110cc', '110cc ZX']
    }
  },
  'YAMAHA': {
    'FZ-S FI': {
      2020: ['150cc', '150cc V3'],
      2021: ['150cc', '150cc V3'],
      2022: ['150cc', '150cc V3'],
      2023: ['150cc', '150cc V3']
    },
    'R15 V4': {
      2020: ['155cc', '155cc M'],
      2021: ['155cc', '155cc M'],
      2022: ['155cc', '155cc M'],
      2023: ['155cc', '155cc M']
    },
    'MT-15': {
      2020: ['155cc', '155cc V2'],
      2021: ['155cc', '155cc V2'],
      2022: ['155cc', '155cc V2'],
      2023: ['155cc', '155cc V2']
    }
  },
  'HONDA': {
    'SHINE': {
      2020: ['125cc', '125cc SP'],
      2021: ['125cc', '125cc SP'],
      2022: ['125cc', '125cc SP'],
      2023: ['125cc', '125cc SP']
    },
    'CB HORNET 160R': {
      2020: ['160cc', '160cc ABS'],
      2021: ['160cc', '160cc ABS'],
      2022: ['160cc', '160cc ABS'],
      2023: ['160cc', '160cc ABS']
    },
    'ACTIVA 6G': {
      2020: ['110cc', '110cc H-Smart'],
      2021: ['110cc', '110cc H-Smart'],
      2022: ['110cc', '110cc H-Smart'],
      2023: ['110cc', '110cc H-Smart']
    }
  },
  'ROYAL ENFIELD': {
    'CLASSIC 350': {
      2020: ['350cc', '350cc Signals'],
      2021: ['350cc', '350cc Signals'],
      2022: ['350cc', '350cc Signals'],
      2023: ['350cc', '350cc Signals']
    },
    'BULLET 350': {
      2020: ['350cc', '350cc ES'],
      2021: ['350cc', '350cc ES'],
      2022: ['350cc', '350cc ES'],
      2023: ['350cc', '350cc ES']
    },
    'HIMALAYAN': {
      2020: ['411cc', '411cc ABS'],
      2021: ['411cc', '411cc ABS'],
      2022: ['411cc', '411cc ABS'],
      2023: ['411cc', '411cc ABS']
    }
  }
};

// Map of all vehicle models by maker
const vehicleModelsMap = {
  MARUTI: marutiModels,
  HYUNDAI: hyundaiModels,
  TATA: tataModels,
  MAHINDRA: mahindraModels,
  CHEVROLET: chevroletModels,
  HONDA: hondaModels,
  FIAT: fiatModels,
  KIA: kiaModels,
  NISSAN: nissanModels,
  AUDI: audiModels,
  FORD: fordModels,
  TOYOTA: toyotaModels,
  SKODA: skodaModels,
  RENAULT: renaultModels,
  VW: vwModels,
  'ASHOK LAYLAND': ashokLaylandModels,
};

// Transform all vehicle data to the format needed by BoodmoUi
// Format: { MAKER: { MODEL: { YEAR: [modifications] } } }
export const getVehicleData = () => {
  const transformed = {};
  
  Object.keys(vehicleModelsMap).forEach((makerName) => {
    const models = vehicleModelsMap[makerName];
    if (models && Array.isArray(models)) {
      transformed[makerName] = transformVehicleData(makerName, models);
    }
  });
  
  return transformed;
};

// Get vehicle image for a specific maker and model
export const getVehicleImageUrl = (makerName, modelName) => {
  const models = vehicleModelsMap[makerName];
  if (!models || !Array.isArray(models)) return null;
  
  return getVehicleImage(vehicleModelsMap, makerName, modelName);
};

// Get all available makers (for cars or two-wheelers)
export const getVehicleMakers = (vehicleType = 'car') => {
  if (vehicleType === 'twoWheeler') {
    return Object.keys(twoWheelerData).sort();
  }
  return Object.keys(vehicleModelsMap).sort();
};

// Get models for a specific maker (for cars or two-wheelers)
export const getModelsForMaker = (makerName, vehicleType = 'car') => {
  if (vehicleType === 'twoWheeler') {
    return makerName && twoWheelerData[makerName] ? Object.keys(twoWheelerData[makerName]).sort() : [];
  }
  const data = getVehicleData();
  return makerName && data[makerName] ? Object.keys(data[makerName]).sort() : [];
};

// Get years for a specific maker and model (for cars or two-wheelers)
export const getYearsForModel = (makerName, modelName, vehicleType = 'car') => {
  if (vehicleType === 'twoWheeler') {
    if (!makerName || !modelName || !twoWheelerData[makerName] || !twoWheelerData[makerName][modelName]) {
      return [];
    }
    return Object.keys(twoWheelerData[makerName][modelName])
      .map(year => parseInt(year))
      .sort((a, b) => b - a);
  }
  const data = getVehicleData();
  if (!makerName || !modelName || !data[makerName] || !data[makerName][modelName]) {
    return [];
  }
  return Object.keys(data[makerName][modelName])
    .map(year => parseInt(year))
    .sort((a, b) => b - a); // Sort descending (newest first)
};

// Get modifications for a specific maker, model, and year (for cars or two-wheelers)
export const getModificationsForYear = (makerName, modelName, year, vehicleType = 'car') => {
  if (vehicleType === 'twoWheeler') {
    const yearKey = year.toString();
    if (!makerName || !modelName || !year || !twoWheelerData[makerName] || !twoWheelerData[makerName][modelName] || !twoWheelerData[makerName][modelName][yearKey]) {
      return [];
    }
    return twoWheelerData[makerName][modelName][yearKey] || [];
  }
  const data = getVehicleData();
  const yearKey = year.toString(); // Convert year to string for object key access
  if (!makerName || !modelName || !year || !data[makerName] || !data[makerName][modelName] || !data[makerName][modelName][yearKey]) {
    return [];
  }
  return data[makerName][modelName][yearKey] || [];
};

