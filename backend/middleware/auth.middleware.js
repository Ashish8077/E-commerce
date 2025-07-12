import jwt from "jsonwebtoken";
import { sendResponse } from "../utils/response.util.js";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  if (!accessToken)
    return sendResponse(res, 401, {
      success: false,
      error: "Unauthorized - no access token provided",
    });

  try {
    const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return sendResponse(res, 401, {
        success: false,
        error: "Unauthorized - User not found",
      });
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res
        .status(401)
        .json({ message: "Unauthorized - Access token expired" });
    }
    throw error;
  }
};

export const adminRoute = async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return sendResponse(res, 403, {
      success: false,
      error: "Access denied - Admin only",
    });
  }
};

