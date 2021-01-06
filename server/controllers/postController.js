import asyncHandler from "express-async-handler";
import Post from "../models/PostModel.js";
import User from "../models/UserModel.js";
import Reply from "../models/ReplyModel.js";
import Comment from "../models/CommentModel.js";

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
    const post = await Post.findById(postId)
      .populate({
        path: "user",
        select: "name id picture",
      })
      .populate({
        path: "replies",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "author", select: "id name" },
          {
            path: "comments",
            options: { sort: { createdAt: -1 } },
            populate: [
              { path: "author", select: "id name" },
              {
                path: "targetComment",
                populate: { path: "author", select: "id name" },
              },
            ],
          },
        ],
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

const handleThunbUp = asyncHandler(async (req, res, next) => {
  try {
    req.session.touch();
    const { postId } = req.params;
    const post = await Post.findById(postId).populate({
      path: "user",
      select: "name id",
    });
    const user = await User.findById(req.session.user._id);
    if (user.thumbUpPosts.has(postId)) {
      user.thumbUpPosts.delete(postId);
      post.thumpUpCount -= 1;
    } else {
      user.thumbUpPosts.set(postId, true);

      post.thumpUpCount += 1;
    }
    await post.save();
    await user.save();
    res.status(200).json({ post, user });
  } catch (error) {
    console.log("error: ", error);
    return next(error);
  }
});

const createReplyOrComment = asyncHandler(async (req, res, next) => {
  try {
    req.session.touch();
    const { postId } = req.params;
    const { content, type, replyId, targetCommentId } = req.body;
    const post = await Post.findById(postId);
    if (type === "reply") {
      const reply = new Reply({
        author: req.session.user._id,
        content,
        createdAt: new Date(),
      });
      const newReply = await reply.save();
      post.replies.push(newReply._id);
    } else if (type === "comment") {
      const reply = await Reply.findById(replyId);
      const comment = new Comment({
        author: req.session.user._id,
        content,
        createdAt: new Date(),
      });
      const newComment = await comment.save();
      reply.comments.push(newComment._id);
      await reply.save();
    } else if (type === "targetComment") {
      const reply = await Reply.findById(replyId);
      const comment = new Comment({
        author: req.session.user._id,
        content,
        targetComment: targetCommentId,
        createdAt: new Date(),
      });
      const newComment = await comment.save();
      reply.comments.push(newComment._id);
      await reply.save();
    }
    await post.save();
    const updatedPost = await Post.findById(postId)
      .populate({
        path: "user",
        select: "name id picture",
      })
      .populate({
        path: "replies",
        options: { sort: { createdAt: -1 } },
        populate: [
          { path: "author", select: "id name" },
          {
            path: "comments",
            options: { sort: { createdAt: -1 } },
            populate: [
              { path: "author", select: "id name" },
              {
                path: "targetComment",
                populate: { path: "author", select: "id name" },
              },
            ],
          },
        ],
      });
    res.status(200).json(updatedPost);
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
  handleThunbUp,
  createReplyOrComment,
};
