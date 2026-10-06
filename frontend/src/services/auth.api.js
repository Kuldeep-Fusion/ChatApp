import api from "./api";

// Register
export const registerUser = (data) => api.post("/auth/register", data);

// Login
export const loginUser = (data) => api.post("/auth/login", data);

//refresh
export const RefreshToken = () => api.post("/auth/refresh");

// Logged in user ka data (ProtectedRoute/AuthContext ke liye)
export const getMe = () => api.get("/auth/me");

// Logout
export const logoutUser = () => api.post("/auth/logout");

//delete Account
export const DeleteAccount = () => api.delete("/auth/delete");

// Google login (axios nahi, browser redirect)
export const googleLoginUrl = `${import.meta.env.VITE_BASE_URL}/auth/google`;
export const googleRegisterUrl =`${import.meta.env.VITE_BASE_URL}/auth/google`