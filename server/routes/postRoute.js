import express from "express";
import {
  getPosts,
  getPost,
  createPost,
} from "../controllers/postController.js";
import { auth } from "../middleWares/authMiddleware.js";

const router = express.Router();

router.route("/").get(getPosts);
router.route("/").post(auth, createPost);
router.get("/:id", getPost);

export default router;
