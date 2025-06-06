import { create } from "zustand";
import axios from "axios";
import { handleApiError } from "../utils/handleApiError";

const useUserStore = create((set) => ({
  user: null,
  checkingAuth: true,
  loading: false,
  generalError: null,
  emailError: null,
  authError: null,

  signup: async (signupData) => {
    try {
      set({ loading: true, emailError: null, generalError: null });
      const res = await axios.post("/api/auth/signup", signupData);
      set({ user: res.data.data, loading: false });
      return { success: true, data: res.data.data };
    } catch (error) {
      console.error("Signup error:", error);
      const message = handleApiError(error) || "Something went wrong";
      const isValidationError = error?.response?.status === 400;
      set({
        loading: false,
        emailError: isValidationError ? message : null,
        generalError: !isValidationError ? message : null,
      });
      return { success: false, error: message };
    }
  },

  login: async (loginData) => {
    try {
      set({ loading: true, authError: null, generalError: null });
      const res = await axios.post("/api/auth/login", loginData);
      set({ user: res.data.data, loading: false });
      return { success: true, data: res.data.data };
    } catch (error) {
      console.error("Login error:", error);
      const message = handleApiError(error) || "Something went wrong";
      const isAuthenticationError = error?.response?.status === 401;
      console.log(isAuthenticationError);
      set({
        loading: false,
        authError: isAuthenticationError ? message : null,
        generalError: !isAuthenticationError ? message : null,
      });
      return { success: false, error: message };
    }
  },

  logout: async () => {
    try {
      set({ loading: true, generalError: null });
      await axios.post("/api/auth/logout");
      set({ user: null, loading: false });
      return { success: true };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      set({ loading: false, generalError: message });
      return { success: false, error: message };
    }
  },

  checkAuth: async () => {
    try {
      set({ checkingAuth: true, generalError: null });
      const res = await axios.get("/api/auth/profile");
      set({ user: res.data.data, checkingAuth: false });
      return { success: true, data: res.data.data, checkingAuth: false };
    } catch (error) {
      console.error("CheckAuth error:", error);
      const message = handleApiError(error);
      set({ checkingAuth: false, user: null, generalError: message });
      return { success: false, error: message };
    }
  },
}));

export default useUserStore;
