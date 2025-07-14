import Redis from "ioredis";
import dotenv from "dotenv";

dotenv.config();

export const redis = new Redis(process.env.UPSTASH_REDIS_URL);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
// .eyJ1c2VySWQiOiI2ODQxMTVlMDAxYjFmZjgyOGYwNjliYjEiLCJpYXQiOjE3NTI0NzI4ODMsImV4cCI6MTc1MjQ3MjkxM30
// .Ah2F5kVv4Dw18ISv9BvJeB7MytxY1OfwT1612 - Qystg;
