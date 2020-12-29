import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/UserModel.js";
import Post from "./models/PostModel.js";
import users from "./data/users.js";
import posts from "./data/posts.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    const newUsers = await User.insertMany(users);
    const firstUserId = newUsers[0]._id;
    const newPosts = posts.map((post) => {
      return { ...post, user: firstUserId };
    });
    await Post.insertMany(newPosts);
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log("Data import error: ", error);
    process.exit(1);
  }
};

importData();
