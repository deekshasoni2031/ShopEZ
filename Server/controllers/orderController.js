import { validationResult } from "express-validator";
import Cart from "../models/Cart.js";
import Order from "../models/Order.js";

export const createOrderFromCart = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { shippingAddress, paymentMethod } = req.body;

  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const items = cart.items.map((item) => ({
      product: item.product._id,
      name: item.product.name,
      image: item.product.images?.[0],
      quantity: item.quantity,
      price: item.priceSnapshot
    }));

    const totalAmount = items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user.id,
      items,
      shippingAddress,
      paymentMethod,
      status: "confirmed",
      totalAmount
    });

    // Clear cart
    cart.items = [];
    await cart.save();

    res.status(201).json(order);
  } catch (err) {
    next(err);
  }
};

export const listMyOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .sort({ createdAt: -1 });

    res.json(orders);
  } catch (err) {
    next(err);
  }
};

export const getOrderById = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { id } = req.params;

  try {
    const order = await Order.findOne({
      _id: id,
      user: req.user.id
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json(order);
  } catch (err) {
    next(err);
  }
};