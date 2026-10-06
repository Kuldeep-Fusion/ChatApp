
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,

  CheckIcon,
} from "@animateicons/react/lucide";

import { googleLoginUrl, loginUser } from "../services/auth.api";
import { gooeyToast, GooeyToaster } from "goey-toast";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
   const { checkAuth } = useAuth();
   const navigate = useNavigate();
   const [loading, setLoading] = useState(false);

  // -----------------------------
  // Handle Input
  // -----------------------------
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  

  // -----------------------------
  // Validation
  // -----------------------------
  const validateForm = () => {
    
    const newErrors = {};


    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password =
        "Password must contain at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // -----------------------------
  // Login
  // -----------------------------
const handleSubmit = async (e) => {
  e.preventDefault();

  if (loading) return;            // double click guard
  if (!validateForm()) return;

  setLoading(true);

  const loginRequest = loginUser(formData);

  // Toast: checking -> success / error
  gooeyToast.promise(loginRequest, {
    loading: "Checking credentials...",
    success: (res) => res.data?.message || "Login successful",
    error: (err) => err.response?.data?.message || "Login failed",
  });

  try {
    const res = await loginRequest;

    if (res.data?.token) localStorage.setItem("token", res.data.token);

    // Success toast dikhne ka time do, phir user set + navigate
    setTimeout(async () => {
      await checkAuth();
      navigate("/", { replace: true });
    }, 1500);
  } catch (error) {
    console.log("failed to login", error);
    setLoading(false);            // error pe button wapas enable
  }
};

  // -----------------------------
  // Google Login
  // -----------------------------
  const handleGoogleLogin = () => {
    try {
       window.location.href = googleLoginUrl;
    } catch (error) {
      gooeyToast.error(error.response?.data?.message || "Login failed");
    }
    
     
  };

  return (
    <main className="h-screen bg-[#f4f7f5] jus">
       <GooeyToaster position="top-center" />
      <div className="mx-auto flex items-center justify-center">

        <div className="grid w-full h-screen overflow-hidden  bg-white shadow-[0_25px_80px_rgba(20,50,35,0.08)] lg:grid-cols-[1.05fr_0.95fr]">

          {/* =====================================================
              LEFT CHAT EXPERIENCE
          ====================================================== */}

          <section className="relative hidden min-h-[680px] overflow-hidden bg-[#10251c] lg:block">

            {/* Background Glow */}
            <div className="absolute -left-32 -top-32  bg-[#86efac]/10 blur-3xl" />

            <div className="absolute -bottom-40 -right-32  w-[420px]  bg-[#4ade80]/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between p-36">

              {/* Brand */}
              <div>

                <div className="flex items-center gap-3">

                  <img src="/logo4.png" alt="Milan ChatApp" className="-ml-6 h-20" />

                </div>

                 

                {/* Hero */}
                <div className="mt-5 max-w-md">

                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#86efac]/60">
                    Your conversations
                  </p>

                  <h1 className="text-[46px] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
                    Talk to people.
                    <br />
                    Not notifications.
                  </h1>

                  <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/45">
                    A simple space for meaningful conversations,
                    quick replies and staying connected with the
                    people that matter.
                  </p>

                </div>

              </div>

              {/* Chat Preview */}
              <div className="mx-auto w-full max-w-[390px]">

                {/* Message 1 */}
                <div className="mb-3 flex items-end gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d9f99d] text-xs font-semibold text-[#10251c]">
                    A
                  </div>

                  <div className="rounded-[18px] rounded-bl-[5px] bg-white/[0.08] px-4 py-3">

                    <p className="text-[13px] text-white/75">
                      Hey! Are you free today?
                    </p>

                    <span className="mt-1 block text-[9px] text-white/30">
                      10:42 AM
                    </span>

                  </div>

                </div>

                {/* Message 2 */}
                <div className="mb-3 flex justify-end">

                  <div className="rounded-[18px] rounded-br-[5px] bg-[#d9f99d] px-4 py-3">

                    <p className="text-[13px] text-[#183022]">
                      Yeah, let's catch up!
                    </p>

                    <div className="mt-1 flex items-center justify-end gap-1">

                      <span className="text-[9px] text-[#183022]/50">
                        10:43 AM
                      </span>

                      <CheckIcon
                        size={11}
                        duration={0.5}
                      />

                    </div>

                  </div>

                </div>

                {/* Message 3 */}
                <div className="flex items-end gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fde68a] text-xs font-semibold text-[#713f12]">
                    M
                  </div>

                  <div className="rounded-[18px] rounded-bl-[5px] bg-white/[0.08] px-4 py-3">

                    <p className="text-[13px] text-white/75">
                      Perfect. See you soon 👋
                    </p>

                    <span className="mt-1 block text-[9px] text-white/30">
                      10:44 AM
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =====================================================
              LOGIN SECTION
          ====================================================== */}

          <section className="flex min-h-[680px] items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">

            <div className="w-full max-w-[390px]">

              {/* Mobile Logo */}
              <div className="mb-1 flex items-center gap-3 lg:hidden p-5 ">

                 <img src="/logo4.png" alt="Milan ChatApp" className="-ml-6 h-20 bg-green-950 p-2 rounded-sm" />

              </div>

              {/* Heading */}
              <div className="mb-8">

                <h2 className="text-[32px] font-semibold tracking-[-0.045em] text-[#15251d]">
                  Welcome back
                </h2>

                <p className="mt-2 text-[14px] leading-6 text-[#77827c]">
                  Sign in to continue your conversations.
                </p>

              </div>

              {/* =================================================
                  GOOGLE LOGIN
              ================================================== */}

              <button
                type="button"
                onClick={handleGoogleLogin}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#dde3df] bg-white text-[14px] font-medium text-[#26342d] transition hover:border-[#cbd5d0] hover:bg-[#f8faf9] active:scale-[0.99]"
              >

                {/* Google Official SVG */}
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    fill="#4285F4"
                    d="M21.35 12.27c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
                  />

                  <path
                    fill="#34A853"
                    d="M12 21.5c2.63 0 4.84-.87 6.45-2.35l-3.14-2.44c-.87.58-1.98.92-3.31.92-2.54 0-4.7-1.72-5.47-4.03H3.29v2.52A9.74 9.74 0 0 0 12 21.5Z"
                  />

                  <path
                    fill="#FBBC05"
                    d="M6.53 13.6A5.85 5.85 0 0 1 6.22 12c0-.56.11-1.1.31-1.6V7.88H3.29A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.04 4.12l3.24-2.52Z"
                  />

                  <path
                    fill="#EA4335"
                    d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.24 2.52c.77-2.31 2.93-4.03 5.47-4.03Z"
                  />
                </svg>

                Continue with Google

              </button>

              {/* Divider */}
              <div className="my-7 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#e7ebe8]" />

                <span className="text-[11px] uppercase tracking-[0.15em] text-[#a0aaa5]">
                  or
                </span>

                <div className="h-px flex-1 bg-[#e7ebe8]" />

              </div>

              {/* =================================================
                  FORM
              ================================================== */}

              <form
                onSubmit={handleSubmit}
                className="space-y-5"
              >

                {/* EMAIL */}
                <div>

                  <label
                    htmlFor="email"
                    className="mb-2 block text-[13px] font-medium text-[#35433b]"
                  >
                    Email address
                  </label>

                  <div
                    className={`group flex h-12 items-center rounded-xl border bg-white px-3.5 transition ${
                      errors.email
                        ? "border-red-400 ring-4 ring-red-500/[0.06]"
                        : "border-[#dfe5e1] focus-within:border-[#466c55] focus-within:ring-4 focus-within:ring-[#466c55]/[0.08]"
                    }`}
                  >

                    <MailIcon
                      size={18}
                      duration={0.7}
                      className="mr-3 shrink-0 text-[#9aa59f]"
                    />

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      autoComplete="email"
                      className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#17231d] outline-none placeholder:text-[#a7b0ab]"
                    />

                  </div>

                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.email}
                    </p>
                  )}

                </div>

                {/* PASSWORD */}
                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label
                      htmlFor="password"
                      className="text-[13px] font-medium text-[#35433b]"
                    >
                      Password
                    </label>

                    <Link
                      to="/forgot-password"
                      className="text-[12px] font-medium text-[#52715d] transition hover:text-[#263e30]"
                    >
                      Forgot password?
                    </Link>

                  </div>

                  <div
                    className={`group flex h-12 items-center rounded-xl border bg-white px-3.5 transition ${
                      errors.password
                        ? "border-red-400 ring-4 ring-red-500/[0.06]"
                        : "border-[#dfe5e1] focus-within:border-[#466c55] focus-within:ring-4 focus-within:ring-[#466c55]/[0.08]"
                    }`}
                  >

                    <LockIcon
                      size={18}
                      duration={0.7}
                      className="mr-3 shrink-0 text-[#9aa59f]"
                    />

                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Enter your password"
                      autoComplete="current-password"
                      className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#17231d] outline-none placeholder:text-[#a7b0ab]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
                      }
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                      className="ml-2 flex shrink-0 text-[#9aa59f] transition hover:text-[#263e30]"
                    >

                      {showPassword ? (
                        <EyeOffIcon
                          size={18}
                          duration={0.6}
                        />
                      ) : (
                        <EyeIcon
                          size={18}
                          duration={0.6}
                        />
                      )}

                    </button>

                  </div>

                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.password}
                    </p>
                  )}

                </div>

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={loading}
                  className="group flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#183326] text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#244936] active:scale-[0.99]"
                >

                 {loading ? "Signing in..." : "Sign in"}

                  <ArrowRightIcon
                    size={17}
                    duration={0.6}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />

                </button>

              </form>

              {/* Register */}
              <p className="mt-8 text-center text-[13px] text-[#7d8781]">

                New here?{" "}

                <Link
                  to="/auth/register"
                  className="font-medium text-[#304e3b] underline underline-offset-4"
                >
                  Create an account
                </Link>

              </p>

              {/* Terms */}
              <p className="mx-auto mt-7 max-w-[320px] text-center text-[11px] leading-5 text-[#a1aaa5]">

                By continuing, you agree to our{" "}

                <Link
                  to="/terms"
                  className="underline underline-offset-2"
                >
                  Terms
                </Link>{" "}

                and{" "}

                <Link
                  to="/privacy"
                  className="underline underline-offset-2"
                >
                  Privacy Policy
                </Link>
                .

              </p>

            </div>

          </section>

        </div>
      </div>
    </main>
  );
};

export default Login;

