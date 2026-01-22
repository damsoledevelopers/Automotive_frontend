import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Suspention_Arms = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of suspension and arm components designed for optimal performance and safety.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">About Car Air Suspension</h2>

        <p>
          The air suspension is one of the types of vehicle suspension. It is powered by an electric air pump
          that inflates flexible bellows, disconnecting the chassis from the axle. Some systems use pressurized
          liquid for the same function. This setup ensures a smooth and stable driving experience, supports
          the vehicle's weight, and absorbs road shocks. Many low-riding trucks use this system to keep the
          wheels even and reduce body roll when turning.
        </p>

        <h2 className="text-2xl font-bold text-red-600">
          When Should Car Air Suspension Be Replaced?
        </h2>

        <p>
          The air suspension in cars should generally be replaced between <strong>50,000</strong> and{" "}
          <strong>70,000 miles</strong>, or every 10 years. However, you should check it sooner if you notice
          any issues. Common signs of a failing air suspension include:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            The car begins to sink because the suspension can no longer support its weight, affecting
            performance.
          </li>
          <li>
            The compressor continues running instead of stopping once the desired air pressure is reached.
          </li>
          <li>
            The ride becomes rough and bumpy, with noticeable rolling or leaning during braking or cornering.
          </li>
        </ul>

        <p>
          If you observe any of these signs, seek professional inspection immediately. Replacing worn-out
          suspension components early can prevent more costly damage and ensure safe driving.
        </p>

        <h2 className="text-2xl font-bold text-red-600">Our Advantages</h2>

        <p>
          Buying air suspension parts is easier than ever with <strong>sparelo</strong> — India's largest
          online marketplace for car spare parts. You can purchase quality air suspension components with
          warranty and enjoy a seamless shopping experience. Here's what you get:
        </p>

        <ul className="list-decimal list-inside space-y-2 pl-4">
          <li>
            Efficient search tools — find parts using the ID number, VIN, or other specifications to speed up
            your search.
          </li>
          <li>
            Access to your personal account — manage favorites, track sellers, and easily reorder from
            suppliers.
          </li>
          <li>
            A vast catalog — browse a wide range of products with clear images and detailed descriptions.
          </li>
          <li>
            Convenient ordering — choose from multiple payment and delivery options with email confirmations
            for every purchase.
          </li>
        </ul>

        <p>
          Looking for affordable, high-quality air suspension systems like <strong>AirRide</strong> or{" "}
          <strong>AirLift</strong>? You'll find them all in the <strong>sparelo</strong> catalog. Browse freely
          without registration and contact us for assistance anytime.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Suspension and Arms"
      categorySlug="suspension_arms"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Suspention_Arms;
