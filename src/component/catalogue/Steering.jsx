import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Steering = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of steering components designed for optimal performance and safety.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300 my-10">
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-red-600">Car Steering System Parts</h2>

        <p>
          The steering system allows a driver to precisely control the vehicle's direction and stability.
          It consists of several key components that work together to convert the driver's input from the
          steering wheel into motion of the wheels.
        </p>

        <p>The mechanism operates using the following parts:</p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>
            <strong>Steering wheel:</strong> The driver controls the car using this component. Modern versions
            often include buttons or sensors for driving torque and steering angle detection.
          </li>
          <li>
            <strong>Steering mechanism:</strong> Increases the driver's input power and transmits it to the
            steering gear connection. The most common type is the rack-and-pinion mechanism, consisting of a
            toothed gear connected to a rack.
          </li>
          <li>
            <strong>Steering tube:</strong> Connects the steering wheel to the steering mechanism.
          </li>
          <li>
            <strong>Steering linkage:</strong> Transfers the turning force from the steering wheel to the
            vehicle's front wheels.
          </li>
          <li>
            <strong>Additional power steering components:</strong> Installed to reduce the effort required by
            the driver.
          </li>
        </ul>

        <p>
          To make steering smoother and reduce physical effort, vehicles use various types of power steering
          systems. Depending on the design, there are three main types:
        </p>

        <ul className="list-disc list-inside space-y-2 pl-4">
          <li>Hydraulic power steering</li>
          <li>Electric power steering</li>
          <li>Hybrid electric-hydraulic power steering</li>
        </ul>

        <p>
          Some car brands also include <strong>rear axle control</strong> mechanisms to enhance stability and
          reduce the risk of sideslip. Additionally, modern advancements have introduced
          <strong> steer-by-wire systems</strong>, although the lack of mechanical feedback can increase
          accident risk if not properly managed.
        </p>

        <h2 className="text-2xl font-bold text-red-600">How to Buy Car Steering Parts in India Quickly?</h2>

        <p>
          There's no need to spend hours searching for steering system parts in stores or markets. At{" "}
          <strong>sparelo</strong>, you'll find a complete list of steering system components from top global
          manufacturers at the best prices. Our easy-to-navigate online catalog helps you quickly find,
          compare, and order genuine or high-quality replacement steering parts for your vehicle.
        </p>

        <p>
          Shop conveniently from home and ensure your car maintains excellent control, precision, and safety
          with reliable steering components from <strong>sparelo</strong>.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Steering"
      categorySlug="steering"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Steering;
