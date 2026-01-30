import { useContext, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";
const suppliers = [
  { id: 1, name: "IOC Supplier" },
  { id: 2, name: "BPCL Distributor" },
  { id: 3, name: "HPCL Agency" },
];

const FuelPurchase = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  const [supplierId, setSupplierId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [invoice, setInvoice] = useState(null);
  const [note, setNote] = useState("");

  const amount = useMemo(() => {
    const q = Number(quantity);
    if (!q || !fuel?.rate) return 0;
    return q * fuel.rate;
  }, [quantity, fuel]);

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
              {fuel.label} Purchase
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Rate: ₹{fuel.rate} / {fuel.unit}
            </p>
          </div>

          {/* FORM + SUMMARY */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* FORM */}
            <div className="xl:col-span-2 glass p-6 space-y-5">
              {/* Supplier */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Supplier
                </label>
                <select
                  value={supplierId}
                  onChange={(e) => setSupplierId(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                >
                  <option value="">Select supplier</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Quantity */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Quantity ({fuel.unit})
                </label>
                <input
                  type="number"
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder={`Enter quantity in ${fuel.unit}`}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              {/* Invoice Upload */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Invoice (Upload)
                </label>
                <input
                  type="file"
                  onChange={(e) => setInvoice(e.target.files?.[0] || null)}
                  className="w-full text-sm file:bg-white/10 file:border-0 file:rounded-lg file:px-4 file:py-2 file:text-gray-200"
                />
                {invoice && (
                  <p className="text-xs text-gray-400 mt-1">
                    Selected: {invoice.name}
                  </p>
                )}
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Note (optional)
                </label>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  rows={3}
                  placeholder="Any additional details…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              {/* ACTION */}
              <div className="flex gap-3">
                <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition">
                  Save Purchase
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition">
                  Reset
                </button>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="glass p-6 neon-border">
              <h2 className="text-lg font-semibold mb-4">
                Purchase Summary
              </h2>

              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Fuel</span>
                  <span>{fuel.label}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Rate</span>
                  <span>
                    ₹{fuel.rate} / {fuel.unit}
                  </span>
                </div>

                <div className="flex justify-between">
                  <span className="text-gray-400">Quantity</span>
                  <span>
                    {quantity || 0} {fuel.unit}
                  </span>
                </div>

                <div className="border-t border-white/10 my-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-400">
                    ₹ {amount.toLocaleString()}
                  </span>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-4">
                * Stock will be updated automatically after saving.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FuelPurchase;

