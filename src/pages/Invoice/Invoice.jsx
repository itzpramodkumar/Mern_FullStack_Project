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

const GST_RATE = 18; // %

const Invoice = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  const [customerId, setCustomerId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [gstEnabled, setGstEnabled] = useState(true);

  const subtotal = useMemo(() => {
    const q = Number(quantity);
    if (!q || !fuel?.rate) return 0;
    return q * fuel.rate;
  }, [quantity, fuel]);

  const gstAmount = useMemo(() => {
    return gstEnabled ? Math.round((subtotal * GST_RATE) / 100) : 0;
  }, [subtotal, gstEnabled]);

  const totalAmount = subtotal + gstAmount;

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
              Invoice / Billing
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Fuel: {fuel.label} | Rate: ₹{fuel.rate} / {fuel.unit}
            </p>
          </div>

          {/* FORM + INVOICE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* BILL FORM */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Create Invoice
              </h2>

              {/* CUSTOMER */}
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

              {/* QUANTITY */}
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

              {/* GST TOGGLE */}
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={gstEnabled}
                  onChange={() => setGstEnabled(!gstEnabled)}
                  className="accent-green-500"
                />
                <span className="text-sm text-gray-300">
                  Apply GST ({GST_RATE}%)
                </span>
              </div>

              <button className="w-full px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition">
                Generate Invoice
              </button>
            </div>

            {/* INVOICE PREVIEW */}
            <div className="xl:col-span-2 glass p-6">
              <h2 className="text-lg font-semibold mb-4">
                Invoice Preview
              </h2>

              <div className="border border-white/10 rounded-xl p-6 space-y-4 bg-[#020617]">
                <div className="flex justify-between">
                  <h3 className="text-xl font-bold">
                    PETROL PUMP INVOICE
                  </h3>
                  <span className="text-sm text-gray-400">
                    #{Date.now().toString().slice(-6)}
                  </span>
                </div>

                <div className="text-sm text-gray-400">
                  <p>Customer: {customers.find(c => c.id == customerId)?.name || "-"}</p>
                  <p>Date: {new Date().toLocaleDateString()}</p>
                </div>

                <div className="border-t border-white/10 pt-4">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="text-left text-gray-400">
                        <th>Fuel</th>
                        <th>Qty</th>
                        <th>Rate</th>
                        <th>Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-t border-white/5">
                        <td>{fuel.label}</td>
                        <td>
                          {quantity || 0} {fuel.unit}
                        </td>
                        <td>₹ {fuel.rate}</td>
                        <td>₹ {subtotal.toLocaleString()}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="border-t border-white/10 pt-4 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹ {subtotal.toLocaleString()}</span>
                  </div>

                  {gstEnabled && (
                    <div className="flex justify-between">
                      <span>GST ({GST_RATE}%)</span>
                      <span>₹ {gstAmount.toLocaleString()}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-lg font-bold text-green-400">
                    <span>Total</span>
                    <span>₹ {totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                <p className="text-xs text-gray-400 pt-2">
                  * This is a system-generated invoice.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Invoice;
