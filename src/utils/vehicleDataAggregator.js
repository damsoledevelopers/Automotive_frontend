// Utility to aggregate vehicle data from Vehicles folder
// This extracts and transforms vehicle data for use in dropdowns

// Helper function to extract years from a year string like "05.2005 - now" or "10.1990 - 05.2000"
// Following boodmo.com format: MM.YYYY - MM.YYYY or MM.YYYY - now
const extractYears = (yearString) => {
  if (!yearString) return [];
  
  const currentYear = new Date().getFullYear();
  const years = [];
  
  // Handle "now" as current year (boodmo.com uses "now" to indicate current year)
  const normalized = yearString.replace(/now/gi, `${currentYear}`);
  
  // Extract year ranges: "MM.YYYY - MM.YYYY" (boodmo.com standard format)
  const match = normalized.match(/(\d{2})\.(\d{4})\s*-\s*(\d{2})\.(\d{4})/);
  if (match) {
    const startYear = parseInt(match[2]);
    const endYear = parseInt(match[4]);
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
  } else {
    // Try pattern: "MM.YYYY - YYYY" (without month in end year)
    const match2 = normalized.match(/(\d{2})\.(\d{4})\s*-\s*(\d{4})/);
    if (match2) {
      const startYear = parseInt(match2[2]);
      const endYear = parseInt(match2[3]);
      for (let year = startYear; year <= endYear; year++) {
        years.push(year);
      }
    } else {
      // Single year: "MM.YYYY" or "MM.YYYY - now"
      const singleMatch = normalized.match(/(\d{2})\.(\d{4})/);
      if (singleMatch) {
        const startYear = parseInt(singleMatch[2]);
        years.push(startYear);
        // If original string contains "now", add all years from start to current year
        if (yearString.toLowerCase().includes('now')) {
          for (let y = startYear + 1; y <= currentYear; y++) {
            years.push(y);
          }
        }
      }
    }
  }
  
  return years.length > 0 ? years : [currentYear];
};

// Helper function to extract years from generation string like "SWIFT 1ST GEN 05.2005 - 05.2011" or "ALTO K10 3RD GEN 08.2022 - now"
const extractYearsFromGeneration = (generation) => {
  if (!generation) return [];
  
  const currentYear = new Date().getFullYear();
  const years = [];
  
  // Normalize "now" to current year
  const normalized = generation.replace(/now/gi, `${currentYear}`);
  
  // Extract year ranges from generation: "MODEL MM.YYYY - MM.YYYY" or "MODEL MM.YYYY - YYYY"
  const match = normalized.match(/(\d{2})\.(\d{4})\s*-\s*(\d{2})\.(\d{4})/);
  if (match) {
    const startYear = parseInt(match[2]);
    const endYear = parseInt(match[4]);
    for (let year = startYear; year <= endYear; year++) {
      years.push(year);
    }
  } else {
    // Try pattern: "MM.YYYY - YYYY" (without month in end year)
    const match2 = normalized.match(/(\d{2})\.(\d{4})\s*-\s*(\d{4})/);
    if (match2) {
      const startYear = parseInt(match2[2]);
      const endYear = parseInt(match2[3]);
      for (let year = startYear; year <= endYear; year++) {
        years.push(year);
      }
    } else {
      // Single year: "MODEL MM.YYYY" or "MODEL MM.YYYY - now"
      const singleMatch = normalized.match(/(\d{2})\.(\d{4})/);
      if (singleMatch) {
        const startYear = parseInt(singleMatch[2]);
        years.push(startYear);
        // If generation contains "now" or ends with current year, add all years up to current
        if (generation.toLowerCase().includes('now') || normalized.includes(currentYear.toString())) {
          for (let y = startYear + 1; y <= currentYear; y++) {
            years.push(y);
          }
        }
      }
    }
  }
  
  return years.length > 0 ? years : [];
};

