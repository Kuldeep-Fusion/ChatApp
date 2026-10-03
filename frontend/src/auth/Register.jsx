
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GooeyToaster, gooeyToast } from 'goey-toast'


import {
  UserIcon,
  MailIcon,
  LockIcon,
  EyeIcon,
  EyeOffIcon,
  ArrowRightIcon,
  MessageCircleIcon,
  CheckIcon,
} from "@animateicons/react/lucide";
import { googleRegisterUrl, loginUser, registerUser } from "../services/auth.api";
import { useAuth } from "../context/AuthContext";


const Register = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { checkAuth } = useAuth();

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

  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Name is required";
    } else if (formData.username.trim().length < 2) {
      newErrors.name = "Name must contain at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email address is required";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password =
        "Password must contain at least 8 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  if (!validateForm()) return;

  try {
    await registerUser(formData);
    gooeyToast.success('Profile Created', {
    description: 'Find New Connection and Explore.',
    })
    const res = await loginUser({
      email: formData.email,
      password: formData.password,
    });
    localStorage.setItem("token", res.data.token);
    await checkAuth();                       // user state set karega
    navigate("/welcome", { replace: true });
  } catch (err) {
    console.log(err.response?.data?.message || "Registration failed");
    gooeyToast.error('Failed to Create', {
    description: 'Try Again',
    })
  }
};

