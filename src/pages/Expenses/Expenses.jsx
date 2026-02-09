import { useContext, useEffect, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";
import { createexp, getexp } from "../../api/expense.api.js";

const EXPENSE_TYPES = [
  "Salary",
  "Electricity",
  "Maintenance",
  "Transport",
  "Miscellaneous",
];

const Expenses = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  // ✅ IMPORTANT: array se init
  const [expenses, setExpenses] = useState([]);

  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  // ✅ TOTAL EXPENSE (safe)
  const totalExpense = useMemo(() => {
    return expenses.reduce((sum, e) => sum + e.amount, 0);
  }, [expenses]);

  // ================= GET EXPENSES =================
  const fetchExpenses = async () => {
    try {
      const res = await getexp();
      // ⚠️ backend response ke hisab se yaha change ho sakta hai
      setExpenses(res.data.data || res.data);
    } catch (error) {
      console.error("Failed to fetch expenses", error);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [selectedFuel]);

  // ================= ADD EXPENSE =================
  const handleAddExpense = async () => {
  if (!date || !type || !amount) return;

  const newExpense = {
  date,
  type,
  amount: Number(amount),
  note,
  fuelType: selectedFuel, // 👈 rename this
};

  try {
    const res = await createexp(newExpense);
    console.log("Expense saved:", res.data);

    fetchExpenses();

    setDate("");
    setType("");
    setAmount("");
    setNote("");
  } catch (error) {
    console.error(
      "Failed to add expense",
      error.response?.data || error.message
    );
  }
};

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 space-y-6">
          {/* HEADER */}
          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Expenses Management
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Fuel Context: {fuel.label}
            </p>
          </div>

          {/* SUMMARY */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Total Expenses</p>
              <h2 className="text-2xl font-bold mt-2 text-red-400">
                ₹ {totalExpense.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Entries</p>
              <h2 className="text-2xl font-bold mt-2">
                {expenses.length}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Current Month</p>
              <h2 className="text-2xl font-bold mt-2">
                August 2026
              </h2>
            </div>
          </div>

          {/* FORM + TABLE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD EXPENSE */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Add Expense
              </h2>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
              />

              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
              >
                <option value="">Select type</option>
                {EXPENSE_TYPES.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>

              <input
                type="number"
                min="0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Enter amount"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
              />

              <textarea
                rows={3}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Extra details…"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
              />

              <button
                onClick={handleAddExpense}
                className="w-full px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition"
              >
                Save Expense
              </button>
            </div>

            {/* TABLE */}
            <div className="xl:col-span-2 glass p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">
                Expense History
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th>Date</th>
                    <th>Type</th>
                    <th>Amount (₹)</th>
                    <th>Note</th>
                  </tr> 
                </thead>

                <tbody>
                  {expenses.map((e) => (
                    <tr
                      key={e._id || e.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td>{e.date}</td>
                      <td>{e.type}</td>
                      <td className="text-red-400">
                        {e.amount.toLocaleString()}
                      </td>
                      <td className="text-gray-400">
                        {e.note || "-"}
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

export default Expenses;
