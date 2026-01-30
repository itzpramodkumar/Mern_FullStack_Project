import { useState } from "react";

const initialFuels = [
  {
    key: "petrol",
    name: "Petrol",
    enabled: true,
    rate: 105,
    unit: "Litre",
    minStock: 500,
    margin: 4,
  },
  {
    key: "diesel",
    name: "Diesel",
    enabled: true,
    rate: 95,
    unit: "Litre",
    minStock: 800,
    margin: 3,
  },
  {
    key: "cng",
    name: "CNG",
    enabled: false,
    rate: 82,
    unit: "Kg",
    minStock: 300,
    margin: 2,
  },
  {
    key: "lpg",
    name: "LPG",
    enabled: false,
    rate: 92,
    unit: "Kg",
    minStock: 200,
    margin: 2,
  },
];

const FuelSetting = () => {
  const [fuels, setFuels] = useState(initialFuels);

  const updateFuel = (index, field, value) => {
    const updated = [...fuels];
    updated[index][field] =
      field === "enabled" ? value : Number(value);
    setFuels(updated);
  };

  const handleSave = () => {
    console.log("Fuel Settings:", fuels);
    alert("Fuel settings saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">Fuel Settings</h1>
        <p className="text-sm text-gray-400">
          Configure fuel availability, rates and alerts
        </p>
      </div>

      {/* FUEL CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fuels.map((fuel, index) => (
          <div key={fuel.key} className="glass p-6 space-y-4">
            {/* HEADER */}
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                {fuel.name}
              </h2>

              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={fuel.enabled}
                  onChange={(e) =>
                    updateFuel(index, "enabled", e.target.checked)
                  }
                  className="accent-green-500"
                />
                {fuel.enabled ? "Enabled" : "Disabled"}
              </label>
            </div>

            {/* RATE + UNIT */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Rate (₹)
                </label>
                <input
                  type="number"
                  value={fuel.rate}
                  onChange={(e) =>
                    updateFuel(index, "rate", e.target.value)
                  }
                  disabled={!fuel.enabled}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Unit
                </label>
                <input
                  value={fuel.unit}
                  disabled
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 opacity-60"
                />
              </div>
            </div>

            {/* STOCK + MARGIN */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Min Stock Alert
                </label>
                <input
                  type="number"
                  value={fuel.minStock}
                  onChange={(e) =>
                    updateFuel(index, "minStock", e.target.value)
                  }
                  disabled={!fuel.enabled}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 disabled:opacity-50"
                />
              </div>

              <div>
                <label className="text-sm text-gray-400 mb-1 block">
                  Margin / {fuel.unit} (₹)
                </label>
                <input
                  type="number"
                  value={fuel.margin}
                  onChange={(e) =>
                    updateFuel(index, "margin", e.target.value)
                  }
                  disabled={!fuel.enabled}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 disabled:opacity-50"
                />
              </div>
            </div>

            {/* INFO */}
            <p className="text-xs text-gray-400">
              Profit per {fuel.unit}: ₹ {fuel.margin}
            </p>
          </div>
        ))}
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
      >
        Save Fuel Settings
      </button>
    </div>
  );
};

export default FuelSetting;
