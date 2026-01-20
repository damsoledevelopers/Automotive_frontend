/**
 * Utility function to generate dummy product data for categories
 * Used across all category components to ensure consistent product structure
 */

const brands = ["BOSCH", "BREMBO", "DELPHI", "LUCAS", "ZURICH", "MARUTI SUZUKI", "HONDA", "TOYOTA", "MAHINDRA", "TATA"];
const origins = ["OEM (genuine)", "Aftermarket"];
const sellers = ["Bengaluru/BPN", "Mumbai/MUM", "Delhi/DEL", "Pune/SWA", "Chennai/CHN"];

/**
 * Generate product data for a category item
 * @param {number} id - Product ID
 * @param {string} name - Product name
 * @param {string} img - Product image URL
 * @param {number} basePrice - Base price for the product
 * @param {string} categoryClass - Category class name (e.g., "Brake", "Engine", "Filter")
 * @returns {Object} Product data object
 */
export const generateProductData = (id, name, img, basePrice = 1000, categoryClass = "Parts") => {
  const brand = brands[id % brands.length];
  const isOEM = id % 2 === 1;
  const origin = isOEM ? origins[0] : origins[1];
  const seller = sellers[id % sellers.length];
  const price = Math.round((basePrice + (id * 100)) * 100) / 100;
  const mrp = Math.round(price * 1.2 * 100) / 100;
  const discount = Math.floor(((mrp - price) / mrp) * 100);
  
  return {
    id: id,
    name: name.toUpperCase(),
    brand: brand,
    partNumber: `${brand.substring(0, 2)}-${categoryClass.substring(0, 2).toUpperCase()}-${id.toString().padStart(3, '0')}`,
    price: price,
    mrp: mrp,
    discount: discount,
    isOEM: isOEM,
    fulfilledBySparelo: id % 3 !== 0,
    freeDelivery: id % 2 === 0,
    image: img,
    spareloChoice: id % 4 === 0,
    class: categoryClass,
    soldBy: seller,
    origin: origin,
    deliveryDays: 3 + (id % 3),
    returnDays: 10,
    rating: 4.0 + (id % 10) / 10,
    reviews: 10 + (id * 5),
  };
};

/**
 * Generate category items with product data
 * @param {Array} categories - Array of category objects with id, name, img, link
 * @param {string} categoryClass - Category class name
 * @param {number} basePrice - Base price multiplier
 * @returns {Array} Categories array with product data
 */
export const generateCategoryWithProducts = (categories, categoryClass = "Parts", basePrice = 1000) => {
  return categories.map((category, index) => {
    const productId = category.id || (index + 1);
    const productLink = category.link || `/catalog/part-p-${productId}`;
    
    return {
      ...category,
      link: productLink,
      product: generateProductData(
        productId,
        category.name,
        category.img,
        basePrice + (index * 100),
        categoryClass
      ),
    };
  });
};

