import express from "express";
import {
  createProduct,
  deleteProduct,
  getAllProducts,
  updateProduct,
} from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";
import { validate } from "../middleware/validate.middleware.js";
import { createProductSchema } from "../validations/product.validation.js";

const router = express.Router();

router.get("/", protectRoute, adminRoute, getAllProducts);
router.post(
  "/createProduct",
  protectRoute,
  adminRoute,
  validate(createProductSchema),
  createProduct
);
router.put("/:id", protectRoute, adminRoute, updateProduct);
router.delete("/:id", protectRoute, adminRoute, deleteProduct);

export default router;
