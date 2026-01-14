"use client";
import React from "react";
import OEMCatalogue from "./OEMCatalogue";
import ReplacementParts from "./ReplacementParts";
import SeoSection from "./SeoSection";

const CatalogPage = () => {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 py-6 sm:py-8 md:py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Breadcrumbs */}
        <nav className="text-xs sm:text-sm text-gray-600 mb-4 sm:mb-6 flex items-center gap-2">
          <a href="/" className="hover:text-red-600 transition-colors">Home</a>
          <span>/</span>
          <span className="text-gray-800 font-medium">Catalog</span>
        </nav>

        {/* Heading */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-6 sm:mb-8 md:mb-10 text-center leading-tight">
          Genuine (Original Equipment Manufacturer) & Aftermarket Spare Parts
        </h1>

        {/* OEM Catalogue */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <OEMCatalogue />
        </div>

        {/* Replacement Parts */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <ReplacementParts />
        </div>

        {/* SEO Info Section */}
        <SeoSection />
      </div>
    </main>
  );
};

export default CatalogPage;
