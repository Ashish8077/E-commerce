import express from "express";
import {
  addToCart,
  getCartProducts,
  removeAllProducts,
  updateQuantity,
} from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/", protectRoute, getCartProducts);
router.post("/:id", protectRoute, addToCart);
router.patch("/update-quantity", protectRoute, updateQuantity);
router.delete("/:id", protectRoute, removeAllProducts);

export default router;
