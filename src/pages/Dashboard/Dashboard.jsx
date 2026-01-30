import { useContext } from "react";
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

const chartData = {
  petrol: [
    { month: "Jan", profit: 42000 },
    { month: "Feb", profit: 38000 },
    { month: "Mar", profit: 52000 },
    { month: "Apr", profit: 48000 },
  ],
  diesel: [
    { month: "Jan", profit: 35000 },
    { month: "Feb", profit: 30000 },
    { month: "Mar", profit: 41000 },
    { month: "Apr", profit: 39000 },
  ],
  lpg: [
    { month: "Jan", profit: 22000 },
    { month: "Feb", profit: 25000 },
    { month: "Mar", profit: 27000 },
    { month: "Apr", profit: 29000 },
  ],
  cng: [
    { month: "Jan", profit: 28000 },
    { month: "Feb", profit: 30000 },
    { month: "Mar", profit: 33000 },
    { month: "Apr", profit: 36000 },
  ],
};

const Dashboard = () => {
  const { selectedFuel } = useContext(FuelContext);
  const fuel = fuelConfig[selectedFuel];

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
              {fuel.label} Dashboard
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Rate: ₹{fuel.rate} / {fuel.unit}
            </p>
          </div>

          {/* KPI CARDS */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Total Sales</p>
              <h2 className="text-2xl font-bold mt-2">₹ 8,50,000</h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Net Profit</p>
              <h2 className="text-2xl font-bold mt-2 text-green-400">
                ₹ 1,45,000
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Available Stock</p>
              <h2 className="text-2xl font-bold mt-2">
                12,500 {fuel.unit}
              </h2>
            </div>

            <div className="glass p-5 neon-border">
              <p className="text-sm text-gray-400">Active Customers</p>
              <h2 className="text-2xl font-bold mt-2">320</h2>
            </div>
          </div>

          {/* CHART */}
          <div className="glass p-6">
            <h3 className="text-lg font-semibold mb-4">
              Monthly Profit Analysis
            </h3>

            <ResponsiveContainer width="100%" height={320}>
              <LineChart data={chartData[selectedFuel]}>
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
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
