import React from "react";

export const MyWishlist = () => {
  return (
    <div className="px-10 py-10">
     
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          My <span className="text-red-500">Wishlist</span>
        </h1>
       
      </div>

      {/* Content (unchanged) */}
      <div className="flex flex-col justify-center items-center min-h-[60vh] text-center px-6">
        <h2 className="text-cyan-800 font-semibold text-2xl mb-4">
          No Wishlists Created
        </h2>
        <p className="text-gray-700 mb-6">
         Add your first wishlist to create a collection of parts for future use
        </p>
        <button className="bg-red-400 hover:bg-red-500 text-white rounded py-4 px-6 font-semibold">
         Add Wishlist now
        </button>
      </div>
    </div>
  );
};
