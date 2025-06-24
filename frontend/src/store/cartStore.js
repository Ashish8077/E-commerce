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
      set({ loading: false });
      return { success: false, error: message };
    }
  },
  addToCart: async (product) => {
    try {
      set({ loading: true });
      set((state) => {
        const existingItem = state.cart.find(
          (item) => item.product.id === product.id
        );
        const newCart = existingItem
          ? state.cart.map((item) => {
              return item.product.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item;
            })
          : [...state.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      await axios.post(`/cart/${product.id}`);
      await get().fetchCartItems();
      return { success: true };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      set({ loading: false });
      return { success: false, error: message };
    } finally {
      set({ loading: false });
    }
  },
  updateQuantity: async (operation, productId) => {
    let updatedQuantity = 1;
    set((state) => {
      const newCart = state.cart.map((item) => {
        if (item.product.id === productId) {
          updatedQuantity =
            operation === "+"
              ? item.quantity + 1
              : Math.max(item.quantity - 1, 1);
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      });
      return { cart: newCart };
    });
    try {
      axios.patch("/cart/update-quantity", {
        updatedQuantity,
        productId,
      });
      return { success: true };
    } catch (error) {
      await get().fetchCartItems();
      const message = handleApiError(error) || "Something went wrong";
      return { success: false, error: message };
    }
  },
  removeFromCart: async (productId) => {
    try {
      await axios.delete(`/cart/${productId}`);
      await get().fetchCartItems();
      return { success: true };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      return { success: false, error: message };
    }
  },
}));

export default useCartStore;
