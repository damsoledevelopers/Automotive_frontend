import React, { useState } from "react";
import { Sun, Moon } from "lucide-react"; // optional icons, run: npm install lucide-react

export default function SpareloPage() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div
      className={`min-h-screen flex justify-center py-10 px-6 transition-all duration-300 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-800"
      }`}
    >
      <div
        className={`max-w-4xl w-full p-8 rounded-2xl shadow-lg transition-all duration-300 ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        {/* Header with Theme Toggle */}
        <div className="flex justify-between items-center mb-6">
          <h1
            className={`text-3xl font-bold ${
              darkMode ? "text-lime-400" : "text-green-800"
            }`}
          >
            Sparelo.com – #1 Online Marketplace to Sell or Buy Car Parts
          </h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full transition hover:bg-gray-200 dark:hover:bg-gray-700"
            title="Toggle Theme"
          >
            {darkMode ? <Sun size={22} /> : <Moon size={22} />}
          </button>
        </div>

        {/* Introduction */}
        <p className="mb-6 leading-relaxed">
          Using your own car gives you independence from external circumstances
          and the opportunity to plan your day exactly how you want. No rush to
          miss urban transport and even be late for work because of outside
          factors. With your own car, you feel free and have the ability to
          address business and pleasure travel as you want. All these reasons
          have a huge influence on the number of vehicles on the road. Among
          them are passenger cars, lorries, buses, etc.
          <br />
          <br />
          Bringing this into focus: in 1986 there were only 500 million cars in
          the whole world. And in 2010 the number increased to 1 billion
          vehicles. Researchers with the International Energy Agency suggest
          that by the year 2035 nearly 25 percent of the world population will
          own a car. According to research, the current number is going to
          increase to 1.7 billion. That's why{" "}
          <span className="font-semibold text-lime-600 dark:text-lime-400">
            auto car spare parts
          </span>{" "}
          are in demand among car owners. Sparelo.com is a car parts marketplace
          in India, which pursues the aim to organize the replacement parts
          market and make the shopping process easier and more convenient.
        </p>

        {/* Offer Section */}
        <SectionTitle darkMode={darkMode} title="The offer from Sparelo.com" />
        <p className="mb-6 leading-relaxed">
          Our project was established in 2015. Over this time we have been
          working on our goal – to help customers and suppliers in auto car
          spare parts sales and communication. This advertising platform was
          created to make online shopping easier for both automobile owners and
          parts dealers. Customers get an opportunity to{" "}
          <span className="font-semibold text-lime-600 dark:text-lime-400">
            buy car parts online
          </span>
          , which are branded and original. Our continuously updated catalogs are
          filled with replacement parts from well-known and highly regarded
          brands. This provides auto parts suppliers with the ability to offer
          their products, communicate with clients, and increase sales along
          with their market share.
        </p>

        {/* Work Section */}
        <SectionTitle
          darkMode={darkMode}
          title="How do we work: key features of Sparelo.com"
        />
        <p className="mb-6 leading-relaxed">
          Clear and transparent offers. We do not promote any particular
          suppliers — all parts are sorted by producers' information and
          filtered by customers’ choice. Quick and competent service. If any
          problems occur, Sparelo.com will put its best foot forward to solve
          issues. Easy-to-read catalogs with the latest offers. Every day new
          products with actual prices appear. We created a simple and
          easy-to-understand website that’s both useful and mobile-friendly, so
          our visitors can order car parts from personal computers, laptops,
          tablets, or smartphones.
        </p>

        {/* Reasons Section */}
        <SectionTitle
          darkMode={darkMode}
          title="2 main reasons to choose Sparelo.com"
        />
        <ul className="list-decimal ml-6 space-y-3">
          <li className="transition hover:translate-x-1">
            <span className="font-semibold text-lime-600 dark:text-lime-400">
              10 Days Assured Return.
            </span>{" "}
            If a spare part will not be applicable to your car, we will initiate
            the return process after your request. The return process is very
            smooth and simple.
          </li>
          <li className="transition hover:translate-x-1">
            We are creating our catalogs by collecting relevant information from
            the market. We are responsible for product descriptions and keep our
            sellers accountable for offer terms and the genuineness of the
            product sold.
          </li>
        </ul>
      </div>
    </div>
  );
}

/* --- Reusable Title Component --- */
function SectionTitle({ title, darkMode }) {
  return (
    <h2
      className={`text-xl font-semibold mb-2 mt-8 transition-colors ${
        darkMode ? "text-lime-400" : "text-lime-700"
      }`}
    >
      {title}
    </h2>
  );
}
