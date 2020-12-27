import asyncHandler from "express-async-handler";
import Blog from "../models/BlogModel.js";
import User from "../models/UserModel.js";

const getBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate({
      path: "user",
      select: "name",
    });
    res.json(blogs);
  } catch (error) {
    console.log("error: ", error.message);
    res.status(error.status);
    throw new Error("server error", error);
  }
});

export { getBlogs };
