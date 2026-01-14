// 











import React from "react";

const features = [
  {
    title: "Original Products",
    description: "Only reliable parts from trusted Aftermarket brands.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 86 75"
        className="w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110"
      >
        <circle cx="40" cy="40" r="35" fill="url(#grad1)" />
        <defs>
          <linearGradient id="grad1" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#ff7b7b" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Affordable Rates",
    description:
      "Repairing a damaged vehicle can be expensive. Aftermarket products are a good solution if you're on a budget.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 65 80"
        className="w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110"
      >
        <rect width="50" height="50" fill="url(#grad2)" />
        <defs>
          <linearGradient id="grad2" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#ff7b7b" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
  {
    title: "Wide Availability",
    description:
      "Aftermarket parts are easily available, ensuring faster repairs and minimal downtime.",
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 67 67"
        className="w-16 h-16 mx-auto transition-transform duration-300 group-hover:scale-110"
      >
        <path d="M33.5 10 L57 55 H10 L33.5 10 Z" fill="url(#grad3)" />
        <defs>
          <linearGradient id="grad3" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor="#ff4d4d" />
            <stop offset="100%" stopColor="#ff7b7b" />
          </linearGradient>
        </defs>
      </svg>
    ),
  },
];

export default function WhyChooseAftermarket() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-50 via-white to-pink-50">
      <div className="max-w-7xl mx-auto px-6 text-center">
        {/* Title */}
        <h3 className="text-4xl font-bold mb-12 text-gray-800">
          Why Choose{" "}
          <span className="text-red-500 font-bold">
            Aftermarket Products?
          </span>
        </h3>

        {/* Feature Cards */}
        <ul className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <li
              key={index}
              className="group relative p-8 bg-white rounded-2xl border border-gray-200 shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-red-100 to-transparent opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500"></div>

              <div className="relative z-10">
                <div className="mb-5 flex justify-center">{feature.icon}</div>
                <h4 className="text-xl font-semibold text-gray-800 group-hover:text-red-500 transition-colors">
                  {feature.title}
                </h4>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
