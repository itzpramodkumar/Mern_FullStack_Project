import { useContext, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";
import { fuelConfig } from "../Util/fuelConfig";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

/* ===== DUMMY MONTHLY DATA (Backend later) ===== */
const monthlyData = {
  petrol: [
    { day: "01", qty: 420, amount: 44100 },
    { day: "05", qty: 510, amount: 53550 },
    { day: "10", qty: 380, amount: 39900 },
    { day: "15", qty: 600, amount: 63000 },
    { day: "20", qty: 450, amount: 47250 },
  ],
  diesel: [
    { day: "01", qty: 520, amount: 49400 },
    { day: "05", qty: 610, amount: 57950 },
    { day: "10", qty: 430, amount: 40850 },
    { day: "15", qty: 700, amount: 66500 },
    { day: "20", qty: 580, amount: 55100 },
  ],
  lpg: [
    { day: "01", qty: 210, amount: 15750 },
    { day: "05", qty: 260, amount: 19500 },
    { day: "10", qty: 240, amount: 18000 },
    { day: "15", qty: 300, amount: 22500 },
    { day: "20", qty: 280, amount: 21000 },
  ],
  cng: [
    { day: "01", qty: 260, amount: 22100 },
    { day: "05", qty: 300, amount: 25500 },
    { day: "10", qty: 320, amount: 27200 },
    { day: "15", qty: 350, amount: 29750 },
    { day: "20", qty: 370, amount: 31450 },
  ],
};

const MonthlySales = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

  const [month, setMonth] = useState("August");
  const [year, setYear] = useState("2026");

  const data = monthlyData[selectedFuel];

  const summary = useMemo(() => {
    const totalQty = data.reduce((sum, d) => sum + d.qty, 0);
    const totalAmount = data.reduce((sum, d) => sum + d.amount, 0);
    const avgRate = totalQty ? Math.round(totalAmount / totalQty) : 0;

    return { totalQty, totalAmount, avgRate };
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
                Monthly Sales Report
              </h1>
              <p className="text-sm text-gray-400 mt-1">
                Fuel: {fuel.label} ({fuel.unit})
              </p>
            </div>

            {/* FILTERS */}
            <div className="flex gap-3">
<div className="relative w-full">
 <div className="relative w-full">
  <div className="relative w-full z-10">
  <select
    value={month}
    onChange={(e) => setMonth(e.target.value)}
    className="
      w-full
      appearance-none
      bg-transparent
      text-white
      border border-white/10
      rounded-xl
      px-4 py-2 pr-10
      outline-none
      backdrop-blur-md
      transition-all
      duration-200
      focus:border-white/30
      focus:ring-2
      focus:ring-white/20
    "
  >
    {[
      "January","February","March","April","May","June",
      "July","August","September","October","November","December",
    ].map((m) => (
      <option key={m} value={m} className="bg-[#020617] text-white">
        {m}
      </option>
    ))}
  </select>

  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/60">
    ▼
  </span>
</div>

</div>

</div>

   <select
  value={year}
  onChange={(e) => setYear(e.target.value)}
  className="
    w-full
   bg-transparent
    text-white
    border border-white/20
    rounded-xl
    px-4 py-2
    outline-none
    backdrop-blur-lg
    transition-all
    duration-200
    focus:bg-white/20
    focus:border-white/40
    focus:ring-2
    focus:ring-white/30
  "
>
  <option className="bg-[#020617] text-white">2025</option>
  <option className="bg-[#020617] text-white">2026</option>
  <option className="bg-[#020617] text-white">2027</option>
</select>

            </div>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Total Quantity</p>
              <h2 className="text-2xl font-bold mt-2">
                {summary.totalQty} {fuel.unit}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Total Sales</p>
              <h2 className="text-2xl font-bold mt-2 text-green-400">
                ₹ {summary.totalAmount.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Average Rate</p>
              <h2 className="text-2xl font-bold mt-2">
                ₹ {summary.avgRate} / {fuel.unit}
              </h2>
            </div>
          </div>

          {/* CHART */}
          <div className="glass p-6">
            <h3 className="text-lg font-semibold mb-4">
              Sales Trend ({month} {year})
            </h3>

            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="day" stroke="#9ca3af" />
                <YAxis stroke="#9ca3af" />
                <Tooltip />
                <Bar dataKey="amount" fill="#22c55e" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* TABLE */}
          <div className="glass p-6 overflow-x-auto">
            <h3 className="text-lg font-semibold mb-4">
              Day-wise Sales Details
            </h3>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="py-2">Day</th>
                  <th className="py-2">Quantity ({fuel.unit})</th>
                  <th className="py-2">Amount (₹)</th>
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-2">{row.day}</td>
                    <td className="py-2">{row.qty}</td>
                    <td className="py-2">
                      ₹ {row.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonthlySales;
