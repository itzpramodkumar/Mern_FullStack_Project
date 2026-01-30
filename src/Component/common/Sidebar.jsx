import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Fuel,
  ShoppingCart,
  TrendingUp,
  Users,
  UserCog,
  Truck,
  FileText,
  CreditCard,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const menu = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard /> },

    { section: "Fuel Management" },
    { name: "Fuel Stock", path: "/fuel-stock", icon: <Fuel /> },
    { name: "Fuel Purchase", path: "/fuel-purchase", icon: <ShoppingCart /> },

    { section: "Sales & Finance" },
    { name: "Daily Sales", path: "/daily-sales", icon: <TrendingUp /> },
    { name: "Monthly Sales", path: "/monthly-sales", icon: <BarChart3 /> },
    { name: "Profit & Loss", path: "/profit-loss", icon: <TrendingUp /> },
    { name: "Expenses", path: "/expenses", icon: <FileText /> },
    { name: "Payments", path: "/payments", icon: <CreditCard /> },
    { name: "Invoices", path: "/invoice", icon: <FileText /> },

    { section: "Management" },
    { name: "Customers", path: "/customers", icon: <Users /> },
    { name: "Employees", path: "/employees", icon: <UserCog /> },
    { name: "Shifts", path: "/shifts", icon: <UserCog /> },
    { name: "Suppliers", path: "/suppliers", icon: <Truck /> },

    { section: "System" },
    { name: "Reports", path: "/reports", icon: <BarChart3 /> },
    { name: "Settings", path: "/settings", icon: <Settings /> },
  ];

  return (
    <aside className="w-72 min-h-screen bg-[#020617] text-gray-200 border-r border-white/10">
      {/* LOGO */}
      <div className="h-20 flex items-center justify-center border-b border-white/10">
        <h1 className="text-xl font-bold tracking-wide">
          <span className="text-green-400">PETROL</span>
          <span className="text-white">PUMP</span>
        </h1>
      </div>

      {/* MENU */}
      <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-80px)]">
        {menu.map((item, index) =>
          item.section ? (
            <p
              key={index}
              className="text-xs uppercase tracking-widest text-gray-500 mt-6 mb-2"
            >
              {item.section}
            </p>
          ) : (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                ${
                  isActive
                    ? "bg-green-500/10 text-green-400 border border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                    : "hover:bg-white/5 text-gray-300"
                }`
              }
            >
              <span className="w-5 h-5">{item.icon}</span>
              <span className="text-sm font-medium">{item.name}</span>
            </NavLink>
          )
        )}
      </nav>

      {/* LOGOUT */}
      <div className="p-4 border-t border-white/10">
        <button className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition">
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
