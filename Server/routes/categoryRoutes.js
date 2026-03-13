import express from "express";
import { param } from "express-validator";
import {
  listPublicCategories,
  listProductsByCategory
} from "../controllers/categoryController.js";

const router = express.Router();

router.get("/", listPublicCategories);

router.get(
  "/:id/products",
  [param("id").notEmpty()],
  listProductsByCategory
);

export default router;