import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Bearing = () => {
  const description = useMemo(() => (
    <p>
      Discover a wide range of automotive bearings ensuring smooth
      operation and longevity of your vehicle's components — including
      wheel bearings, clutch bearings, and more.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <p className="text-sm">
          Bearings play a crucial role in automotive systems, enabling smooth
          motion and reducing friction between moving parts. There are various
          types of bearings used in vehicles, each with its specific function.
          In this article, we will delve into some common types of automotive
          bearings, including clutch release bearings, crankshaft bearings,
          wheel bearings, shock absorber bearings, and transmission bearings.
        </p>

        <div>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Clutch Release Bearing
          </h2>
          <p className="text-sm">
            The clutch release bearing, also known as a throw-out bearing, is
            a critical component in manual transmission systems. Positioned
            between the clutch fork and the pressure plate, the clutch release
            bearing disengages the clutch when the clutch pedal is pressed. It
            typically comprises an outer ring, an inner ring, and rolling
            elements, such as balls or rollers. When the clutch pedal is
            depressed, the release bearing applies pressure to the pressure
            plate, releasing the clutch and interrupting power transmission to
            the drivetrain. Proper lubrication and regular maintenance of the
            clutch release bearing are essential for smooth clutch operation
            and to prevent premature wear or damage.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Crankshaft Bearing
          </h2>
          <p className="text-sm">
            The crankshaft bearing is a vital component in an internal
            combustion engine. Located in the engine block, it supports the
            crankshaft, which converts linear motion from the pistons into
            rotational motion. Crankshaft bearings are typically designed as
            journal bearings and can be made of different materials, including
            bi-metal or tri-metal alloys. They are lubricated by engine oil
            and comprise a thin layer of bearing material to reduce friction
            and wear. Regular oil changes and maintenance are crucial to
            ensure proper lubrication and prevent damage to the crankshaft
            bearing, which can lead to engine failure.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Wheel Bearing
          </h2>
          <p className="text-sm">
            Wheel bearings are used in the wheel hubs of a vehicle and are
            responsible for supporting the weight of the vehicle and enabling
            smooth rotation of the wheels. They are subjected to various
            loads, including radial and axial loads, as well as side loads
            during cornering. Wheel bearings are typically designed as ball
            bearings or tapered roller bearings, enclosed in a sealed or
            unsealed unit. Proper lubrication and regular inspection for signs
            of wear, such as noise, vibration, or looseness, are important for
            the safe and reliable operation of wheel bearings. Timely
            replacement of worn wheel bearings is crucial to ensure vehicle
            stability and handling.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Shock Absorber Bearing
          </h2>
          <p className="text-sm">
            Shock absorber bearings, also known as strut bearings or mount
            bearings, are used in the suspension system of a vehicle.
            Positioned between the shock absorber or strut and the vehicle
            body or suspension components, shock absorber bearings allow for
            smooth rotation and movement of the shock absorber or strut. They
            are typically designed as ball bearings or rubber mounts and help
            reduce noise, vibration, and harshness (NVH) in the vehicle.
            Regular inspection and replacement of worn shock absorber bearings
            are necessary to maintain optimal suspension performance and ride
            comfort.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-red-600 mb-2">
            Transmission Bearing
          </h2>
          <p className="text-sm">
            Transmission bearings are used in the transmission system of a
            vehicle and are responsible for supporting the various gears and
            shafts in the transmission. They are designed to withstand high
            rotational speeds and heavy loads. Transmission bearings can be of
            different types, including ball bearings, roller bearings, or
            needle bearings, depending on the specific application. Proper
            lubrication and regular inspection for signs of wear or damage,
            such as gear shifting issues, noise, or vibration, are crucial for
            the smooth and reliable operation of the transmission system.
            Timely replacement of worn transmission bearings is essential to
            ensure optimal gear shifting and prolong the lifespan of the
            transmission.
          </p>
        </div>

        <p className="text-sm">
          In conclusion, bearings are vital components in various automotive
          systems, ensuring smooth motion and reducing friction between moving
          parts. Clutch release bearings, crankshaft bearings, wheel bearings,
          shock absorber bearings, and transmission bearings are some common
          types of bearings used in vehicles.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Bearings"
      categorySlug="bearings"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Bearing;
