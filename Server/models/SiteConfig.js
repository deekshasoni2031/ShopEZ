import mongoose from "mongoose";

const bannerSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },
    title: { type: String },
    subtitle: { type: String },
    link: { type: String }
  },
  { _id: false }
);

const siteConfigSchema = new mongoose.Schema(
  {
    key: { type: String, required: true, unique: true }, // e.g. "home"
    banners: [bannerSchema],
    featuredCategories: [{ type: mongoose.Schema.Types.ObjectId, ref: "Category" }],
    featuredProducts: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }]
  },
  { timestamps: true }
);

const SiteConfig = mongoose.model("SiteConfig", siteConfigSchema);

export default SiteConfig;