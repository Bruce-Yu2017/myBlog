import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  getMostViewPosts,
  searchPosts,
} from "../controllers/postController.js";
import { auth } from "../middleWares/authMiddleware.js";

const router = express.Router();

router.route("/search").post(searchPosts);
router.route("/mostviewsposts").get(getMostViewPosts);
router.route("/").get(getPosts);
router.route("/create").post(auth, createPost);
router.get("/:id", getPost);

export default router;
