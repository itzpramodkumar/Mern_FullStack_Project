import { useContext, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ===== DUMMY PROFIT & LOSS DATA (Backend later) ===== */
const pnlData = {
  petrol: [
    { month: "Jan", revenue: 520000, cost: 430000, expenses: 45000 },
    { month: "Feb", revenue: 480000, cost: 400000, expenses: 42000 },
    { month: "Mar", revenue: 610000, cost: 500000, expenses: 48000 },
    { month: "Apr", revenue: 560000, cost: 460000, expenses: 46000 },
  ],
  diesel: [
    { month: "Jan", revenue: 450000, cost: 380000, expenses: 42000 },
    { month: "Feb", revenue: 420000, cost: 360000, expenses: 40000 },
    { month: "Mar", revenue: 520000, cost: 440000, expenses: 46000 },
    { month: "Apr", revenue: 500000, cost: 420000, expenses: 44000 },
  ],
  lpg: [
    { month: "Jan", revenue: 210000, cost: 160000, expenses: 28000 },
    { month: "Feb", revenue: 230000, cost: 170000, expenses: 30000 },
    { month: "Mar", revenue: 260000, cost: 190000, expenses: 32000 },
    { month: "Apr", revenue: 250000, cost: 185000, expenses: 31000 },
  ],
  cng: [
    { month: "Jan", revenue: 260000, cost: 200000, expenses: 30000 },
    { month: "Feb", revenue: 280000, cost: 215000, expenses: 32000 },
    { month: "Mar", revenue: 310000, cost: 235000, expenses: 35000 },
    { month: "Apr", revenue: 330000, cost: 250000, expenses: 36000 },
  ],
};

const ProfitLoss = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  const [year, setYear] = useState("2026");

  const data = pnlData[selectedFuel];

  const summary = useMemo(() => {
    const revenue = data.reduce((s, d) => s + d.revenue, 0);
    const cost = data.reduce((s, d) => s + d.cost, 0);
    const expenses = data.reduce((s, d) => s + d.expenses, 0);
    const net = revenue - cost - expenses;

    return { revenue, cost, expenses, net };
  }, [data]);

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        {/* CONTENT */}
        <div className="p-6 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-wide">
                Profit & Loss
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Fuel: {fuel.label}
              </p>
            </div>

            <select
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none"
            >
              <option>2025</option>
              <option>2026</option>
              <option>2027</option>
            </select>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Total Revenue</p>
              <h2 className="text-2xl font-bold mt-2">
                ₹ {summary.revenue.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Fuel Cost</p>
              <h2 className="text-2xl font-bold mt-2">
                ₹ {summary.cost.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Other Expenses</p>
              <h2 className="text-2xl font-bold mt-2">
                ₹ {summary.expenses.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Net Profit</p>
              <h2
                className={`text-2xl font-bold mt-2 ${
                  summary.net >= 0
                    ? "text-green-400"
                    : "text-red-400"
                }`}
              >
                ₹ {summary.net.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* CHART */}
          <div className="glass p-6">
            <h3 className="text-lg font-semibold mb-4">
              Monthly Profit Trend ({year})
            </h3>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart
                data={data.map((d) => ({
                  month: d.month,
                  profit: d.revenue - d.cost - d.expenses,
                }))}
              >
                <XAxis dataKey="month" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="profit"
                  stroke="#22c55e"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* BREAKDOWN TABLE */}
          <div className="glass p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">
              Monthly Breakdown
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="py-2">Month</th>
                  <th className="py-2">Revenue (₹)</th>
                  <th className="py-2">Cost (₹)</th>
                  <th className="py-2">Expenses (₹)</th>
                  <th className="py-2">Net (₹)</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => {
                  const net =
                    row.revenue - row.cost - row.expenses;
                  return (
                    <tr
                      key={i}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-2">{row.month}</td>
                      <td className="py-2">
                        {row.revenue.toLocaleString()}
                      </td>
                      <td className="py-2">
                        {row.cost.toLocaleString()}
                      </td>
                      <td className="py-2">
                        {row.expenses.toLocaleString()}
                      </td>
                      <td
                        className={`py-2 font-semibold ${
                          net >= 0
                            ? "text-green-400"
                            : "text-red-400"
                        }`}
                      >
                        {net.toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLoss;
