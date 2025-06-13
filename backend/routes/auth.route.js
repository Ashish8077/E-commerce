import express from "express";
import {
  signup,
  login,
  logout,
  getProfile,
  refreshToken,
} from "../controllers/auth.controller.js";
import { validate } from "../middleware/validate.middleware.js";
import { signupSchema, loginSchema } from "../validations/user.validation.js";
import {
  loginRateLimiter,
  signupRateLimiter,
} from "../middleware/rateLimiter.middleware.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import { normalizeEmail } from "../middleware/normalizeEmail.middleware.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), normalizeEmail, signup);
router.post("/login", validate(loginSchema), normalizeEmail, login);
router.post("/logout", logout);
router.post("/refresh-token", refreshToken);
router.get("/profile", protectRoute, getProfile);

export default router;
