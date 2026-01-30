import { useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

/* ===== DUMMY CUSTOMER DATA (Backend later) ===== */
const initialCustomers = [
  {
    id: 1,
    name: "Amit Traders",
    phone: "9876543210",
    creditLimit: 50000,
    ledger: [
      { type: "credit", amount: 12000, date: "2026-08-05" },
      { type: "debit", amount: 5000, date: "2026-08-10" },
    ],
  },
  {
    id: 2,
    name: "Ramesh Kumar",
    phone: "9123456789",
    creditLimit: 20000,
    ledger: [
      { type: "credit", amount: 8000, date: "2026-08-08" },
    ],
  },
];

const Customers = () => {
  const [customers, setCustomers] = useState(initialCustomers);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const calculateBalance = (ledger = []) =>
    ledger.reduce(
      (sum, l) => (l.type === "credit" ? sum + l.amount : sum - l.amount),
      0
    );

  const handleAddCustomer = () => {
    if (!name || !phone) return;

    const newCustomer = {
      id: Date.now(),
      name,
      phone,
      creditLimit: Number(creditLimit || 0),
      ledger: [],
    };

    setCustomers((prev) => [newCustomer, ...prev]);
    setName("");
    setPhone("");
    setCreditLimit("");
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
              Customers Management
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage credit customers & outstanding balances
            </p>
          </div>

          {/* FORM + TABLE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD CUSTOMER */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Add Customer
              </h2>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Phone
                </label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Credit Limit (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={creditLimit}
                  onChange={(e) => setCreditLimit(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <button
                onClick={handleAddCustomer}
                className="w-full px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition"
              >
                Save Customer
              </button>
            </div>

            {/* CUSTOMER TABLE */}
            <div className="xl:col-span-2 glass p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">
                Customer List
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="py-2">Name</th>
                    <th className="py-2">Phone</th>
                    <th className="py-2">Credit Limit</th>
                    <th className="py-2">Outstanding</th>
                    <th className="py-2">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((c) => {
                    const balance = calculateBalance(c.ledger);
                    return (
                      <tr
                        key={c.id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-2">{c.name}</td>
                        <td className="py-2">{c.phone}</td>
                        <td className="py-2">
                          ₹ {c.creditLimit.toLocaleString()}
                        </td>
                        <td
                          className={`py-2 font-semibold ${
                            balance > 0
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          ₹ {balance.toLocaleString()}
                        </td>
                        <td className="py-2">
                          <button
                            onClick={() => setSelectedCustomer(c)}
                            className="text-green-400 hover:underline"
                          >
                            View Ledger
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* LEDGER PREVIEW */}
          {selectedCustomer && (
            <div className="glass p-6">
              <h2 className="text-lg font-semibold mb-4">
                Ledger – {selectedCustomer.name}
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="py-2">Date</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount (₹)</th>
                  </tr>
                </thead>

                <tbody>
                  {selectedCustomer.ledger.length === 0 && (
                    <tr>
                      <td
                        colSpan="3"
                        className="py-4 text-gray-400"
                      >
                        No ledger entries
                      </td>
                    </tr>
                  )}

                  {selectedCustomer.ledger.map((l, i) => (
                    <tr
                      key={i}
                      className="border-b border-white/5"
                    >
                      <td className="py-2">{l.date}</td>
                      <td
                        className={`py-2 capitalize ${
                          l.type === "credit"
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        {l.type}
                      </td>
                      <td className="py-2">
                        {l.amount.toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <button
                onClick={() => setSelectedCustomer(null)}
                className="mt-4 px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15 transition"
              >
                Close Ledger
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;
