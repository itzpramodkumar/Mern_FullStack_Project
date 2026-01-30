import { useContext } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";
const stockData = {
  petrol: { available: 12500, capacity: 20000 },
  diesel: { available: 9800, capacity: 18000 },
  lpg: { available: 4200, capacity: 8000 },
  cng: { available: 3600, capacity: 7000 },
};

const FuelStock = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];
  const stock = stockData[selectedFuel];

  const percentage = Math.round(
    (stock.available / stock.capacity) * 100
  );

  const lowStock = percentage < 25;

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              {fuel.label} Stock Management
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Unit: {fuel.unit}
            </p>
          </div>

          {/* STOCK CARD */}
          <div className="glass p-6 neon-border max-w-xl">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">
                Available Stock
              </h2>

              {lowStock && (
                <span className="text-xs px-3 py-1 rounded-full bg-red-500/20 text-red-400">
                  Low Stock
                </span>
              )}
            </div>

            <p className="text-4xl font-bold mb-2">
              {stock.available.toLocaleString()}{" "}
              <span className="text-lg font-medium">
                {fuel.unit}
              </span>
            </p>

            <p className="text-sm text-gray-400 mb-4">
              Capacity: {stock.capacity.toLocaleString()} {fuel.unit}
            </p>

            {/* PROGRESS BAR */}
            <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
              <div
                className={`h-full ${
                  lowStock ? "bg-red-500" : "bg-green-500"
                }`}
                style={{ width: `${percentage}%` }}
              />
            </div>

            <p className="text-sm text-gray-400 mt-2">
              {percentage}% of total capacity used
            </p>
          </div>

          {/* INFO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-5">
              <p className="text-sm text-gray-400">
                Last Updated
              </p>
              <h3 className="text-lg font-semibold mt-1">
                Today, 09:30 AM
              </h3>
            </div>

            <div className="glass p-5">
              <p className="text-sm text-gray-400">
                Daily Consumption
              </p>
              <h3 className="text-lg font-semibold mt-1">
                850 {fuel.unit}
              </h3>
            </div>

            <div className="glass p-5">
              <p className="text-sm text-gray-400">
                Refill Recommendation
              </p>
              <h3 className="text-lg font-semibold mt-1">
                {lowStock ? "Immediate" : "Not Required"}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelStock;
