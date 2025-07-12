import { create } from "zustand";
import { handleApiError } from "../utils/handleApiError";
import axios from "../../lib/axios";
import { debounceUpdateQuantity } from "../utils/debounceApi";

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
      get().calculateTotal();
      return { success: true, data: res.data.data };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      set({ loading: false });
      return { success: false, error: message };
    }
  },
  addToCart: async (product) => {
    try {
      const existingItem = get().cart.find((item) => {
        return item.product.id === product.id;
      });

      if (existingItem) {
        set((state) => ({
          cart: state.cart.map((item) => {
            return item.product.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item;
          }),
        }));
      } else {
        set((state) => ({
          cart: [...state.cart, { product, quantity: 1 }],
        }));
      }
      await axios.post(`/cart/${product.id}`);
      get().calculateTotal();
      return { success: true };
    } catch (error) {
      const message = handleApiError(error) || "Something went wrong";
      return { success: false, error: message };
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
    debounceUpdateQuantity(productId, updatedQuantity, async (pid, qty) => {
      try {
        axios.patch("/cart/update-quantity", {
          updatedQuantity,
          productId,
        });
        get().calculateTotal();
        return { success: true };
      } catch (error) {
        await get().fetchCartItems();
        const message = handleApiError(error) || "Something went wrong";
        return { success: false, error: message };
      }
    });
  },
  deleteItemFromCart: async (productId) => {
    // Backup the item in case rollback is needed
    const itemToRemove = get().cart.find(
      (item) => item.product.id === productId
    );
    set((state) => {
      const updatedCart = state.cart.filter(
        (item) => item.product.id !== productId
      );
      return { cart: updatedCart };
    });
    try {
      await axios.delete(`/cart/${productId}`);
      get().calculateTotal();
      return { success: true };
    } catch (error) {
      set((state) => ({
        cart: [...state.cart, itemToRemove],
      }));
      const message = handleApiError(error) || "Something went wrong";
      return { success: false, error: message };
    }
  },
  calculateTotal: () => {
    const { cart } = get();
    const subTotal = cart.reduce((sum, item) => {
      return sum + item.product.price * item.quantity;
    }, 0);
    let total = subTotal;
    set({ total, subTotal });
  },
}));

export default useCartStore;
