import express from "express";
import { body, param } from "express-validator";
import { requireAuth } from "../middleware/auth.js";
import {
  createOrderFromCart,
  listMyOrders,
  getOrderById
} from "../controllers/orderController.js";

const router = express.Router();

router.use(requireAuth);

router.post(
  "/",
  [
    body("shippingAddress.fullName").notEmpty(),
    body("shippingAddress.phone").notEmpty(),
    body("shippingAddress.street").notEmpty(),
    body("shippingAddress.city").notEmpty(),
    body("shippingAddress.state").notEmpty(),
    body("shippingAddress.postalCode").notEmpty(),
    body("shippingAddress.country").notEmpty(),
    body("paymentMethod").isIn(["COD", "SIMULATED"])
  ],
  createOrderFromCart
);

router.get("/my", listMyOrders);

router.get(
  "/:id",
  [param("id").notEmpty()],
  getOrderById
);

export default router;