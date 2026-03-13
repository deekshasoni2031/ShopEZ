import express from "express";
import { body, param } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import {
  getCart,
  addCartItem,
  updateCartItem,
  removeCartItem
} from "../controllers/cartController.js";

const router = express.Router();

router.use(requireAuth);

router.get("/", getCart);

router.post(
  "/items",
  [
    body("productId").notEmpty().withMessage("productId is required"),
    body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1")
  ],
  addCartItem
);

router.put(
  "/items/:productId",
  [param("productId").notEmpty(), body("quantity").isInt({ min: 1 })],
  updateCartItem
);

router.delete(
  "/items/:productId",
  [param("productId").notEmpty()],
  removeCartItem
);

export default router;