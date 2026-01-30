import { NavLink, Outlet } from "react-router-dom";
import Sidebar from "../../Component/common/Sidebar";
import Navbar from "../../Component/common/Navbar";

const settingLinks = [
  { path: "business", label: "Business" },
  { path: "fuel", label: "Fuel" },
  { path: "billing", label: "Billing" },
  { path: "payment", label: "Payment" },
  { path: "roles", label: "Roles & Permissions" },
  { path: "shift", label: "Shifts" },
  { path: "notification", label: "Notifications" },
  { path: "security", label: "Security" },
  { path: "system", label: "System" },
  { path: "summary", label: "Summary" },
];

const SettingLayout = () => {
  return (
    <div className="flex min-h-screen bg-[#020617]">
      {/* MAIN SIDEBAR */}
      <Sidebar />

      {/* RIGHT SIDE */}
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="flex flex-1 overflow-hidden">
          {/* SETTINGS LEFT MENU */}
          <aside className="w-64 border-r border-white/10 bg-[#020617]/80 backdrop-blur p-4">
            <h2 className="text-lg font-semibold mb-4">
              Settings
            </h2>

            <nav className="space-y-1">
              {settingLinks.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `block px-4 py-2 rounded-lg text-sm transition ${
                      isActive
                        ? "bg-green-500/15 text-green-400 font-semibold"
                        : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                    }`
                  }
                >
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          {/* SETTINGS CONTENT */}
          <main className="flex-1 overflow-y-auto p-6">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};

export default SettingLayout;
