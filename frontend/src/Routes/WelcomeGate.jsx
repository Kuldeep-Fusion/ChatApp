import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function WelcomeGate() {
  const { user } = useAuth();
  const seen = localStorage.getItem(`welcome_seen_${user._id}`);
  console.log("user:", user, "seen:", seen);

  return seen ? <Outlet /> : <Navigate to="/welcome" replace />;
}