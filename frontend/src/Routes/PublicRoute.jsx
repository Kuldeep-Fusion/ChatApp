import { Navigate, Outlet } from "react-router-dom";
import {useAuth} from '../context/AuthContext.jsx'

export default function PublicRoute() {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  return user ? <Navigate to="/welcome" replace /> : <Outlet />;
}