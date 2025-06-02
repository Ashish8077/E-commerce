import rateLimit from "express-rate-limit";

export const signupRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes,
  max: 5, // limit each IP to 5 signup requests per windowMs
  message: {
    success: false,
    error: "Too many signup attempts. Please try again later.",
  },
  standardHeaders: true, // return rate limit info in the RateLimit-* headers
  legacyHeaders: false,
});

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes,
  max: 5, // limit each IP to 5 signup requests per windowMs
  message: {
    success: false,
    error: "Too many login attempts. Please try again later.",
  },
  standardHeaders: true, // return rate limit info in the RateLimit-* headers
  legacyHeaders: false,
});
