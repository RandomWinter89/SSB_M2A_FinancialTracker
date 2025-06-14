import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../Contexts/AuthContext";

export default function RequireAuth({ children }) {
  const token = useContext(AuthContext).token;

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}