import asyncHandler from "express-async-handler";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";

const getPosts = asyncHandler(async (req, res) => {
  try {
    const { skip, limit } = req.query;
    const skipNum = Number(skip);
    const limitNum = Number(limit);
    const postCount = await Post.countDocuments();
    const posts = await Post.find({})
      .skip(skipNum)
      .limit(limitNum)
      .sort({ createdAt: -1 })
      .populate({
        path: "user",
        select: "name",
      });
    res.json({
      posts,
      hasMore: postCount - (skipNum + limitNum) > 0,
    });
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
      user: {
        name: req.session.user.name,
        _id: req.session.user._id,
      },
    });
  } catch (error) {
    res.status(400);
    throw new Error("Create post error", error);
  }
});

const getMostViewPosts = asyncHandler(async (req, res, next) => {
  try {
    req.session.touch();
    const posts = await Post.find({}).populate({
      path: "user",
      select: "name id",
    });
    posts.sort((a, b) => b.readCount - a.readCount);
    if (posts.length > 5) {
      res.status(200).json(posts.slice(0, 5));
    } else {
      res.status(200).json(posts);
    }
  } catch (error) {
    return next(error);
  }
});

const searchPosts = asyncHandler(async (req, res, next) => {
  try {
    req.session.touch();
    const { keyword } = req.query;
    const posts = await Post.find({
      $or: [
        { name: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
        { content: { $regex: keyword, $options: "i" } },
        { tags: { $regex: keyword, $options: "i" } },
      ],
    }).populate({
      path: "user",
      select: "name id",
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log("error: ", error);
    return next(error);
  }
});

const getPostsByTag = asyncHandler(async (req, res, next) => {
  try {
    req.session.touch();
    const { tag } = req.query;
    const posts = await Post.find({
      tags: { $regex: tag, $options: "i" },
    }).populate({
      path: "user",
      select: "name id",
    });
    res.status(200).json(posts);
  } catch (error) {
    console.log("error: ", error);
    return next(error);
  }
});

export {
  getPosts,
  getPost,
  createPost,
  getMostViewPosts,
  searchPosts,
  getPostsByTag,
};
