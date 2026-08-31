import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function ProtectedRoute({ roles, children }) {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (roles && !roles.includes(user.role)) {
    return <Navigate to={homeForRole(user.role)} replace />;
  }
  return children;
}

export function homeForRole(role) {
  switch (role) {
    case "super_admin":
      return "/admin/dashboard";
    case "event_manager":
      return "/em/dashboard";
    default:
      return "/dashboard";
  }
}