const handleGoogleSignup = () => {
  window.location.href = googleRegisterUrl;
};
  return (
    <main className="h-screen bg-[#f4f7f5] ">
     
      <div className="mx-auto flex items-center justify-center">
         <GooeyToaster position="top-center" />

        <div className="grid w-full h-screen overflow-hidden bg-white shadow-[0_25px_80px_rgba(20,50,35,0.08)] lg:grid-cols-[0.95fr_1.05fr]">

          {/* =====================================================
              LEFT — CHAT EXPERIENCE
          ====================================================== */}

          <section className="relative hidden  overflow-hidden bg-[#10251c] lg:block">

            {/* Glow */}
            <div className="absolute -left-32 -top-32 w-96 rounded-full bg-[#86efac]/10 blur-3xl" />

            <div className="absolute -bottom-40 -right-32 w-[420px] rounded-full bg-[#4ade80]/10 blur-3xl" />

            <div className="relative z-10 flex h-full flex-col justify-between p-36">

              {/* Brand */}
              <div>

                <div className="flex items-center gap-3">

                  <div className="flex h-11 w-11 items-center justify-center rounded-[14px] bg-[#d9f99d] text-[#10251c]">

                    <MessageCircleIcon
                      size={21}
                      duration={0.8}
                    />

                  </div>

                  <span className="text-[17px] font-semibold tracking-tight text-white">
                    Chatter
                  </span>

                </div>

                {/* Hero */}
                <div className="mt-20 max-w-md">

                  <p className="mb-4 text-xs font-medium uppercase tracking-[0.18em] text-[#86efac]/60">
                    Join the conversation
                  </p>

                  <h1 className="text-[46px] font-semibold leading-[1.06] tracking-[-0.05em] text-white">
                    Your people.
                    <br />
                    Your conversations.
                  </h1>

                  <p className="mt-6 max-w-sm text-[15px] leading-7 text-white/45">
                    Create your account and start connecting
                    with the people you care about.
                  </p>

                </div>

              </div>

              {/* Chat Preview */}
              <div className="mx-auto w-full max-w-[390px]">

                {/* Incoming */}
                <div className="mb-3 flex items-end gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#d9f99d] text-xs font-semibold text-[#10251c]">
                    J
                  </div>

                  <div className="rounded-[18px] rounded-bl-[5px] bg-white/[0.08] px-4 py-3">

                    <p className="text-[13px] text-white/75">
                      Welcome to Chatter 👋
                    </p>

                    <span className="mt-1 block text-[9px] text-white/30">
                      09:41 AM
                    </span>

                  </div>

                </div>

                {/* Outgoing */}
                <div className="mb-3 flex justify-end">

                  <div className="rounded-[18px] rounded-br-[5px] bg-[#d9f99d] px-4 py-3">

                    <p className="text-[13px] text-[#183022]">
                      Happy to be here!
                    </p>

                    <div className="mt-1 flex items-center justify-end gap-1">

                      <span className="text-[9px] text-[#183022]/50">
                        09:42 AM
                      </span>

                      <CheckIcon
                        size={11}
                        duration={0.5}
                      />

                    </div>

                  </div>

                </div>

                {/* Incoming */}
                <div className="flex items-end gap-2">

                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#fde68a] text-xs font-semibold text-[#713f12]">
                    S
                  </div>

                  <div className="rounded-[18px] rounded-bl-[5px] bg-white/[0.08] px-4 py-3">

                    <p className="text-[13px] text-white/75">
                      Let's get you connected.
                    </p>

                    <span className="mt-1 block text-[9px] text-white/30">
                      09:42 AM
                    </span>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* =====================================================
              RIGHT — REGISTER
          ====================================================== */}

          <section className="flex items-center justify-center px-6 py-10 sm:px-10 lg:px-12 xl:px-16">

            <div className="w-full max-w-[390px]">

              {/* Mobile Logo */}
              <div className="mb-9 flex items-center gap-3 lg:hidden">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#10251c] text-[#d9f99d]">

                  <MessageCircleIcon
                    size={19}
                    duration={0.8}
                  />

                </div>

                <span className="text-[17px] font-semibold tracking-tight">
                  Chatter
                </span>

              </div>

              {/* Heading */}
              <div className="mb-7">

                <h2 className="text-[32px] font-semibold tracking-[-0.045em] text-[#15251d]">
                  Create your account
                </h2>

                <p className="mt-2 text-[14px] leading-6 text-[#77827c]">
                  Join the conversation and stay connected.
                </p>

              </div>

              {/* Google */}
              <button
                type="button"
                onClick={handleGoogleSignup}
                className="flex h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#dde3df] bg-white text-[14px] font-medium text-[#26342d] transition hover:border-[#cbd5d0] hover:bg-[#f8faf9] active:scale-[0.99]"
              >

                {/* Google Logo */}
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
                    d="M12 6.37c1.43 0 2.71.49 3.72 1.45l2.79-2.79C16.84 3.46 14.63 2.5 12 2.5a9.74 9.74 0 0 0-8.71 5.38l3.24 2.52c.77-2.31 2.93-4.18 5.47-4.18Z"
                  />
                </svg>

                Continue with Google

              </button>

              {/* Divider */}
              <div className="my-6 flex items-center gap-4">

                <div className="h-px flex-1 bg-[#e7ebe8]" />

                <span className="text-[11px] uppercase tracking-[0.15em] text-[#a0aaa5]">
                  or
                </span>

                <div className="h-px flex-1 bg-[#e7ebe8]" />

              </div>

              {/* Form */}
              <form
                onSubmit={handleSubmit}
                className="space-y-4"
              >

                {/* Name */}
                <div>

                  <label
                    htmlFor="name"
                    className="mb-2 block text-[13px] font-medium text-[#35433b]"
                  >
                   @Username
                  </label>

                  <div
                    className={`group flex h-12 items-center rounded-xl border bg-white px-3.5 transition ${
                      errors.name
                        ? "border-red-400 ring-4 ring-red-500/[0.06]"
                        : "border-[#dfe5e1] focus-within:border-[#466c55] focus-within:ring-4 focus-within:ring-[#466c55]/[0.08]"
                    }`}
                  >

                    <UserIcon
                      size={18}
                      duration={0.7}
                      className="mr-3 shrink-0 text-[#9aa59f]"
                    />

                    <input
                      id="username"
                      type="text"
                      name="username"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="@Username"
                      autoComplete="username"
                      className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#17231d] outline-none placeholder:text-[#a7b0ab]"
                    />

                  </div>

                  {errors.username && (
                    <p className="mt-1.5 text-xs text-red-500">
                      {errors.username}
                    </p>
                  )}

                </div>

                {/* Email */}
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

                {/* Password */}
                <div>

                  <label
                    htmlFor="password"
                    className="mb-2 block text-[13px] font-medium text-[#35433b]"
                  >
                    Password
                  </label>

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
                      placeholder="Create a password"
                      autoComplete="Create-password"
                      className="h-full min-w-0 flex-1 bg-transparent text-[14px] text-[#17231d] outline-none placeholder:text-[#a7b0ab]"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword((prev) => !prev)
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


                {/* Submit */}
                <button
                  type="submit"
                  className="group mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#183326] text-[14px] font-medium text-white transition-all duration-200 hover:bg-[#244936] active:scale-[0.99]"
                >

                  Create account

                  <ArrowRightIcon
                    size={17}
                    duration={0.6}
                    className="transition-transform duration-200 group-hover:translate-x-1"
                  />

                </button>

              </form>

              {/* Login */}
              <p className="mt-7 text-center text-[13px] text-[#7d8781]">

                Already have an account?{" "}

                <Link
                  to="/auth/login"
                  className="font-medium text-[#304e3b] underline underline-offset-4"
                >
                  Sign in
                </Link>

              </p>

              {/* Terms */}
              <p className="mx-auto mt-6 max-w-[320px] text-center text-[11px] leading-5 text-[#a1aaa5]">

                By creating an account, you agree to our{" "}

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

export default Register;