// Transform vehicle models data to the format needed by BoodmoUi
// Following boodmo.com data structure: Maker -> Model -> Year -> Modifications
// Reference: boodmo.com organizes vehicles by maker, model, generation (year range), and variants
export const transformVehicleData = (makerName, models) => {
  const transformed = {};
  
  if (!models || !Array.isArray(models)) {
    return transformed;
  }
  
  models.forEach((model) => {
    // Remove maker name prefix from model name (e.g., "MARUTI SWIFT" -> "SWIFT")
    // This matches boodmo.com's structure where model names are stored without maker prefix
    const modelName = model.name?.replace(new RegExp(`^${makerName}\\s*`, 'i'), '').trim() || model.name;
    if (!modelName) return;
    
    // Extract years from model.years (boodmo.com format: "MM.YYYY - MM.YYYY" or "MM.YYYY - now")
    const modelYears = extractYears(model.years);
    
    // Process modifications (boodmo.com organizes by generation with specific year ranges)
    if (model.modifications && Array.isArray(model.modifications)) {
      model.modifications.forEach((modGroup) => {
        // Extract years from generation string (e.g., "SWIFT 1ST GEN 05.2005 - 05.2011")
        // Generation strings have more precise year ranges than model.years
        const generationYears = extractYearsFromGeneration(modGroup.generation);
        // Use generation years if available, otherwise fall back to model years
        const yearsToUse = generationYears.length > 0 ? generationYears : modelYears;
        
        // Get options (modifications/variants) - these are the actual trim/variant names
        // Format: "1.2L LXI MT (TYPE 4)/Petrol/BS4" (boodmo.com format)
        const options = modGroup.options || [];
        
        // Map each year to its available modifications
        yearsToUse.forEach((year) => {
          if (!transformed[modelName]) {
            transformed[modelName] = {};
          }
          if (!transformed[modelName][year]) {
            transformed[modelName][year] = [];
          }
          // Add options to the year, avoiding duplicates
          options.forEach((option) => {
            if (!transformed[modelName][year].includes(option)) {
              transformed[modelName][year].push(option);
            }
          });
        });
      });
    } else if (modelYears.length > 0) {
      // If no modifications, create a default entry (shouldn't happen in boodmo.com data)
      modelYears.forEach((year) => {
        if (!transformed[modelName]) {
          transformed[modelName] = {};
        }
        if (!transformed[modelName][year]) {
          transformed[modelName][year] = ['Base'];
        }
      });
    }
  });
  
  return transformed;
};

// Aggregate all vehicle data
// This function will be called with vehicle data from each maker
export const aggregateVehicleData = (vehicleDataMap) => {
  const aggregated = {};
  
  Object.keys(vehicleDataMap).forEach((makerName) => {
    const models = vehicleDataMap[makerName];
    aggregated[makerName] = transformVehicleData(makerName, models);
  });
  
  return aggregated;
};

// Get vehicle image for a specific maker and model
// Handles various model name formats (with/without maker prefix, case variations)
export const getVehicleImage = (vehicleDataMap, makerName, modelName) => {
  const models = vehicleDataMap[makerName];
  if (!models || !Array.isArray(models)) return null;
  
  // Normalize inputs for comparison
  const normalizedModelName = modelName?.trim().toUpperCase();
  const normalizedMakerName = makerName?.trim().toUpperCase();
  
  const model = models.find((m) => {
    if (!m.name) return false;
    
    // Remove maker prefix and normalize
    const cleanName = m.name.replace(new RegExp(`^${normalizedMakerName}\\s*`, 'i'), '').trim().toUpperCase();
    const fullName = m.name.trim().toUpperCase();
    
    // Check for exact match (with or without maker prefix)
    if (cleanName === normalizedModelName || fullName === normalizedModelName) {
      return true;
    }
    
    // Check if model name contains the search term (for partial matches)
    if (cleanName.includes(normalizedModelName) || normalizedModelName.includes(cleanName)) {
      return true;
    }
    
    return false;
  });
  
  return model?.image || null;
};

