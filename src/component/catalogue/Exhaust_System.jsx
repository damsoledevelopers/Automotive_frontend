import React, { useMemo } from "react";
import CategoryProductList from "./CategoryProductList";

const Exhaust_System = () => {
  const description = useMemo(() => (
    <p>
      Explore our wide range of exhaust system parts designed to enhance your vehicle's performance and efficiency.
    </p>
  ), []);

  const footerContent = useMemo(() => (
    <section className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 md:p-6 rounded-2xl shadow-md transition-all duration-300">
      <div className="space-y-4">
        <p>
          Automobile exhaust system includes an exhaust manifold, car exhaust silencer and a catalytic converter. 
          The latter one is uncommon for old car models, it is installed mostly on modern automobiles. 
          The system realizes the transportation of high-temperature toxic polluting gases out of the entire vehicle, 
          and also reduces the level of noise inside an automobile and the waste gas concentration. 
          Eventually, the environment is polluted much less and an automobile, in its turn, produces less clatter in the process of movement.
        </p>

        <h2 className="text-lg font-semibold text-red-600">How does an exhaust system work?</h2>
        <p>
          After the fuel-air mixture gets burnt all the poisonous gases left or produced get gathered in the collector. 
          The system transports all the elements left after burning to this part of the construction under high pressure. 
          Then all the poisonous compounds are transported from the collector to the receiver pipe.
        </p>
        <p>
          There is extremely high temperature in this part of exhaust system. It can reach up to one thousand degrees centigrade. 
          Then the gases get directly to the catalyzator through the goffer of the receiver pipe. 
          In this area of the system poisonous compounds that left mostly burn down and the toxic level of exhaust gas gets reduced. 
          In some models of cars the catalyzator essentially reduces the level of engine noise in addition to the resonator. 
          After gas-like products of burning pass the catalyzator and resonator they get inside the automobile silencer which additionally reduces 
          the noise produced and finally lets the rests of burnt compounds out of the automobile's body.
        </p>

        <h2 className="text-lg font-semibold text-red-600">How to notice foul-ups in the exhaust system?</h2>
        <p>The following symptoms can help you find out that your car has some problems with its exhaust system:</p>
        <ul className="list-disc list-inside space-y-1">
          <li>The movement of gases out of the silencer for car comes with unusually loud noise.</li>
          <li>The engine noticeably loses its power — for example, you may notice reduced acceleration.</li>
          <li>The engine works in an unstable manner, and you can notice RPM fluctuations at idle.</li>
          <li>You can notice a strong smell of exhaust gases inside the car.</li>
          <li>The details inside the construction get covered with carbon black.</li>
        </ul>
        <p>
          In case you notice at least one symptom out of the list, it is recommended to immediately apply to the car service station. 
          There is no point in waiting for the car to "heal itself" — otherwise, the damage may spread incrementally, 
          and engine repair costs will increase significantly.
        </p>
        <p>
          Mechanical damages and component rusting are the most widely spread reasons for exhaust system malfunction.
        </p>

        <h2 className="text-lg font-semibold text-red-600">Where to buy spare parts for exhaust system?</h2>
        <p>
          There is a great list of original and aftermarket car spare parts from all over the world available at reasonable prices in our online shop. 
          We cooperate with a great number of car manufacturers and can easily pick up the necessary spares for any automobile make.
        </p>
        <p>
          Have a look at the price list, and if you need assistance selecting a component or placing an order, 
          please get in touch with us using any preferred means of communication.
        </p>
      </div>
    </section>
  ), []);

  return (
    <CategoryProductList
      categoryName="Exhaust System"
      categorySlug="exhaust_system"
      description={description}
      footerContent={footerContent}
    />
  );
};

export default Exhaust_System;
