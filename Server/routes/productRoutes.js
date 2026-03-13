import express from "express";
import { query } from "express-validator";
import {
  listProducts,
  getProductByIdOrSlug
} from "../controllers/productController.js";

const router = express.Router();

router.get(
  "/",
  [
    query("page").optional().isInt({ min: 1 }).toInt(),
    query("limit").optional().isInt({ min: 1, max: 100 }).toInt()
  ],
  listProducts
);

router.get("/:idOrSlug", getProductByIdOrSlug);

export default router;