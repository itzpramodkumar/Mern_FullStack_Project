import { NavLink } from "react-router-dom";
import {
  Building2,
  Fuel,
  Receipt,
  CreditCard,
  ShieldCheck,
  Clock,
  Bell,
  Lock,
  Settings as SystemIcon,
  LayoutDashboard,
} from "lucide-react";

const settingLinks = [
  {
    path: "business",
    label: "Business",
    icon: Building2,
  },
  {
    path: "fuel",
    label: "Fuel",
    icon: Fuel,
  },
  {
    path: "billing",
    label: "Billing",
    icon: Receipt,
  },
  {
    path: "payment",
    label: "Payment",
    icon: CreditCard,
  },
  {
    path: "roles",
    label: "Roles & Permissions",
    icon: ShieldCheck,
  },
  {
    path: "shift",
    label: "Shifts",
    icon: Clock,
  },
  {
    path: "notification",
    label: "Notifications",
    icon: Bell,
  },
  {
    path: "security",
    label: "Security",
    icon: Lock,
  },
  {
    path: "system",
    label: "System",
    icon: SystemIcon,
  },
  {
    path: "summary",
    label: "Summary",
    icon: LayoutDashboard,
  },
];

const SettingSidebar = () => {
  return (
    <aside className="w-64 border-r border-white/10 bg-[#020617]/90 backdrop-blur px-4 py-6">
      {/* TITLE */}
      <h2 className="text-lg font-semibold mb-6 text-gray-100">
        Settings
      </h2>

      {/* LINKS */}
      <nav className="space-y-1">
        {settingLinks.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition ${
                  isActive
                    ? "bg-green-500/15 text-green-400 font-semibold"
                    : "text-gray-400 hover:bg-white/5 hover:text-gray-200"
                }`
              }
            >
              <Icon className="w-4 h-4" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </aside>
  );
};

export default SettingSidebar;
