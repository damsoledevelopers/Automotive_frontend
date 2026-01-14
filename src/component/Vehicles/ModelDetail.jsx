import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { FaHome, FaWrench, FaCheckCircle } from "react-icons/fa";
import { getVehicleImageUrl } from "../../data/vehicleData";
import VehicleBreadcrumbs from "./VehicleBreadcrumbs";
import { categories } from "../SearchByCategory";
import { marutiModels } from "./Maruti";
import { hyundaiModels } from "./Hyundai";
import { tataModels } from "./Tata";
import { mahindraModels } from "./Mahindra";
import { chevroletModels } from "./Chevrolet";
import { hondaModels } from "./Honda";
import { skodaModels } from "./Skoda";
import { vwModels } from "./Vw";
import { toyotaModels } from "./Toyota";
import { nissanModels } from "./Nissan";
import { renaultModels } from "./Renault";
import { fordModels } from "./Ford";
import { fiatModels } from "./Fiat";
import { kiaModels } from "./Kia";
import { ashokLaylandModels } from "./AshokLayland";
import { audiModels } from "./Audi";

// Map of all vehicle models by maker
const allVehicleModels = {
  MARUTI: marutiModels,
  HYUNDAI: hyundaiModels,
  TATA: tataModels,
  MAHINDRA: mahindraModels,
  CHEVROLET: chevroletModels,
  HONDA: hondaModels,
  SKODA: skodaModels,
  VW: vwModels,
  TOYOTA: toyotaModels,
  NISSAN: nissanModels,
  RENAULT: renaultModels,
  FORD: fordModels,
  FIAT: fiatModels,
  KIA: kiaModels,
  "ASHOK LEYLAND": ashokLaylandModels,
  AUDI: audiModels,
};

// Helper function to parse modification options and extract specifications
const parseModification = (option) => {
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
const extractYears = (generation) => {
  // Example: "1000 10.1990 - 05.2000" -> "10.1990 - 05.2000"
  const yearMatch = generation.match(/(\d{2}\.\d{4})\s*-\s*(\d{2}\.\d{4}|now)/);
  return yearMatch ? `${yearMatch[1]} - ${yearMatch[2] === "now" ? "now" : yearMatch[2]}` : "";
};

// Helper function to extract generation name from generation string
const extractGenerationName = (generation) => {
  // Example: "800 1ST GEN SS80 12.1983 - 06.1986" -> "MARUTI 800 1ST GEN SS80"
  // Remove the year part and clean up
  const withoutYears = generation.replace(/\d{2}\.\d{4}\s*-\s*(\d{2}\.\d{4}|now)/g, '').trim();
  return withoutYears || generation;
};

// Helper function to get generation-specific image
const getGenerationImage = (modelImage, generationName, generationIndex, makerName, modelName) => {
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
  
  // Note: If you have actual generation-specific image URLs from your data source,
  // you can modify this function to use those instead
};

// Simple hash function for consistent image selection
const hashCode = (str) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32bit integer
  }
  return hash;
};

