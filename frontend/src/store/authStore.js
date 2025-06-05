import { create } from "zustand";
import axios from "axios";
import { handleApiErro } from "../utils/handleApiError";

const useUserStore = create((set) => ({
  user: null,
  auth: {
    loading: false,
    emailError: "",
    generalError: "",
    checkingAuth: true,
  },
  signup: async (signupData) => {
    try {
      set((state) => ({
        auth: {
          ...state.auth,
          loading: true,
          emailError: "",
          generalError: "",
        },
      }));
      const res = await axios.post("/api/auth/signup", signupData);
      set((state) => ({
        user: res.data.data,
        auth: { ...state.auth, loading: false },
      }));

      return { success: res.data.success };
    } catch (error) {
      const message = handleApiErro(error);
      set((state) => ({
        auth: {
          ...state.auth,
          loading: false,
          emailError: error?.response?.status === 400 ? message : "",
          generalError: error?.response?.status !== 400 ? message : "",
        },
      }));
    }
  },
  login: async (loginData) => {
    try {
      set((state) => ({
        auth: { ...state.auth, loading: true },
      }));
      const res = await axios.post("/api/auth/login", loginData);
      set((state) => ({
        user: res.data.data,
        auth: { ...state.auth, loading: false },
      }));
      return { success: res.data.success };
    } catch (error) {
      const message = handleApiErro(error);

      set((state) => ({
        auth: {
          ...state.auth,
          loading: false,
          generalError: message,
        },
      }));
      return { success: error?.response?.data?.success };
    }
  },
  logout: async () => {
    try {
      set((state) => ({
        auth: { ...state.auth, loading: true },
      }));
      const res = await axios.post("/api/auth/logout");
      set((state) => ({ user: null, auth: { ...state.auth, loading: false } }));
    } catch (error) {
      const message = handleApiErro();
      set((state) => ({
        auth: { ...state.auth, loading: false, generalError: message },
      }));
    }
  },
  checkAuth: async () => {
    try {
      set((state) => ({
        auth: { ...state.auth, checkingAuth: true },
      }));
      const res = await axios.get("/api/auth/profile");
      set((state) => ({
        user: res.data.data,
        auth: { ...state.auth, checkingAuth: false },
      }));
    } catch (error) {
      const message = handleApiErro();
      set((state) => ({
        auth: {
          ...state.auth,
          checkingAuth: false,
          generalError: message,
        },
      }));
    }
  },
}));

export default useUserStore;
