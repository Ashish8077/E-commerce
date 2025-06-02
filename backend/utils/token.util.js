import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";

export const generateTokes = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  });

  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  });

  return { refreshToken, accessToken };
};

export const setRefreshToken = async (userId, refreshToken) => {
  await redis.set(
    `storeRefreshToken:${userId}`,
    refreshToken,
    "Ex",
    7 * 24 * 60 * 60 // expects time in seconds,
  );
};

export const setCookies = async (res, accessToken, refreshToken) => {
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 15 * 60 * 1000,
  });
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
};
