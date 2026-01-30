import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const isAuth = true; // 🔒 backend ke baad JWT se replace hoga

  return isAuth ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoutes;
