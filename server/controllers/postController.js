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
    throw new Error("server error", error);
  }
});

const getPost = asyncHandler(async (req, res, next) => {
  try {
    req.session.touch();
    const postId = req.params.id;
    const userId = req.session.user ? req.session.user._id : null;
    const ip = req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    const post = await Post.findById(postId).populate({
      path: "user",
      select: "name id picture",
    });
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
  } catch (error) {
    res.status(404);
    const err = {
      message: "Product Not Found",
      detail: error.message,
    };
    return next(err);
  }
});

const createPost = asyncHandler(async (req, res) => {
  try {
    const { name, description, tags, content } = req.body;
    const post = new Post({
      user: req.session.user._id,
      name,
      description,
      tags,
      content,
    });
    const newPost = await post.save();
    res.status(201).json({
      _id: newPost._id,
      name: newPost.name,
      description: newPost.description,
      tags: newPost.tags,
      content: newPost.content,
    });
  } catch (error) {
    res.status(400);
    throw new Error("Create post error", error);
  }
});

export { getPosts, getPost, createPost };
