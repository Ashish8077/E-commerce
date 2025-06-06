import express from "express";
import dotenv from "dotenv";
import connectDB from "./connection/db.js";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);

app.listen(PORT, () => {
  console.log(`Server is started at http://localhost:${PORT}`);
  connectDB();
});
