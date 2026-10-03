import api from "./api";

// Register
export const registerUser = (data) => api.post("/auth/register", data);

// Login
export const loginUser = (data) => api.post("/auth/login", data);

// Logged in user ka data (ProtectedRoute/AuthContext ke liye)
export const getMe = () => api.get("/auth/me");

// Logout
export const logoutUser = () => api.post("/auth/logout");

// Token refresh
export const refreshToken = () => api.post("/auth/refresh");

// Google login (axios nahi, browser redirect)
export const googleLoginUrl = `${import.meta.env.VITE_BASE_URL}/auth/google`;

export const googleRegisterUrl =`${import.meta.env.VITE_BASE_URL}/auth/google`