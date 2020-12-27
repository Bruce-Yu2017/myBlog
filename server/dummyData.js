import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/UserModel.js";
import Blog from "./models/BlogModel.js";
import users from "./data/users.js";
import blogs from "./data/blogs.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Blog.deleteMany();
    const newUsers = await User.insertMany(users);
    const firstUserId = newUsers[0]._id;
    const newBlogs = blogs.map((blog) => {
      return { ...blog, user: firstUserId };
    });
    await Blog.insertMany(newBlogs);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log("Data import error: ", error);
    process.exit(1);
  }
};

importData();
