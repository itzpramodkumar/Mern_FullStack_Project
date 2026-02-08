import { useEffect, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import {
  getCostomerApi,
  createCostomerApi,
  ledgerApi,
} from "../../api/customer.api.js";

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [creditLimit, setCreditLimit] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [ledgerType, setLedgerType] = useState("");
  const [ledgerAmount, setLedgerAmount] = useState("");

  /* 🔹 LOAD CUSTOMERS */
  const loadCustomers = async () => {
    try {
      const res = await getCostomerApi();
      setCustomers(res.data.data);
    } catch (err) {
      console.error("Failed to fetch customers", err);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  /* 🔹 BALANCE CALCULATION */
  const calculateBalance = (ledger = []) =>
    ledger.reduce(
      (sum, l) => (l.type === "credit" ? sum + l.amount : sum - l.amount),
      0
    );

  /* 🔹 CREATE CUSTOMER */
  const handleAddCustomer = async () => {
    if (!name || !phone) return;

    try {
      const res = await createCostomerApi({
        name,
        phone,
        creditLimit: Number(creditLimit || 0),
      });

      setCustomers((prev) => [res.data.data, ...prev]);
      setName("");
      setPhone("");
      setCreditLimit("");
    } catch (err) {
      alert(err.response?.data?.message || "Customer create failed");
    }
  };

  /* 🔹 ADD LEDGER */
  const handleAddLedger = async () => {
    if (!ledgerType || !ledgerAmount) return;

    try {
      const res = await ledgerApi(selectedCustomer._id, {
        type: ledgerType,
        amount: Number(ledgerAmount),
      });

      setSelectedCustomer(res.data.data);
      setCustomers((prev) =>
        prev.map((c) =>
          c._id === res.data.data._id ? res.data.data : c
        )
      );

      setLedgerType("");
      setLedgerAmount("");
    } catch (err) {
      alert("Ledger entry add nahi hui");
    }
  };

  return (
    <div className="flex min-h-screen bg-[#020617] text-white">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 space-y-8">
          {/* HEADER */}
          <div>
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent">
              Customers
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage credit customers & outstanding balances
            </p>
          </div>

          {/* FORM + TABLE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD CUSTOMER */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.15)] p-6 space-y-4">
              <h2 className="text-lg font-semibold">➕ Add Customer</h2>

              <input
                placeholder="Customer Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />

              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />

              <input
                type="number"
                placeholder="Credit Limit (₹)"
                value={creditLimit}
                onChange={(e) => setCreditLimit(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />

              <button
                onClick={handleAddCustomer}
                className="w-full py-3 rounded-xl font-semibold text-black
                bg-gradient-to-r from-green-400 to-emerald-500
                hover:from-green-500 hover:to-emerald-600
                active:scale-95 transition-all duration-200
                shadow-lg shadow-green-500/30"
              >
                Save Customer
              </button>
            </div>

            {/* CUSTOMER LIST */}
            <div className="xl:col-span-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold mb-4">
                👥 Customer List
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="py-3">Name</th>
                    <th>Phone</th>
                    <th>Credit Limit</th>
                    <th>Outstanding</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {customers.map((c) => {
                    const balance = calculateBalance(c.ledger);

                    return (
                      <tr
                        key={c._id}
                        className="border-b border-white/5 hover:bg-white/5 transition"
                      >
                        <td className="py-3 font-medium">
                          {c.name}
                        </td>
                        <td>{c.phone}</td>
                        <td className="text-emerald-400 font-semibold">
                          ₹ {c.creditLimit.toLocaleString()}
                        </td>
                        <td
                          className={`font-semibold ${
                            balance > 0
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          ₹ {balance.toLocaleString()}
                        </td>
                        <td>
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

          {/* LEDGER SECTION */}
          {selectedCustomer && (() => {
            const ledger = selectedCustomer.ledger || [];

            return (
              <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
                <h2 className="text-lg font-semibold mb-4">
                  📒 Ledger – {selectedCustomer.name}
                </h2>

                {/* ADD LEDGER */}
                <div className="flex gap-3 mb-6">
                  <select
                    value={ledgerType}
                    onChange={(e) => setLedgerType(e.target.value)}
                    className="bg-black/30 border border-white/10 px-4 py-2 rounded-xl"
                  >
                    <option value="">Type</option>
                    <option value="credit">Credit</option>
                    <option value="debit">Debit</option>
                  </select>

                  <input
                    type="number"
                    placeholder="Amount"
                    value={ledgerAmount}
                    onChange={(e) => setLedgerAmount(e.target.value)}
                    className="bg-black/30 border border-white/10 px-4 py-2 rounded-xl"
                  />

                  <button
                    onClick={handleAddLedger}
                    className="px-5 rounded-xl font-semibold text-black
                    bg-gradient-to-r from-green-400 to-emerald-500"
                  >
                    Add Entry
                  </button>
                </div>

                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-400 border-b border-white/10">
                      <th className="py-2">Date</th>
                      <th>Type</th>
                      <th>Amount (₹)</th>
                    </tr>
                  </thead>

                  <tbody>
                    {ledger.length === 0 && (
                      <tr>
                        <td
                          colSpan="3"
                          className="py-4 text-gray-500"
                        >
                          No ledger entries
                        </td>
                      </tr>
                    )}

                    {ledger.map((l, i) => (
                      <tr
                        key={i}
                        className="border-b border-white/5"
                      >
                        <td className="py-2">
                          {l.date
                            ? new Date(l.date).toLocaleDateString()
                            : "-"}
                        </td>
                        <td
                          className={`capitalize font-semibold ${
                            l.type === "credit"
                              ? "text-yellow-400"
                              : "text-green-400"
                          }`}
                        >
                          {l.type}
                        </td>
                        <td className="font-semibold">
                          ₹ {l.amount.toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <button
                  onClick={() => setSelectedCustomer(null)}
                  className="mt-4 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
                >
                  Close Ledger
                </button>
              </div>
            );
          })()}
        </div>
      </div>
    </div>
  );
};

export default Customers;
