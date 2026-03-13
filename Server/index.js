import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import { connectDB } from "./config/db.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// Routes
import authRoutes from "./routes/authRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import configRoutes from "./routes/configRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

// Database
connectDB();

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
    credentials: true
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/config", configRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok", service: "shopez-server" });
});

// Error handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Shopez server running on port ${PORT}`);
});