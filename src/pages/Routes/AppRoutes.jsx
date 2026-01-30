import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "../../Component/common/Navbar";
/* ===== AUTH ===== */
import Login from "../Auth/Login";
import Signup from "../Auth/Signup";

/* ===== ROUTE GUARD ===== */
import PrivateRoutes from "./PrivateRoutes";

/* ===== DASHBOARD ===== */
import Dashboard from "../Dashboard/Dashboard";

/* ===== FUEL ===== */
import FuelStock from "../Fuel/FuelStock";
import FuelPurchase from "../Fuel/FuelPurchase";

/* ===== SALES ===== */
import DailySales from "../Sales/DailySales";
import MonthlySales from "../Sales/MonthlySales";

/* ===== FINANCE ===== */
import ProfitLoss from "../Profit/ProfitLoss";
import Expenses from "../Expenses/Expenses";
import Payments from "../Payment/Payment";

/* ===== BUSINESS ===== */
import Invoice from "../Invoice/Invoice";
import Customers from "../Costomers/Customers";
import Employees from "../Employess/Employees";
import Shifts from "../Employess/Shift";
import Suppliers from "../Supplired/Suppliers";
import Roles from "../Roles/Roles";
import Report from "../Reports/Report";

/* ===== SETTINGS ===== */
import Profile from "../Setting/Profile";
import SettingLayout from "../Setting/SettingLayout";
import SettingsSummary from "../Setting/SettingsSummary";
import BusinessSetting from "../Setting/BusinessSetting";
import FuelSetting from "../Setting/FuelSetting";
import BillingSetting from "../Setting/BillingSetting";
import PaymentSetting from "../Setting/PaymentSetting";
import RolePermission from "../Setting/RolePermission";
import ShiftSetting from "../Setting/ShiftSetting";
import NotificationSetting from "../Setting/NotificationSetting";
import SecuritySetting from "../Setting/SecuritySetting";
import SystemSetting from "../Setting/SystemSetting";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========== PUBLIC ROUTES ========== */}
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* ========== PRIVATE ROUTES ========== */}
        <Route element={<PrivateRoutes />}>
          {/* DASHBOARD */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* FUEL */}
          <Route path="/fuel-stock" element={<FuelStock />} />
          <Route path="/fuel-purchase" element={<FuelPurchase />} />

          {/* SALES */}
          <Route path="/daily-sales" element={<DailySales />} />
          <Route path="/monthly-sales" element={<MonthlySales />} />

          {/* FINANCE */}
          <Route path="/profit-loss" element={<ProfitLoss />} />
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/payments" element={<Payments />} />

          {/* BUSINESS */}
          <Route path="/invoice" element={<Invoice />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/shifts" element={<Shifts />} />
          <Route path="/suppliers" element={<Suppliers />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/reports" element={<Report />} />

          {/* PROFILE */}
          <Route path="/profile" element={<Profile />} />

          {/* ========== SETTINGS (NESTED ROUTES) ========== */}
          <Route path="/settings" element={<SettingLayout />}>
            <Route index element={<SettingsSummary />} />
            <Route path="business" element={<BusinessSetting />} />
            <Route path="fuel" element={<FuelSetting />} />
            <Route path="billing" element={<BillingSetting />} />
            <Route path="payment" element={<PaymentSetting />} />
            <Route path="roles" element={<RolePermission />} />
            <Route path="shift" element={<ShiftSetting />} />
            <Route
              path="notification"
              element={<NotificationSetting />}
            />
            <Route path="security" element={<SecuritySetting />} />
            <Route path="system" element={<SystemSetting />} />
            <Route path="summary" element={<SettingsSummary />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
