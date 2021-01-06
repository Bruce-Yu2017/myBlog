import express from "express";
import {
  getPosts,
  getPost,
  createPost,
  getMostViewPosts,
  searchPosts,
  getPostsByTag,
  handleThunbUp,
  createReplyOrComment,
} from "../controllers/postController.js";
import { auth } from "../middleWares/authMiddleware.js";

const router = express.Router();

router.route("/search").post(searchPosts);
router.route("/thumbUp/:postId").put(auth, handleThunbUp);
router.route("/reply/:postId").post(createReplyOrComment);
router.route("/mostviewsposts").get(getMostViewPosts);
router.route("/tags").get(getPostsByTag);
router.route("/").get(getPosts);
router.route("/create").post(auth, createPost);
router.get("/:id", getPost);

export default router;
