import { useContext, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";
// import ExpenseForm from "../../components/Forms/ExpenseForm";
// import ExpenseBarChart from "../../components/Charts/ExpenseBarChart";
// import SummaryCard from "../../components/Cards/SummaryCard";


const EXPENSE_TYPES = [
  "Salary",
  "Electricity",
  "Maintenance",
  "Transport",
  "Miscellaneous",
];

/* ===== DUMMY EXPENSE DATA (Backend later) ===== */
const initialExpenses = [
  {
    id: 1,
    date: "2026-08-03",
    type: "Salary",
    amount: 35000,
    note: "Staff salary",
  },
  {
    id: 2,
    date: "2026-08-08",
    type: "Electricity",
    amount: 8200,
    note: "Monthly bill",
  },
  {
    id: 3,
    date: "2026-08-15",
    type: "Maintenance",
    amount: 6400,
    note: "Machine servicing",
  },
];

const Expenses = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  const [expenses, setExpenses] = useState(initialExpenses);
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const totalExpense = useMemo(
    () => expenses.reduce((sum, e) => sum + e.amount, 0),
    [expenses]
  );

  const handleAddExpense = () => {
    if (!date || !type || !amount) return;

    const newExpense = {
      id: Date.now(),
      date,
      type,
      amount: Number(amount),
      note,
      fuel: selectedFuel, // fuel-wise tagging
    };

    setExpenses((prev) => [newExpense, ...prev]);
    setDate("");
    setType("");
    setAmount("");
    setNote("");
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
            {/* ADD EXPENSE FORM */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold mb-2">
                Add Expense
              </h2>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Expense Type
                </label>
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
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <div>
                <label className="block text-sm text-gray-400 mb-1">
                  Note (optional)
                </label>
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Extra details…"
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 outline-none"
                />
              </div>

              <button
                onClick={handleAddExpense}
                className="w-full px-6 py-3 rounded-xl bg-green-500 text-black font-semibold hover:opacity-90 transition"
              >
                Save Expense
              </button>
            </div>

            {/* EXPENSES TABLE */}
            <div className="xl:col-span-2 glass p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">
                Expense History
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="py-2">Date</th>
                    <th className="py-2">Type</th>
                    <th className="py-2">Amount (₹)</th>
                    <th className="py-2">Note</th>
                  </tr>
                </thead>

                <tbody>
                  {expenses.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-2">{e.date}</td>
                      <td className="py-2">{e.type}</td>
                      <td className="py-2 text-red-400">
                        {e.amount.toLocaleString()}
                      </td>
                      <td className="py-2 text-gray-400">
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
