import { create } from "zustand";
import { handleApiError } from "../utils/handleApiError";
import axios from "../../lib/axios";

const useCartStore = create((set, get) => ({
  cart: [],
  total: 0,
  subTotal: 0,
  error: null,
  loading: false,
  fetchCartItems: async () => {
    try {
      set({ loading: true });
      const res = await axios.get("/cart/");
      set({ cart: res.data.data, loading: false });
      return { success: true, data: res.data.data };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      console.log(message);
      return { success: false, error: message };
    }
  },
  addToCart: async (product) => {
    try {
      const res = await axios.post(`/cart/${product.id}`);
      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item.id === product.id
        );
        const newCart = existingItem
          ? prevState.cart.map((item) => {
              return item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            })
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      return { success: true, data: res.data.data };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      console.log(message);
      return { success: false, error: message };
    }
  },
}));

export default useCartStore;
