import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = !!localStorage.getItem("accessToken");
  return isLoggedIn ? <Navigate to="/dashboard" replace /> : children;
};

export default PublicRoute;
