import { validationResult } from "express-validator";
import Category from "../models/Category.js";
import Product from "../models/Product.js";

export const listPublicCategories = async (req, res, next) => {
  try {
    const categories = await Category.find({ isActive: true }).sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    next(err);
  }
};

export const listProductsByCategory = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    if (!category || !category.isActive) {
      return res.status(404).json({ message: "Category not found" });
    }

    const products = await Product.find({
      category: category._id,
      isActive: true
    }).select("name slug price images");

    res.json({
      category,
      products
    });
  } catch (err) {
    next(err);
  }
};

