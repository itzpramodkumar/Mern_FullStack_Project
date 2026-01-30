import { useContext, useMemo, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { FuelContext } from "../context/FuelContext";

 import SalesBarChart from "../../Component/Charts/SalesBarChart";
 import ProfitLineChart from "../../Component/Charts/ProfitLineChart";
 import FuelPieChart from "../../Component/Charts/FuelPieChart";
 import ExpenseBarChart from "../../Component/Charts/ExpenseBarChart";

const Report = () => {
  const { selectedFuel } = useContext(FuelContext);
  const [range, setRange] = useState("monthly");

  /* ===== MOCK DATA (backend later replace karega) ===== */

  const salesData = [
    { label: "Week 1", amount: 120000 },
    { label: "Week 2", amount: 145000 },
    { label: "Week 3", amount: 132000 },
    { label: "Week 4", amount: 160000 },
  ];

  const profitData = [
    { month: "Jan", profit: 42000 },
    { month: "Feb", profit: 38000 },
    { month: "Mar", profit: 46000 },
    { month: "Apr", profit: 51000 },
  ];

  const fuelData = [
    { fuel: "Petrol", value: 45 },
    { fuel: "Diesel", value: 30 },
    { fuel: "LPG", value: 15 },
    { fuel: "CNG", value: 10 },
  ];

  const expenseData = [
    { category: "Salary", amount: 35000 },
    { category: "Electricity", amount: 9000 },
    { category: "Maintenance", amount: 12000 },
    { category: "Transport", amount: 7000 },
  ];

  const summary = useMemo(() => {
    const totalSales = salesData.reduce((s, d) => s + d.amount, 0);
    const totalExpense = expenseData.reduce((s, e) => s + e.amount, 0);
    const profit = totalSales - totalExpense;

    return { totalSales, totalExpense, profit };
  }, []);

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 space-y-6">
          {/* HEADER */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-2xl font-bold">Business Reports</h1>
              <p className="text-sm text-gray-400">
                Fuel Context: {selectedFuel.toUpperCase()}
              </p>
            </div>

            <select
              value={range}
              onChange={(e) => setRange(e.target.value)}
              className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 outline-none"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          {/* SUMMARY CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass p-5">
              <p className="text-sm text-gray-400">Total Sales</p>
              <h2 className="text-2xl font-bold text-green-400 mt-2">
                ₹ {summary.totalSales.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5">
              <p className="text-sm text-gray-400">Total Expenses</p>
              <h2 className="text-2xl font-bold text-red-400 mt-2">
                ₹ {summary.totalExpense.toLocaleString()}
              </h2>
            </div>

            <div className="glass p-5">
              <p className="text-sm text-gray-400">Net Profit</p>
              <h2 className="text-2xl font-bold text-blue-400 mt-2">
                ₹ {summary.profit.toLocaleString()}
              </h2>
            </div>
          </div>

          {/* CHARTS */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <div className="glass p-5">
              <h2 className="text-lg font-semibold mb-2">
                Sales Overview
              </h2>
              <SalesBarChart data={salesData} />
            </div>

            <div className="glass p-5">
              <h2 className="text-lg font-semibold mb-2">
                Profit Trend
              </h2>
              <ProfitLineChart data={profitData} />
            </div>

            <div className="glass p-5">
              <h2 className="text-lg font-semibold mb-2">
                Fuel Distribution
              </h2>
              <FuelPieChart data={fuelData} />
            </div>

            <div className="glass p-5">
              <h2 className="text-lg font-semibold mb-2">
                Expense Breakdown
              </h2>
              <ExpenseBarChart data={expenseData} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;
