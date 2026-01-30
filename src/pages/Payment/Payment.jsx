import { useContext, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";
// import SummaryCard from "../../components/Cards/SummaryCard";

const customers = [
  { id: 1, name: "Ramesh Kumar" },
  { id: 2, name: "Amit Traders" },
  { id: 3, name: "Walk-in Customer" },
];

const initialPayments = [
  {
    id: 1,
    date: "2026-08-10",
    mode: "cash",
    amount: 4200,
    fuel: "petrol",
    status: "paid",
  },
  {
    id: 2,
    date: "2026-08-12",
    mode: "online",
    amount: 8600,
    fuel: "diesel",
    status: "paid",
    txnId: "TXN982134",
  },
  {
    id: 3,
    date: "2026-08-14",
    mode: "credit",
    amount: 5200,
    fuel: "petrol",
    status: "pending",
    customer: "Amit Traders",
  },
];

const Payment = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  const [payments, setPayments] = useState(initialPayments);
  const [mode, setMode] = useState("cash");
  const [amount, setAmount] = useState("");
  const [txnId, setTxnId] = useState("");
  const [customer, setCustomer] = useState("");

  const summary = useMemo(() => {
    const collected = payments
      .filter((p) => p.status === "paid")
      .reduce((s, p) => s + p.amount, 0);

    const pending = payments
      .filter((p) => p.status === "pending")
      .reduce((s, p) => s + p.amount, 0);

    return { collected, pending };
  }, [payments]);

  const handleAddPayment = () => {
    if (!amount) return;

    const newPayment = {
      id: Date.now(),
      date: new Date().toISOString().slice(0, 10),
      mode,
      amount: Number(amount),
      fuel: selectedFuel,
      status: mode === "credit" ? "pending" : "paid",
      txnId: mode === "online" ? txnId : undefined,
      customer: mode === "credit" ? customer : undefined,
    };

    setPayments((prev) => [newPayment, ...prev]);
    setAmount("");
    setTxnId("");
    setCustomer("");
  };

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
              Payments
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Fuel Context: {fuel.label}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">
                Total Collected
              </p>
              <h2 className="text-2xl font-bold mt-2 text-green-400">
                ₹ {summary.collected.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">
                Pending (Credit)
              </p>
              <h2 className="text-2xl font-bold mt-2 text-yellow-400">
                ₹ {summary.pending.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* FORM + TABLE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD PAYMENT */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Add Payment
              </h2>

              {/* MODE */}
              <div>
                <label className="block text-sm text-gray-400 mb-2">
                  Payment Mode
                </label>
                <div className="flex gap-3">
                  {["cash", "online", "credit"].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMode(m)}
                      className={`px-4 py-2 rounded-xl capitalize transition ${
                        mode === m
                          ? "bg-green-500 text-black font-semibold"
                          : "bg-white/10 hover:bg-white/15"
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              {/* AMOUNT */}
              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              {/* ONLINE TXN */}
              {mode === "online" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Transaction ID
                  </label>
                  <input
                    value={txnId}
                    onChange={(e) => setTxnId(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  />
                </div>
              )}

              {/* CREDIT CUSTOMER */}
              {mode === "credit" && (
                <div>
                  <label className="block text-sm text-gray-400 mb-1">
                    Customer
                  </label>
                  <select
                    value={customer}
                    onChange={(e) => setCustomer(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                  >
                    <option value="">Select customer</option>
                    {customers.map((c) => (
                      <option key={c.id}>{c.name}</option>
                    ))}
                  </select>
                </div>
              )}

              <button
                onClick={handleAddPayment}
                className="w-full px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition"
              >
                Save Payment
              </button>
            </div>

            {/* HISTORY */}
            <div className="xl:col-span-2 glass p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">
                Payment History
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="py-2">Date</th>
                    <th className="py-2">Mode</th>
                    <th className="py-2">Fuel</th>
                    <th className="py-2">Amount (₹)</th>
                    <th className="py-2">Status</th>
                  </tr>
                </thead>

                <tbody>
                  {payments.map((p) => (
                    <tr
                      key={p.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-2">{p.date}</td>
                      <td className="py-2 capitalize">{p.mode}</td>
                      <td className="py-2 capitalize">{p.fuel}</td>
                      <td className="py-2">
                        {p.amount.toLocaleString()}
                      </td>
                      <td
                        className={`py-2 font-semibold ${
                          p.status === "paid"
                            ? "text-green-400"
                            : "text-yellow-400"
                        }`}
                      >
                        {p.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
