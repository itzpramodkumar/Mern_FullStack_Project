import { useEffect, useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
import { createEmpApi, getEmpApi } from "../../api/employee.api.js";

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");

  // 🔹 GET Employees
  const fetchEmp = async () => {
    try {
      const res = await getEmpApi();
      setEmployees(res.data.data);
    } catch (error) {
      console.error("Get Employee Error", error);
    }
  };

  useEffect(() => {
    fetchEmp();
  }, []);

  // 🔹 CREATE Employee
  const addEmployee = async () => {
    if (!name || !role || !phone) return;

    try {
      const payload = {
        name,
        role,
        phone,
        salary: Number(salary || 0),
      };

      const res = await createEmpApi(payload);
      setEmployees((prev) => [res.data.data, ...prev]);

      setName("");
      setRole("");
      setPhone("");
      setSalary("");
    } catch (error) {
      console.error("Create Employee Error", error);
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
              Employees
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Manage petrol pump staff & roles
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD EMPLOYEE */}
            <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_30px_rgba(16,185,129,0.15)] p-6 space-y-4">
              <h2 className="text-lg font-semibold">➕ Add Employee</h2>

              <input
                placeholder="Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 
                focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              >
                <option value="">Select Role</option>
                <option>Manager</option>
                <option>Operator</option>
                <option>Accountant</option>
              </select>

              <input
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />

              <input
                type="number"
                placeholder="Salary (₹)"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 
                placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition"
              />

              <button
                onClick={addEmployee}
                className="w-full py-3 rounded-xl font-semibold text-black
                bg-gradient-to-r from-green-400 to-emerald-500
                hover:from-green-500 hover:to-emerald-600
                active:scale-95 transition-all duration-200
                shadow-lg shadow-green-500/30"
              >
                Save Employee
              </button>
            </div>

            {/* EMPLOYEE LIST */}
            <div className="xl:col-span-2 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-6">
              <h2 className="text-lg font-semibold mb-4">👥 Employee List</h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10 text-left">
                    <th className="py-3">Name</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="text-center py-10 text-gray-500"
                      >
                        No employees added yet 🚀
                      </td>
                    </tr>
                  )}

                  {employees.map((e) => (
                    <tr
                      key={e._id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="py-3 font-medium">{e.name}</td>

                      <td>
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/20 text-blue-400">
                          {e.role}
                        </span>
                      </td>

                      <td>{e.phone}</td>

                      <td className="font-semibold text-emerald-400">
                        ₹ {e.salary?.toLocaleString()}
                      </td>

                      <td>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold
                            ${
                              e.status === "Active"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                        >
                          {e.status}
                        </span>
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

export default Employees;