// Helper function to get body type (default to Saloon for most cars)
const getBodyType = (modelName) => {
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
const getModelDescription = (makerName, modelName) => {
  return `The ${modelName} is a compact front wheel drive vehicle with a transverse engine. The Indian manufacturer offers compact 4-door hatchbacks to buyers. ${makerName} ${modelName} parts are distinguished by quality and reliability.`;
};

const ModelDetail = () => {
  const { maker, modelId } = useParams();
  const navigate = useNavigate();
  
  // Normalize maker name
  const makerName = maker?.toUpperCase().replace(/-/g, " ");
  const normalizedMaker = makerName === "ASHOK LAYLAND" ? "ASHOK LEYLAND" : makerName;
  
  // Get models for this maker
  const models = allVehicleModels[normalizedMaker] || [];
  
  // Find the model by ID or name
  const model = models.find(
    (m) => m.id === parseInt(modelId) || 
           m.name.toLowerCase().replace(/\s+/g, "-") === modelId?.toLowerCase()
  ) || models.find(
    (m) => m.name.toLowerCase().replace(/\s+/g, "-").includes(modelId?.toLowerCase() || "")
  );
  
  if (!model) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Model Not Found</h1>
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }
  
  // Group modifications by generation
  const generations = [];
  if (model.modifications && Array.isArray(model.modifications) && model.modifications.length > 0) {
    model.modifications.forEach((modGroup) => {
      let generationName = extractGenerationName(modGroup.generation || "");
      // Prepend model name if generation doesn't already include it
      const modelNameWithoutMaker = model.name.replace(new RegExp(`^${normalizedMaker}\\s*`, 'i'), '').trim();
      if (!generationName.toUpperCase().includes(modelNameWithoutMaker.toUpperCase())) {
        generationName = `${model.name} ${generationName}`;
      } else {
        // Ensure maker name is included
        if (!generationName.toUpperCase().includes(normalizedMaker)) {
          generationName = `${normalizedMaker} ${generationName}`;
        }
      }
      const years = extractYears(modGroup.generation || "") || model.years;
      
      // Parse all options for this generation
      const specifications = [];
      if (modGroup.options && Array.isArray(modGroup.options)) {
        modGroup.options.forEach((option) => {
          const spec = parseModification(option);
          specifications.push({
            ...spec,
            year: years,
          });
        });
      }
      
      // Get first specification for general specs
      const firstSpec = specifications[0] || {};
      
      generations.push({
        name: generationName,
        years: years,
        specifications: specifications,
        engine: firstSpec.engine || "",
        engineType: firstSpec.engineType || "Petrol",
        bodyType: getBodyType(model.name),
        image: getGenerationImage(
          model.image,
          generationName,
          generations.length,
          normalizedMaker,
          model.name
        ),
      });
    });
  } else {
    // Fallback: create a single generation with default data
    const defaultSpec = parseModification(model.modifications?.[0]?.options?.[0] || "1.0L Petrol");
    generations.push({
      name: model.name,
      years: model.years,
      specifications: [{
        modification: defaultSpec.modification || "1.0L",
        emission: "",
        year: model.years,
        engine: defaultSpec.engine || "1.0 L",
        engineType: defaultSpec.engineType || "Petrol",
        power: defaultSpec.power || "46 h.p.",
        engineCode: defaultSpec.engineCode || "F10A",
      }],
      engine: defaultSpec.engine || "1.0 L",
      engineType: defaultSpec.engineType || "Petrol",
      bodyType: getBodyType(model.name),
      image: model.image || getVehicleImageUrl(normalizedMaker, model.name),
    });
  }
  
  // Get first generation for main display (if needed)
  const firstGeneration = generations[0] || {};
  
  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <VehicleBreadcrumbs modelName={model.name} />
      </div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
        {/* Render each generation as a separate section */}
        {generations.map((generation, genIndex) => (
          <div key={genIndex} className={genIndex > 0 ? "mt-8 sm:mt-12" : ""}>
            {/* Generation Title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-blue-500 mb-2 sm:mb-3 uppercase">
              {generation.name}
            </h2>
            
            {/* Production Years */}
            <p className="text-sm sm:text-base text-gray-700 mb-4 sm:mb-6">
              {generation.years}
            </p>
            
            {/* Car Image and Info Section */}
            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-6 sm:mb-8">
              {/* Car Image */}
              <div className="w-full md:w-1/3 flex-shrink-0">
                <img
                  src={generation.image || model.image || getVehicleImageUrl(normalizedMaker, model.name)}
                  alt={generation.name}
                  className="w-full h-auto object-contain bg-gray-50 p-3 sm:p-4 rounded"
                  onError={(e) => {
                    // Fallback to model image or placeholder
                    if (e.target.src !== model.image) {
                      e.target.src = model.image || getVehicleImageUrl(normalizedMaker, model.name) || 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(generation.name);
                    } else {
                      e.target.src = 'https://via.placeholder.com/400x300?text=' + encodeURIComponent(generation.name);
                    }
                  }}
                />
              </div>
              
              {/* Car Information */}
              <div className="flex-1">
                {/* Key Specifications */}
                <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-5">
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-24 sm:w-32 text-xs sm:text-sm">Engine:</span>
                    <span className="text-gray-900 text-xs sm:text-sm">{generation.engine || "-"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-24 sm:w-32 text-xs sm:text-sm">Engine type:</span>
                    <span className="text-gray-900 text-xs sm:text-sm">{generation.engineType || "Petrol"}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-gray-600 font-medium w-24 sm:w-32 text-xs sm:text-sm">Body type:</span>
                    <span className="text-gray-900 text-xs sm:text-sm">{generation.bodyType}</span>
                  </div>
                </div>
                
                {/* Description - Only show on first generation */}
                {genIndex === 0 && (
                  <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                    {getModelDescription(normalizedMaker, model.name)}
                  </p>
                )}
              </div>
            </div>
            
            {/* Specifications Table for this Generation */}
            {generation.specifications.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Modification
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Emission
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Year
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Engine
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Engine Type
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Power (hp)
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Engine code
                        </th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider border-b">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {generation.specifications.map((spec, index) => (
                        <tr key={index} className="hover:bg-gray-50">
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-900">
                            {spec.modification || "-"}
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                            {spec.emission || "-"}
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                            {spec.year || generation.years}
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                            {spec.engine || "-"}
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                            {spec.engineType || "Petrol"}
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                            {spec.power || "-"}
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm text-gray-600">
                            {spec.engineCode || "-"}
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm">
                            <div className="flex gap-1.5 sm:gap-2">
                              <button className="px-2 sm:px-3 py-1 sm:py-1.5 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition text-xs font-medium whitespace-nowrap">
                                Service Kit
                              </button>
                              <button className="px-2 sm:px-3 py-1 sm:py-1.5 border border-blue-500 text-blue-500 rounded hover:bg-blue-50 transition text-xs font-medium whitespace-nowrap">
                                Choose
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        ))}
        
        {/* Parts and Accessories Section */}
        <div className="mt-12 sm:mt-16">
          {/* Red Accent Line */}
          <div className="w-16 h-0.5 bg-red-600 mb-4 md:mb-5"></div>
          
          {/* Section Header */}
          <div className="mb-5 md:mb-6">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-2 md:mb-3">
              {model.name.toUpperCase()} Parts and <span className="text-red-600">Accessories</span>
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium">
              Discover high-quality car parts and accessories organized into convenient categories
            </p>
          </div>
          
          {/* Filter/Search Bar */}
          <div className="relative w-full sm:w-64 mb-6">
            <input
              type="text"
              placeholder="Filter Category"
              className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 text-sm"
            />
            <svg
              className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          
          {/* Category Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
            {/* All categories imported from SearchByCategory.jsx */}
            {categories.map((category) => (
              <Link
                key={category.title}
                to={category.href}
                className="group flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 mb-3 flex items-center justify-center">
                  <img 
                    src={category.img} 
                    alt={category.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300" 
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/80x80?text=' + category.title.substring(0, 2);
                    }}
                  />
                </div>
                <span className="text-center font-semibold text-gray-700 text-xs sm:text-sm group-hover:text-red-600 transition-colors duration-300">
                  {category.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModelDetail;

