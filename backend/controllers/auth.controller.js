import User from "../models/user.model.js";
import jwt, { decode } from "jsonwebtoken";
import {
  checkExistingUser,
  createUser,
  generateTokenAndSetCookie,
  logoutUser,
} from "../services/auth.service.js";
import { sendResponse } from "../utils/response.util.js";

export const signup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;
    const user = await checkExistingUser(email);
    if (user && user.email === email)
      return sendResponse(res, 400, {
        success: false,
        error: "Email is already in use",
      });
    const newUser = await createUser(fullName, email, password);
    await generateTokenAndSetCookie(res, newUser._id);
    return sendResponse(res, 201, { success: true, data: newUser });
  } catch (error) {
    console.error(`Error in signup controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await checkExistingUser(email);
    if (!user)
      return sendResponse(res, 401, {
        success: false,
        error: "Invalid credentials",
      });

    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid)
      return sendResponse(res, 401, {
        success: false,
        error: "Invalid credentials",
      });

    await generateTokenAndSetCookie(res, user._id);

    return sendResponse(res, 200, { success: true, data: user });
  } catch (error) {
    console.error(`Error in login controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken)
      return sendResponse(res, 401, {
        success: false,
        error: "Refresh token not found",
      });
    await logoutUser(refreshToken);

    res.clearCookie("accessToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.clearCookie("refreshToken", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });
    return sendResponse(res, 200, {
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(`Error in logout controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = req.user;
    if (!user)
      return sendResponse(res, 401, {
        success: false,
        error: "Unauthorized - User not found",
      });
    return sendResponse(res, 200, { success: true, data: user });
  } catch (error) {
    console.error(`Error in getProfile controller ${error.message}`);
    return sendResponse(res, 500, {
      success: false,
      error: "Internal server error",
    });
  }
};
