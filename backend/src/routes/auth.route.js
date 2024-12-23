import express from "express";
import {
  login,
  logout,
  signup,
  updateProfile,
  checkAuth,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

//Api's routes for auth , and functions in controller
router.post("/signup", signup);

router.post("/login", login);

router.post("/logout", logout);

//auth.middleware.js --->> for checking the secure profile
router.put("/update-profile", protectRoute, updateProfile);

router.get("/check", protectRoute, checkAuth);

export default router;
