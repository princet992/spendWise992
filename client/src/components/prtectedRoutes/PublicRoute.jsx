import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = () => {
  const { token } = useSelector((state) => state.Auth);
  if (token) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export default PublicRoute;
