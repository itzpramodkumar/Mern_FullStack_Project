import { useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

/* ===== DUMMY SUPPLIERS DATA (Backend later) ===== */
const initialSuppliers = [
  {
    id: 1,
    name: "IOC Distributor",
    fuel: "Petrol",
    phone: "9876501234",
    email: "ioc@supplier.com",
    due: 45000,
  },
  {
    id: 2,
    name: "BPCL Agency",
    fuel: "Diesel",
    phone: "9123409876",
    email: "bpcl@supplier.com",
    due: 32000,
  },
  {
    id: 3,
    name: "Indane LPG",
    fuel: "LPG",
    phone: "9001122334",
    email: "lpg@supplier.com",
    due: 18000,
  },
];

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [name, setName] = useState("");
  const [fuel, setFuel] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [due, setDue] = useState("");

  const addSupplier = () => {
    if (!name || !fuel) return;

    const newSupplier = {
      id: Date.now(),
      name,
      fuel,
      phone,
      email,
      due: Number(due || 0),
    };

    setSuppliers((prev) => [newSupplier, ...prev]);

    setName("");
    setFuel("");
    setPhone("");
    setEmail("");
    setDue("");
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
              Suppliers Management
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage fuel suppliers & outstanding payments
            </p>
          </div>

          {/* FORM + TABLE */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD SUPPLIER */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold">
                Add Supplier
              </h2>

              <input
                placeholder="Supplier Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <select
                value={fuel}
                onChange={(e) => setFuel(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              >
                <option value="">Fuel Type</option>
                <option>Petrol</option>
                <option>Diesel</option>
                <option>LPG</option>
                <option>CNG</option>
              </select>

              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                min="0"
                placeholder="Opening Due (₹)"
                value={due}
                onChange={(e) => setDue(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                onClick={addSupplier}
                className="w-full bg-green-500 text-black py-3 rounded-xl font-semibold"
              >
                Save Supplier
              </button>
            </div>

            {/* SUPPLIERS LIST */}
            <div className="xl:col-span-2 glass p-6 overflow-x-auto">
              <h2 className="text-lg font-semibold mb-4">
                Suppliers List
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-gray-400 border-b border-white/10">
                    <th className="py-2">Name</th>
                    <th className="py-2">Fuel</th>
                    <th className="py-2">Phone</th>
                    <th className="py-2">Email</th>
                    <th className="py-2">Due (₹)</th>
                  </tr>
                </thead>

                <tbody>
                  {suppliers.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-2">{s.name}</td>
                      <td className="py-2">{s.fuel}</td>
                      <td className="py-2">{s.phone || "-"}</td>
                      <td className="py-2">{s.email || "-"}</td>
                      <td
                        className={`py-2 font-semibold ${
                          s.due > 0
                            ? "text-yellow-400"
                            : "text-green-400"
                        }`}
                      >
                        ₹ {s.due.toLocaleString()}
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

export default Suppliers;
