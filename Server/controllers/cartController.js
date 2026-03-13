import { validationResult } from "express-validator";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";

const getOrCreateCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product");
  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
    cart = await cart.populate("items.product");
  }
  return cart;
};

export const getCart = async (req, res, next) => {
  try {
    const cart = await getOrCreateCart(req.user.id);
    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const addCartItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: "Product not found" });
    }

    const cart = await getOrCreateCart(req.user.id);

    const existingItem = cart.items.find(
      (item) => (item.product._id || item.product).toString() === product._id.toString()
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        product: product._id,
        quantity,
        priceSnapshot: product.discountPrice || product.price
      });
    }

    await cart.save();
    await cart.populate("items.product");

    res.status(201).json(cart);
  } catch (err) {
    next(err);
  }
};

export const updateCartItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await getOrCreateCart(req.user.id);

    const item = cart.items.find(
      (i) => (i.product._id || i.product).toString() === productId
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    item.quantity = quantity;
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    next(err);
  }
};

export const removeCartItem = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { productId } = req.params;

  try {
    const cart = await getOrCreateCart(req.user.id);

    cart.items = cart.items.filter(
      (i) => (i.product._id || i.product).toString() !== productId
    );
    await cart.save();
    await cart.populate("items.product");

    res.json(cart);
  } catch (err) {
    next(err);
  }
};