import SiteConfig from "../models/SiteConfig.js";

export const getHomeConfig = async (req, res, next) => {
  try {
    const config = await SiteConfig.findOne({ key: "home" })
      .populate("featuredCategories", "name slug")
      .populate("featuredProducts", "name slug price images");

    res.json(
      config || {
        key: "home",
        banners: [],
        featuredCategories: [],
        featuredProducts: []
      }
    );
  } catch (err) {
    next(err);
  }
};

export const updateHomeConfig = async (req, res, next) => {
  try {
    const config = await SiteConfig.findOneAndUpdate(
      { key: "home" },
      { ...req.body, key: "home" },
      { new: true, upsert: true }
    );
    res.json(config);
  } catch (err) {
    next(err);
  }
};