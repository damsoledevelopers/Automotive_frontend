import React from "react";
import { useParams, useLocation } from "react-router-dom";
import CategoryProductList from "./CategoryProductList";

/**
 * Generic Category Page Component
 * Wraps CategoryProductList and provides category-specific data
 * Used for all categories: Belt, Brake, Engine Oil, Filters, Engine, etc.
 */
const CategoryPage = ({ products = [], categoryName = "" }) => {
  const { category } = useParams();
  const location = useLocation();

  // Get category data from location state or construct from params
  const categoryData = location.state?.category || {
    name: categoryName || category || "Products",
    slug: category || "",
  };

  // If no products provided, use empty array (can be fetched from API)
  const categoryProducts = products.length > 0 
    ? products 
    : location.state?.products || [];

  return (
    <CategoryProductList
      categoryName={categoryData.name}
      categorySlug={categoryData.slug}
      products={categoryProducts}
      defaultFilters={categoryData}
    />
  );
};

export default CategoryPage;

