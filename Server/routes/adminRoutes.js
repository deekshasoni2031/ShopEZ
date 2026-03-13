import express from "express";
import { body, param } from "express-validator";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  adminLogin,
  listAllOrders,
  updateOrderStatus,
  createProduct,
  updateProduct,
  deleteProduct,
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory
} from "../controllers/adminController.js";

const router = express.Router();

router.post(
  "/login",
  [
    body("email").isEmail(),
    body("password").notEmpty()
  ],
  adminLogin
);

// All routes below require admin
router.use(requireAuth, requireAdmin);

// Orders
router.get("/orders", listAllOrders);
router.put(
  "/orders/:id/status",
  [param("id").notEmpty(), body("status").isIn(["pending", "confirmed", "shipped", "delivered", "cancelled"])],
  updateOrderStatus
);

// Products
router.post(
  "/products",
  [
    body("name").notEmpty(),
    body("slug").notEmpty(),
    body("description").notEmpty(),
    body("price").isNumeric()
  ],
  createProduct
);
router.put(
  "/products/:id",
  [param("id").notEmpty()],
  updateProduct
);
router.delete(
  "/products/:id",
  [param("id").notEmpty()],
  deleteProduct
);

// Categories
router.get("/categories", listCategories);
router.post(
  "/categories",
  [body("name").notEmpty(), body("slug").notEmpty()],
  createCategory
);
router.put(
  "/categories/:id",
  [param("id").notEmpty()],
  updateCategory
);
router.delete(
  "/categories/:id",
  [param("id").notEmpty()],
  deleteCategory
);

export default router;