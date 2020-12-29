import asyncHandler from "express-async-handler";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find({}).populate({
      path: "user",
      select: "name",
    });
    res.json(posts);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(error.status);
    throw new Error("server error", error);
  }
});

const getPost = asyncHandler(async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.session.user ? req.session.user._id : null;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const post = await Post.findById(postId).populate({
      path: "user",
      select: "name id picture",
    });
    if (post) {
      const { readBy } = post;
      const fromIp = readBy.get("fromIp");
      const fromUserId = readBy.get("fromUserId");
      let updated = false;
      if (!fromIp[ip]) {
        updated = true;
        fromIp[ip] = true;
      }
      if (userId && !fromUserId[userId]) {
        updated = true;
        fromUserId[userId] = true;
      }
      if (updated) {
        post.readCount += 1;
      }
      const updatedPost = await post.save();
      res.json(updatedPost);
    } else {
      res.status(404);
      throw new Error("Post not found");
    }
  } catch (error) {
    console.log("error: ", error.message);
    res.status(error.status);
    throw new Error("server error", error);
  }
});

export { getPosts, getPost };
