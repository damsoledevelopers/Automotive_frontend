/**
 * Generate back URLs for OriParts integration
 * These URLs are used when users click "Buy" links in OriParts OEM catalog
 * and get redirected back to our application
 */

// Get the base URL of the current application
const getBaseUrl = () => {
  // In production, this should be your actual domain
  // For development, it will use localhost
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  // Fallback for SSR or when window is not available
  return process.env.REACT_APP_BASE_URL || 'http://localhost:3000';
};

/**
 * Generate the back_url_id for product detail pages
 * Format: /catalog/part-p-{item_id}/
 */
export const getBackUrlId = () => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/catalog/part-p-{item_id}/`;
};

/**
 * Generate the back_url_pn for part number search
 * Format: /search/{pn}
 */
export const getBackUrlPn = () => {
  const baseUrl = getBaseUrl();
  return `${baseUrl}/search/{pn}`;
};

/**
 * Generate the complete OriParts link with back URLs
 * @param {string} oripartsId - The OriParts catalog ID
 * @param {string} carMaker - Optional car maker name to include in back URLs
 * @returns {string} - Complete OriParts URL with back_url parameters
 */
export const getOriPartsLink = (oripartsId, carMaker = null) => {
  let backUrlId = getBackUrlId();
  let backUrlPn = getBackUrlPn();
  
  // If car maker is provided, include it in the back URLs
  if (carMaker) {
    backUrlId = `${backUrlId}?maker=${encodeURIComponent(carMaker)}`;
    backUrlPn = `${backUrlPn}?maker=${encodeURIComponent(carMaker)}`;
  }
  
  const encodedBackUrlId = encodeURIComponent(backUrlId);
  const encodedBackUrlPn = encodeURIComponent(backUrlPn);
  return `https://oriparts.com/${oripartsId}?back_url_id=${encodedBackUrlId}&back_url_pn=${encodedBackUrlPn}`;
};

