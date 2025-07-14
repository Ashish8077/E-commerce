import { create } from "zustand";
import axios from "../lib/axios";
import { handleApiError } from "../utils/handleApiError";

const useUserStore = create((set, get) => ({
  user: null,
  checkingAuth: true,
  loading: false,
  generalError: null,
  emailError: null,
  authError: null,

  signup: async (signupData) => {
    try {
      set({ loading: true, emailError: null, generalError: null });
      const res = await axios.post("/auth/signup", signupData);
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
      const res = await axios.post("/auth/login", loginData);
      set({ user: res.data.data, loading: false });
      return { success: true, data: res.data.data };
    } catch (error) {
      console.error("Login error:", error);
      const message = handleApiError(error) || "Something went wrong";
      const isAuthenticationError = error?.response?.status === 401;
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
      await axios.post("/auth/logout");
      set({ user: null, loading: false });
      return { success: true };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      set({ loading: false, generalError: message });
      return { success: false, error: message };
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true, generalError: null });
    try {
      const res = await axios.get("/auth/profile");
      set({ user: res.data.data, checkingAuth: false });
    } catch (error) {
      const message = handleApiError(error);
      set({ checkingAuth: false, user: null, generalError: message });
    }
  },
  refreshToken: async () => {
    // if (get().checkingAuth) return;
    set({ checkingAuth: false });
    try {
      // set({ checkingAuth: true });
      const response = await axios.post("/auth/refresh-token");
      return response.data;
    } catch (error) {
      set({ user: null });
      throw error;
    }
  },
}));

let refreshPromise = null;

axios.interceptors.response.use(
  // If the response is successful (no error), just return it unchanged.
  (response) => response,
  // This is called if the response has an error, like a 401 unauthorized error.
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("/auth/login") &&
      !originalRequest.url.includes("/auth/signup")
    ) {
      originalRequest._retry = true;
      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default useUserStore;
