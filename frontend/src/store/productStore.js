import { create } from "zustand";
import axios from "axios";
import { handleApiError } from "../utils/handleApiError";

const useProductStore = create((set) => ({
  products: [],
  loading: false,
  generalError: null,


  createProduct: async (productData) => {
    try {
      set({ loading: true, generalError: null });
      const res = await axios.post("/api/products/createProduct", productData);
      set((prevState) => ({
        products: [...prevState.products, res.data.data],
        loading: false,
      }));
      return { success: true, data: res.data.data };
    } catch (error) {
      console.error("CreateProduct Error:", error);
      const message = handleApiError(error);
      set({ loading: false, generalError: message });
      return { success: false, error: message };
    }
  },
}));

export default useProductStore;
