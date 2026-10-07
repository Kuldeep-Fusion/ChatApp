import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

/**
 * Google OAuth Success Handler
 *
 * Mobile browsers (iOS Safari, Chrome) "Prevent Cross-Site Tracking" setting
 * backend se redirect ke waqt cookies block kar deti hain.
 *
 * Fix: Backend tokens URL params mein bhejta hai.
 * Yeh page same-site context mein tokens receive karta hai aur
 * localStorage mein store karta hai, phir checkAuth() call karke navigate karta hai.
 */
const GoogleAuthSuccess = () => {
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

  useEffect(() => {
    const handleGoogleTokens = async () => {
      const params = new URLSearchParams(window.location.search);
      const accessToken = params.get("accessToken");
      const refreshToken = params.get("refreshToken");

      if (!accessToken || !refreshToken) {
        // Tokens nahi mile — login pe bhejo
        navigate("/auth/login?error=google_failed", { replace: true });
        return;
      }

      // Tokens localStorage mein store karo (same-site context — mobile safe)
      localStorage.setItem("token", accessToken);
      localStorage.setItem("refreshToken", refreshToken);

      // URL se tokens hata do (security ke liye)
      window.history.replaceState({}, document.title, window.location.pathname);

      // Auth state update karo
      await checkAuth();

      // Dashboard pe navigate karo
      navigate("/explore", { replace: true });
    };

    handleGoogleTokens();
  }, []);

  return (
    <div className="flex h-screen items-center justify-center bg-[#f4f7f5]">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#10251c] border-t-transparent" />
        <p className="text-[14px] text-[#4a5e52]">Signing you in with Google...</p>
      </div>
    </div>
  );
};

export default GoogleAuthSuccess;
