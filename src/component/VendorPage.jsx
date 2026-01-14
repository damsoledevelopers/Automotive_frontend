import React, { useState } from "react";
import SellOnSpareloForm from "../assets/SellOnSperalo";
// import your form

const VendorPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="main-content max-w-6xl mx-auto px-4 py-8">
      {/* Banner */}
      <div className="flex flex-col items-center justify-center bg-red-400 px-6 py-12 text-white shadow-lg">
        <h2 className="text-4xl md:text-5xl font-extrabold mb-4 tracking-wide">
          Sell On <span className="text-red-600"> Sparelo </span>
        </h2>
        <h2 className="text-lg md:text-2xl font-medium">
          By joining us as a vendor
        </h2>
      </div>

      {/* Intro */}
      <h2 className="text-center mt-6 text-lg text-gray-700">
        Partner with Sparelo as a vendor for seamless and rapid sales of your
        spare parts, maximising both your benefits and business opportunities!
      </h2>

      {/* Benefits Section */}
      <h1 className="text-2xl font-bold mt-10 mb-4">Benefits for our vendor:</h1>
      <ul className="list-disc list-inside space-y-4 text-gray-700">
        <li><strong>Showcase to Millions:</strong> Showcase your products to over 3 million users monthly.</li>
        <li><strong>Faster Stock Liquidation:</strong> Turn your inventory faster and increase cash flow.</li>
        <li><strong>Sell Slow Moving Items:</strong> Higher chances of selling slow-moving items.</li>
        <li><strong>Daily Orders:</strong> Boost inventory rotation with daily orders.</li>
        <li><strong>Minimise Risks:</strong> Reduce risks with fewer human interactions.</li>
      </ul>

      {/* Requirements Section */}
      <h2 className="text-xl font-semibold mt-12 mb-4">
        Here's what we require from our vendor:
      </h2>
      <ul className="list-disc list-inside space-y-4 text-gray-700">
        <li><strong>Digitally Enabled Stock:</strong> Digitally managed spare parts stock.</li>
        <li><strong>Genuine Parts:</strong> Authentic, high-quality spare parts.</li>
        <li><strong>Reliable Source:</strong> Ensure consistent delivery timelines.</li>
        <li><strong>Timely Response:</strong> Prompt response to queries and requests.</li>
        <li><strong>Price Match Guarantee:</strong> Prices must match invoice prices.</li>
      </ul>

      {/* CTA Button */}
      <div className="text-center my-12">
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-red-400 hover:bg-red-500 text-white px-6 py-3 rounded-lg font-semibold"
        >
          {showForm ? "Close Form" : "Click Here to Join"}
        </button>
      </div>

      {/* Form Section */}
      {showForm && <SellOnSpareloForm />}
    </div>
  );
};

export default VendorPage;
