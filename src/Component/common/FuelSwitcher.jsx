import { useContext } from "react";
import { FuelContext } from "../../pages/context/FuelContext";

import { fuelConfig } from "../../pages/Util/fuelConfig";

const FuelSwitcher = () => {
  const { selectedFuel, setSelectedFuel } = useContext(FuelContext);

  return (
    <div className="flex gap-2 bg-white/5 p-1 rounded-xl">
      {Object.keys(fuelConfig).map((key) => {
        const fuel = fuelConfig[key];
        const active = selectedFuel === key;

        return ( 
          <button
            key={key}
            onClick={() => setSelectedFuel(key)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition
              ${
                active
                  ? "bg-green-500 text-black"
                  : "text-gray-300 hover:bg-white/10"
              }`}
          >
            <span className="mr-1">{fuel.icon}</span>
            {fuel.label}
          </button>
        );
      })}
    </div>
  );
};

export default FuelSwitcher;
