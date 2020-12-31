import express from "express";
import {
  register,
  login,
  logout,
  getAuthStatus,
} from "../controllers/userController.js";
import { auth } from "../middleWares/authMiddleware.js";

const router = express.Router();

router.post("/", register);
router.post("/login", login);
router.post("/logout", logout);
router.route("/auth").get(auth, getAuthStatus);

export default router;
