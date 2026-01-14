import { useState } from "react";

export default function SellOnSperaloForm() {
  const [formData, setFormData] = useState({
    businessName: "",
    email: "",
    phone: "",
    city: "",
    stock: "",
    brand: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    
    // Open a new page on submit (replace URL with your target page)
    window.open("https://docs.google.com/forms/d/e/1FAIpQLSfIQgAfx-QzKjZYpinloXjK4ZGHfFV7tlFddHqAT2qP3sJkZw/viewform", "_blank");
  };

  
  return (
    <div className="max-w-xl mx-auto p-6 bg-purple-100 shadow-md rounded-lg mt-10">
      <h1 className="text-3xl font-bold mb-2">Sell on Sparelo</h1>
      <p className="mb-6 text-gray-700">
        Share your details and our team will connect with you to help you with onboarding!
      </p>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Business Name */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Enter name of your business <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="businessName"
            value={formData.businessName}
            onChange={handleChange}
            required
            placeholder="Your answer"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Enter your email id
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your answer"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Enter your phone number <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            pattern="[5-9]{1}[0-9]{9}"
            placeholder="Your answer"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Select your city <span className="text-red-500">*</span>
          </label>
          <select
            name="city"
            value={formData.city}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
          >
            <option value="">Select your city</option>
            <option>Delhi</option>
            <option>Bengaluru</option>
            <option>Pune</option>
            <option>Jaipur</option>
            <option>Kolkata</option>
            <option>Hyderabad</option>
            <option>Kochi</option>
            <option>Chennai</option>
            <option>Other</option>
          </select>
        </div>

        {/* Spare Parts Stock */}
        <div>
          <span className="block text-gray-700 font-medium mb-2">
            Do you own spare parts stock? <span className="text-red-500">*</span>
          </span>
          <div className="flex gap-4">
            {["Yes", "No"].map((option) => (
              <label key={option} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="stock"
                  value={option}
                  checked={formData.stock === option}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                {option}
              </label>
            ))}
          </div>
        </div>

        {/* Primary Brand */}
        <div>
          <span className="block text-gray-700 font-medium mb-2">
            Which is the primary brand you deal with? <span className="text-red-500">*</span>
          </span>
          <div className="flex flex-wrap gap-4">
            {["Maruti Suzuki", "Hyundai/Kia", "Honda", "Other"].map((brand) => (
              <label key={brand} className="flex items-center gap-2">
                <input
                  type="radio"
                  name="brand"
                  value={brand}
                  checked={formData.brand === brand}
                  onChange={handleChange}
                  className="accent-blue-500"
                />
                {brand}
              </label>
            ))}
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
