import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  const isAuthenticated = localStorage.getItem("token"); // or use context/state

  return isAuthenticated ? children : <Navigate to="/signin" />;
}
