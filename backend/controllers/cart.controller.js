import mongoose from "mongoose";
import Cart from "../models/cartItems.model.js";
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
    const cartWithVirtuals = cart.toJSON();
    return sendResponse(res, 200, {
      success: false,
      data: cartWithVirtuals.items,
    });
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

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return sendResponse(res, 400, {
        success: false,
        error: "Invalid product ID",
      });
    }

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
  } catch (error) {
    console.error(`Error in addToCart controller: ${error.message}`);
    sendResponse(res, 500, { success: false, error: "Internal server error" });
  }
};

export const updateQuantity = async (req, res) => {
  try {
    const { productId, updatedQuantity: quantity } = req.body;
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    const cartItem = cart.items.find(
      (item) => item.product._id.toString() === productId
    );
    if (cartItem) {
      cartItem.quantity = quantity;
    } else {
      return sendResponse(res, 404, {
        success: false,
        message: "Item not found in cart",
      });
    }
    await cart.save();
    sendResponse(res, 200, { success: true });
  } catch (error) {
    console.error(`Error in updateQuantity controller: ${error.message}`);
    sendResponse(res, 500, { success: false, error: "Internal server error" });
  }
};

export const removeAllProducts = async (req, res) => {
  try {
    const { id: productId } = req.params;
    const userId = req.user._id;
    let cart = await Cart.findOne({ user: userId });
    if (!productId) {
      cart.items = [];
    } else {
      cart.items = cart.items.filter((item) => {
        return item.product.toString() !== productId;
      });
    }
    await cart.save();
    sendResponse(res, 200, {
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    console.error(`Error in removeAllProducts controller: ${error.message}`);
    sendResponse(res, 500, { success: false, error: "Internal server error" });
  }
};
