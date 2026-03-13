import express from "express";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import {
  getHomeConfig,
  updateHomeConfig
} from "../controllers/configController.js";

const router = express.Router();

router.get("/home", getHomeConfig);

router.put("/home", requireAuth, requireAdmin, updateHomeConfig);

export default router;