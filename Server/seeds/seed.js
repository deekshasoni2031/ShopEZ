import dotenv from "dotenv";
dotenv.config({ path: "../.env" });
import mongoose from "mongoose";
import { connectDB } from "../config/db.js";
import User from "../models/User.js";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const run = async () => {
  await connectDB();

  try {
    const adminEmail = "admin@shopez.local";
    let admin = await User.findOne({ email: adminEmail });

    if (!admin) {
      const bcrypt = await import("bcryptjs");
      const salt = await bcrypt.default.genSalt(10);
      const passwordHash = await bcrypt.default.hash("admin123", salt);

      admin = await User.create({
        name: "Shopez Admin",
        email: adminEmail,
        passwordHash: passwordHash,
        role: "admin"
      });
      console.log("Created admin user with email:", adminEmail);
    } else {
      console.log("Admin user already exists:", adminEmail);
    }

    const existingProducts = await Product.countDocuments();
    if (existingProducts === 0) {
      const category = await Category.create({
        name: "Shopez Essentials",
        slug: "shopez-essentials"
      });

      await Product.insertMany([
        {
          name: "Classic White Sneakers",
          slug: "classic-white-sneakers",
          description: "Minimal, comfortable sneakers perfect for daily wear.",
          price: 2499,
          discountPrice: 1999,
          images: ["https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=800"],
          category: category._id,
          stock: 50
        },
        {
          name: "Everyday Backpack",
          slug: "everyday-backpack",
          description: "Durable backpack with laptop compartment and organizer pockets.",
          price: 2999,
          discountPrice: 2499,
          images: ["https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&q=80&w=800"],
          category: category._id,
          stock: 40
        }
      ]);

      console.log("Inserted sample products.");
    } else {
      console.log("Products already exist, skipping product seeding.");
    }
  } catch (err) {
    console.error("Seeding error:", err);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

run();