import { useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

const initialShifts = [
  {
    id: 1,
    name: "Morning Shift",
    time: "6 AM - 2 PM",
    employee: "Rahul Singh",
  },
  {
    id: 2,
    name: "Evening Shift",
    time: "2 PM - 10 PM",
    employee: "Suresh Kumar",
  },
];

const Shifts = () => {
  const [shifts, setShifts] = useState(initialShifts);
  const [name, setName] = useState("");
  const [time, setTime] = useState("");
  const [employee, setEmployee] = useState("");

  const addShift = () => {
    if (!name || !time) return;

    setShifts((prev) => [
      {
        id: Date.now(),
        name,
        time,
        employee,
      },
      ...prev,
    ]);

    setName("");
    setTime("");
    setEmployee("");
  };

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Shift Management</h1>
            <p className="text-sm text-gray-400">
              Assign shifts to employees
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD SHIFT */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold">Create Shift</h2>

              <input
                placeholder="Shift Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Time Slot (eg: 6 AM - 2 PM)"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                placeholder="Assign Employee"
                value={employee}
                onChange={(e) => setEmployee(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                onClick={addShift}
                className="w-full bg-green-500 text-black py-3 rounded-xl font-semibold"
              >
                Save Shift
              </button>
            </div>

            {/* SHIFT LIST */}
            <div className="xl:col-span-2 glass p-6">
              <h2 className="text-lg font-semibold mb-4">
                Shift Schedule
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th>Shift</th>
                    <th>Time</th>
                    <th>Employee</th>
                  </tr>
                </thead>
                <tbody>
                  {shifts.map((s) => (
                    <tr
                      key={s.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td>{s.name}</td>
                      <td>{s.time}</td>
                      <td>{s.employee || "-"}</td>
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

export default Shifts;
