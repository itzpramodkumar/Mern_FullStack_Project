import { useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";
// import EmployeeForm from "../../components/Forms/EmployeeForm";

const initialEmployees = [
  {
    id: 1,
    name: "Suresh Kumar",
    role: "Manager",
    phone: "9876543210",
    salary: 25000,
    status: "Active",
  },
  {
    id: 2,
    name: "Rahul Singh",
    role: "Operator",
    phone: "9123456789",
    salary: 15000,
    status: "Active",
  },
];

const Employees = () => {
  const [employees, setEmployees] = useState(initialEmployees);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [salary, setSalary] = useState("");

  const addEmployee = () => {
    if (!name || !role) return;

    setEmployees((prev) => [
      {
        id: Date.now(),
        name,
        role,
        phone,
        salary: Number(salary || 0),
        status: "Active",
      },
      ...prev,
    ]);

    setName("");
    setRole("");
    setPhone("");
    setSalary("");
  };

  return (
    <div className="flex min-h-screen bg-[#020617]">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-6 space-y-6">
          <div>
            <h1 className="text-2xl font-bold">Employees</h1>
            <p className="text-sm text-gray-400">
              Manage petrol pump staff & roles
            </p>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
            {/* ADD EMPLOYEE */}
            <div className="glass p-6 space-y-4">
              <h2 className="text-lg font-semibold">Add Employee</h2>

              <input
                placeholder="Employee Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
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
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <input
                type="number"
                placeholder="Salary (₹)"
                value={salary}
                onChange={(e) => setSalary(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
              />

              <button
                onClick={addEmployee}
                className="w-full bg-green-500 text-black py-3 rounded-xl font-semibold"
              >
                Save Employee
              </button>
            </div>

            {/* EMPLOYEE LIST */}
            <div className="xl:col-span-2 glass p-6">
              <h2 className="text-lg font-semibold mb-4">
                Employee List
              </h2>

              <table className="w-full text-sm">
                <thead>
                  <tr className="text-gray-400 border-b border-white/10">
                    <th>Name</th>
                    <th>Role</th>
                    <th>Phone</th>
                    <th>Salary</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {employees.map((e) => (
                    <tr
                      key={e.id}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td>{e.name}</td>
                      <td>{e.role}</td>
                      <td>{e.phone}</td>
                      <td>₹ {e.salary}</td>
                      <td className="text-green-400">{e.status}</td>
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
