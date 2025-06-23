// import mongoose from "mongoose";
import Cart from "../models/cartItems.model.js";
import Product from "../models/product.model.js";
import { sendResponse } from "../utils/response.util.js";

export const getCartProducts = async (req, res) => {
  try {
    const userId = req.user?._id;
    if (!userId) {
      return sendResponse(res, 401, {
        success: false,
        message: "Unauthorized: User not found",
      });
    }
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.product",
      "name image price"
    );
    if (!cart) {
      return sendResponse(res, 200, { success: false, data: [] });
    }
    return sendResponse(res, 200, { success: false, data: cart.items });
  } catch (error) {
    console.error(`Error in getCartPorducts controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const addToCart = async (req, res) => {
  try {
    const userId = req.user._id;
    const { id: productId } = req.params;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity: 1 }],
      });
    } else {
      const existingItem = cart.items.find(
        (item) => item.product.toString() === productId
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.items.push({ product: productId, quantity: 1 });
      }
    }
    await cart.save();
    const populatedCart = await Cart.findById(cart._id)
      .populate("user")
      .populate("items.product");
    sendResponse(res, 200, { success: true, data: populatedCart });
  } catch (err) {
    console.error(err);
    sendResponse(res, 500, { success: false, error: "Internal server error" });
  }
};
