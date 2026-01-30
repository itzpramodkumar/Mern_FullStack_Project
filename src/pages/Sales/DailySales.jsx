import { useContext, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";

const customers = [
  { id: 1, name: "Walk-in Customer" },
  { id: 2, name: "Ramesh Kumar" },
  { id: 3, name: "Amit Traders" },
];

const DailySales = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  const [quantity, setQuantity] = useState("");
  const [paymentMode, setPaymentMode] = useState("cash"); // cash | online | credit
  const [customerId, setCustomerId] = useState("");
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
              Daily Sales Entry
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Fuel: {fuel.label} | Rate: ₹{fuel.rate} / {fuel.unit}
            </p>
          </div>

          {/* FORM + SUMMARY */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* FORM */}
            <div className="xl:col-span-2 glass p-6 space-y-5">
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

              {/* Payment Mode */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Payment Mode
                </label>
                <div className="flex gap-3">
                  {["cash", "online", "credit"].map((mode) => (
                    <button
                      key={mode}
                      type="button"
                      onClick={() => setPaymentMode(mode)}
                      className={`px-5 py-2 rounded-xl capitalize transition ${
                        paymentMode === mode
                          ? "bg-green-500 text-black font-semibold"
                          : "bg-white/10 hover:bg-white/15"
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer (Only for Credit) */}
              {paymentMode === "credit" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Customer
                  </label>
                  <select
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  >
                    <option value="">Select customer</option>
                    {customers.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              {/* Note */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Note (optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Any additional info…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              {/* ACTION */}
              <div className="flex gap-3">
                <button className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition">
                  Save Sale
                </button>
                <button className="px-6 py-3 rounded-xl bg-white/10 hover:bg-white/15 transition">
                  Reset
                </button>
              </div>
            </div>

            {/* SUMMARY */}
            <div className="glass p-6 neon-border">
              <h2 className="text-lg font-semibold mb-4">
                Sales Summary
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

                <div className="flex justify-between">
                  <span className="text-gray-400">Payment</span>
                  <span className="capitalize">{paymentMode}</span>
                </div>

                <div className="border-t border-white/10 my-2" />

                <div className="flex justify-between text-lg font-bold">
                  <span>Total Amount</span>
                  <span className="text-green-400">
                    ₹ {amount.toLocaleString()}
                  </span>
                </div>
              </div>

              {paymentMode === "credit" && (
                <p className="text-xs text-yellow-400 mt-4">
                  * Amount will be added to customer credit ledger.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DailySales;
