
import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getMe, logoutUser } from "../services/auth.api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // =====================================================
  // CHECK AUTH
  // =====================================================

  const checkAuth = async () => {
    try {
      const res = await getMe();

      if (res.data?.success) {
        setUser(res.data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.log("Auth check failed:", error);

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // INITIAL AUTH CHECK
  // =====================================================

  useEffect(() => {
    checkAuth();
  }, []);

  // =====================================================
  // FORCED LOGOUT
  // =====================================================

  useEffect(() => {
    const handleForcedLogout = () => {
      console.log("User logged out automatically");

      setUser(null);
      localStorage.removeItem("token");
    };

    window.addEventListener(
      "auth:logout",
      handleForcedLogout
    );

    return () => {
      window.removeEventListener(
        "auth:logout",
        handleForcedLogout
      );
    };
  }, []);

  // =====================================================
  // LOGOUT
  // =====================================================

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.log("Logout API failed:", error);
    } finally {
      // Frontend token remove
      localStorage.removeItem("token");

      // User state clear
      setUser(null);
    }
  };

  // =====================================================
  // CONTEXT
  // =====================================================

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        checkAuth,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

// =====================================================
// CUSTOM HOOK
// =====================================================

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside AuthProvider"
    );
  }

  return context;
};
