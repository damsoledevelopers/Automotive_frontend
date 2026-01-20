import React from "react";
import { useParams, useLocation, Navigate } from "react-router-dom";
import CategoryProductList from "./CategoryProductList";
import ProductDetail from "../ProductDetail";

/**
 * Generic Sub-Category Page Component
 * Handles dynamic sub-category routes like /catalog/4079-accessory_kit_disc_brake_pads/
 * Uses CategoryProductList to display products
 */
const SubCategoryPage = () => {
  const params = useParams();
  const location = useLocation();
  
  // Extract category name from URL path
  const pathSegments = location.pathname.split('/');
  const lastSegment = pathSegments[pathSegments.length - 1] || pathSegments[pathSegments.length - 2];
  
  // If this is a product detail route (starts with "part-p-"), render ProductDetail directly
  // This handles cases where React Router matches the catch-all route instead of the specific route
  if (lastSegment && lastSegment.startsWith('part-p-')) {
    // Render ProductDetail component directly with the same state
    return <ProductDetail />;
  }
  
  // Also check categorySlug from params
  const { categorySlug } = params;
  if (categorySlug && categorySlug.startsWith('part-p-')) {
    return <ProductDetail />;
  }
  
  // Convert URL slug to readable name (e.g., "accessory_kit_disc_brake_pads" -> "Accessory Kit Disc Brake Pads")
  const categoryName = lastSegment
    .replace(/^\d+-/, '') // Remove leading numbers and dash
    .split('_')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  // Get category data from location state or construct from params
  const categoryData = location.state?.category || {
    name: categoryName,
    slug: lastSegment,
  };

  // Mock products - In real app, this would be fetched based on the category
  // For now, return empty array so CategoryProductList shows "No products found"
  // This can be replaced with actual API call or product mapping
  const products = location.state?.products || [];

  return (
    <CategoryProductList
      categoryName={categoryData.name}
      categorySlug={categoryData.slug}
      products={products}
      defaultFilters={categoryData}
    />
  );
};

export default SubCategoryPage;

