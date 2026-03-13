import { validationResult } from "express-validator";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

export const listProducts = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const {
    page = 1,
    limit = 12,
    search,
    category,
    sort = "createdAt"
  } = req.query;

  const filter = { isActive: true };

  if (search) {
    filter.name = { $regex: search, $options: "i" };
  }

  if (category) {
    const cat = await Category.findOne({ slug: category });
    if (cat) {
      filter.category = cat._id;
    }
  }

  const sortOptions = {};
  if (sort === "price_asc") sortOptions.price = 1;
  else if (sort === "price_desc") sortOptions.price = -1;
  else sortOptions.createdAt = -1;

  try {
    const [items, total] = await Promise.all([
      Product.find(filter)
        .populate("category", "name slug")
        .sort(sortOptions)
        .skip((page - 1) * limit)
        .limit(Number(limit)),
      Product.countDocuments(filter)
    ]);

    res.json({
      items,
      total,
      page: Number(page),
      pages: Math.ceil(total / limit)
    });
  } catch (err) {
    next(err);
  }
};

export const getProductByIdOrSlug = async (req, res, next) => {
  const { idOrSlug } = req.params;

  try {
    const query = idOrSlug.match(/^[0-9a-fA-F]{24}$/)
      ? { _id: idOrSlug }
      : { slug: idOrSlug };

    const product = await Product.findOne(query).populate("category", "name slug");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    const related = await Product.find({
      _id: { $ne: product._id },
      category: product.category?._id,
      isActive: true
    })
      .limit(4)
      .select("name slug price images");

    res.json({ product, related });
  } catch (err) {
    next(err);
  }
};