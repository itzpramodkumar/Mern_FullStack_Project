import { useState } from "react";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

const MODULES = [
  "Dashboard",
  "Fuel Stock",
  "Fuel Purchase",
  "Sales",
  "Profit & Loss",
  "Expenses",
  "Payments",
  "Invoices",
  "Customers",
  "Employees",
  "Suppliers",
  "Reports",
  "Settings",
];

const initialRoles = [
  {
    id: 1,
    name: "Admin",
    permissions: MODULES.reduce(
      (acc, m) => ({
        ...acc,
        [m]: { read: true, write: true, update: true, delete: true },
      }),
      {}
    ),
  },
  {
    id: 2,
    name: "Manager",
    permissions: MODULES.reduce(
      (acc, m) => ({
        ...acc,
        [m]: { read: true, write: true, update: true, delete: false },
      }),
      {}
    ),
  },
  {
    id: 3,
    name: "Operator",
    permissions: MODULES.reduce(
      (acc, m) => ({
        ...acc,
        [m]: { read: true, write: true, update: false, delete: false },
      }),
      {}
    ),
  },
  {
    id: 4,
    name: "Accountant",
    permissions: MODULES.reduce(
      (acc, m) => ({
        ...acc,
        [m]: { read: true, write: false, update: false, delete: false },
      }),
      {}
    ),
  },
];

const Roles = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [selectedRoleId, setSelectedRoleId] = useState(1);

  const selectedRole = roles.find((r) => r.id === selectedRoleId);

  const togglePermission = (module, perm) => {
    setRoles((prev) =>
      prev.map((r) =>
        r.id === selectedRoleId
          ? {
              ...r,
              permissions: {
                ...r.permissions,
                [module]: {
                  ...r.permissions[module],
                  [perm]: !r.permissions[module][perm],
                },
              },
            }
          : r
      )
    );
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
              Roles & Permissions
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              Control system access by role
            </p>
          </div>

          {/* ROLE SELECT */}
          <div className="glass p-5 max-w-md">
            <label className="block text-sm text-gray-400 mb-2">
              Select Role
            </label>
            <select
              value={selectedRoleId}
              onChange={(e) =>
                setSelectedRoleId(Number(e.target.value))
              }
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3"
            >
              {roles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>

          {/* PERMISSION MATRIX */}
          <div className="glass p-6 overflow-x-auto">
            <h2 className="text-lg font-semibold mb-4">
              Permissions – {selectedRole?.name}
            </h2>

            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-400 border-b border-white/10">
                  <th className="py-2">Module</th>
                  <th className="py-2">Read</th>
                  <th className="py-2">Write</th>
                  <th className="py-2">Update</th>
                  <th className="py-2">Delete</th>
                </tr>
              </thead>

              <tbody>
                {MODULES.map((m) => (
                  <tr
                    key={m}
                    className="border-b border-white/5 hover:bg-white/5 transition"
                  >
                    <td className="py-2 font-medium">{m}</td>

                    {["read", "write", "update", "delete"].map(
                      (perm) => (
                        <td key={perm} className="py-2">
                          <input
                            type="checkbox"
                            checked={
                              selectedRole.permissions[m][perm]
                            }
                            onChange={() =>
                              togglePermission(m, perm)
                            }
                            className="accent-green-500 w-4 h-4"
                          />
                        </td>
                      )
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* INFO */}
          <div className="glass p-4 text-sm text-gray-400">
            * Changes will apply after saving to backend (JWT +
            role-based middleware).
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roles;
