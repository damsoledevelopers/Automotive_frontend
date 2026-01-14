// Helper function to parse modification options and extract specifications
export const parseModification = (option) => {
  // Example: "1.0L LXI MT/Petrol/68h.p./BS4"
  const parts = option.split("/");
  const modification = parts[0]?.trim() || "";
  const engineType = parts[1]?.trim() || "";
  const power = parts[2]?.match(/(\d+)\s*h\.?p\.?/i)?.[1] || "";
  const emission = parts[3]?.trim() || "";
  
  // Extract engine size from modification (e.g., "1.0L" -> "1.0 L")
  const engineMatch = modification.match(/(\d+\.?\d*)\s*L/i);
  const engine = engineMatch ? `${engineMatch[1]} L` : "";
  
  // Extract engine code (if available in modification)
  const engineCode = modification.match(/\b([A-Z]\d+[A-Z]?)\b/)?.[1] || "";
  
  return {
    modification,
    emission,
    engine,
    engineType,
    power: power ? `${power} h.p.` : "",
    engineCode,
  };
};

// Helper function to extract years from generation string
export const extractYears = (generation) => {
  // Example: "1000 10.1990 - 05.2000" -> "10.1990 - 05.2000"
  const yearMatch = generation.match(/(\d{2}\.\d{4})\s*-\s*(\d{2}\.\d{4}|now)/);
  return yearMatch ? `${yearMatch[1]} - ${yearMatch[2] === "now" ? "now" : yearMatch[2]}` : "";
};

// Helper function to extract generation name from generation string
export const extractGenerationName = (generation) => {
  // Example: "800 1ST GEN SS80 12.1983 - 06.1986" -> "MARUTI 800 1ST GEN SS80"
  // Remove the year part and clean up
  const withoutYears = generation.replace(/\d{2}\.\d{4}\s*-\s*(\d{2}\.\d{4}|now)/g, '').trim();
  return withoutYears || generation;
};

// Simple hash function for consistent image selection
export const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// Helper function to get generation-specific image
export const getGenerationImage = (modelImage, generationName, generationIndex, makerName, modelName) => {
  // Create a unique identifier for this generation
  const generationKey = `${makerName}-${modelName}-${generationName}-${generationIndex}`.replace(/\s+/g, '-').toLowerCase();
  const hash = Math.abs(hashCode(generationKey));
  
  // Use different car images from Unsplash based on generation hash
  // Each generation will get a different but consistent image
  const carImageIds = [
    '147147',      // Car image 1
    '1542365',     // Car image 2
    '1549824894',  // Car image 3
    '1552519707',  // Car image 4
    '1563729783194', // Car image 5
    '1571013453455', // Car image 6
    '1571782600490', // Car image 7
    '1571782600491', // Car image 8
    '1571782600492', // Car image 9
    '1571782600493', // Car image 10
    '1571782600494', // Car image 11
    '1571782600495', // Car image 12
  ];
  
  const imageId = carImageIds[hash % carImageIds.length];
  
  // Use Unsplash Source API for car images
  // This ensures each generation gets a different but consistent image
  return `https://images.unsplash.com/photo-${imageId}?w=800&h=600&fit=crop&auto=format&q=80`;
};

// Helper function to get body type (default to Saloon for most cars)
export const getBodyType = (modelName) => {
  const name = modelName.toLowerCase();
  if (name.includes("hatchback") || name.includes("800") || name.includes("alto") || name.includes("swift")) {
    return "Hatchback";
  }
  if (name.includes("suv") || name.includes("xuv") || name.includes("scorpio") || name.includes("bolero")) {
    return "SUV";
  }
  if (name.includes("van") || name.includes("ertiga") || name.includes("innova")) {
    return "Van";
  }
  return "Saloon";
};

// Helper function to get default description
export const getModelDescription = (makerName, modelName) => {
  return `The ${modelName} is a compact front wheel drive vehicle with a transverse engine. The Indian manufacturer offers compact 4-door hatchbacks to buyers. ${makerName} ${modelName} parts are distinguished by quality and reliability.`;
};

