import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import {
  generateTokes,
  setCookies,
  setRefreshToken,
} from "../utils/token.util.js";
import { redis } from "../lib/redis.js";

export const checkExistingUser = async (email) => {
  return await User.findOne({ email });
};

export const createUser = async (fullName, email, password) => {
  const newUser = await User.create({ fullName, email, password });
  return newUser;
};

export const generateTokenAndSetCookie = async (res, userId) => {
  const { accessToken, refreshToken } = generateTokes(userId);

  await setRefreshToken(userId, refreshToken);
  await setCookies(res, accessToken, refreshToken);
};

export const logoutUser = async (refreshToken) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    await redis.del(`storeRefreshToken:${decoded.userId}`);
  } catch (error) {
    console.log(`Logout token decode failed: ${error.message}`);
  }
};
