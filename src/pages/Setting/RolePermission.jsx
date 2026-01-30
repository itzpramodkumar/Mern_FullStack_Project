import { useState } from "react";

const initialRoles = [
  {
    name: "Owner",
    permissions: {
      dashboard: true,
      sales: true,
      fuel: true,
      reports: true,
      billing: true,
      payments: true,
      employees: true,
      settings: true,
    },
  },
  {
    name: "Manager",
    permissions: {
      dashboard: true,
      sales: true,
      fuel: true,
      reports: true,
      billing: true,
      payments: true,
      employees: true,
      settings: false,
    },
  },
  {
    name: "Operator",
    permissions: {
      dashboard: true,
      sales: true,
      fuel: false,
      reports: false,
      billing: true,
      payments: false,
      employees: false,
      settings: false,
    },
  },
];

const permissionList = [
  { key: "dashboard", label: "Dashboard Access" },
  { key: "sales", label: "Sales Entry" },
  { key: "fuel", label: "Fuel Management" },
  { key: "reports", label: "Reports View" },
  { key: "billing", label: "Billing / Invoice" },
  { key: "payments", label: "Payments" },
  { key: "employees", label: "Employees" },
  { key: "settings", label: "Settings Access" },
];

const RolePermission = () => {
  const [roles, setRoles] = useState(initialRoles);
  const [newRole, setNewRole] = useState("");

  const togglePermission = (roleIndex, permKey) => {
    const updated = [...roles];
    updated[roleIndex].permissions[permKey] =
      !updated[roleIndex].permissions[permKey];
    setRoles(updated);
  };

  const addRole = () => {
    if (!newRole) return;

    const emptyPerms = {};
    permissionList.forEach((p) => {
      emptyPerms[p.key] = false;
    });

    setRoles([
      ...roles,
      { name: newRole, permissions: emptyPerms },
    ]);
    setNewRole("");
  };

  const handleSave = () => {
    console.log("Roles & Permissions:", roles);
    alert("Roles & permissions saved successfully");
  };

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Roles & Permissions
        </h1>
        <p className="text-sm text-gray-400">
          Control access for each user role
        </p>
      </div>

      {/* ADD ROLE */}
      <div className="glass p-6 max-w-xl space-y-3">
        <h2 className="text-lg font-semibold">Create New Role</h2>

        <div className="flex gap-3">
          <input
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
            placeholder="Role name (e.g. Accountant)"
            className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3"
          />
          <button
            onClick={addRole}
            className="px-5 py-3 rounded-xl bg-green-500 text-black font-semibold"
          >
            Add
          </button>
        </div>
      </div>

      {/* ROLE CARDS */}
      <div className="space-y-6">
        {roles.map((role, rIndex) => (
          <div key={role.name} className="glass p-6">
            <h3 className="text-lg font-semibold mb-4">
              {role.name}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {permissionList.map((perm) => (
                <div
                  key={perm.key}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm">
                    {perm.label}
                  </span>
                  <input
                    type="checkbox"
                    checked={role.permissions[perm.key]}
                    onChange={() =>
                      togglePermission(rIndex, perm.key)
                    }
                    className="accent-green-500"
                  />
                </div>
              ))}
            </div>
          </div>
        ))} 
      </div>

      {/* SAVE */}
      <button
        onClick={handleSave}
        className="px-6 py-3 rounded-xl bg-green-500 text-black font-semibold"
      >
        Save Roles & Permissions
      </button>
    </div>
  );
};

export default RolePermission;
