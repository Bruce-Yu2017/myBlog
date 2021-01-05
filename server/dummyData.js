import dotenv from "dotenv";
import connectDB from "./config/db.js";
import User from "./models/UserModel.js";
import Post from "./models/PostModel.js";
import Reply from "./models/ReplyModel.js";
import Comment from "./models/CommentModel.js";
import users from "./data/users.js";
import posts from "./data/posts.js";

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await User.deleteMany();
    await Post.deleteMany();
    await Reply.deleteMany();
    await Comment.deleteMany();
    const newUsers = await User.insertMany(users);
    const firstUserId = newUsers[0]._id;
    const secondUserId = newUsers[1]._id;
    const newPosts = posts.map((post) => {
      return { ...post, user: firstUserId };
    });
    const newposts = await Post.insertMany(newPosts);
    const post = newposts[0];
    const newComment = await Comment.create({
      author: firstUserId,
      content: "Comment to first comment",
    });
    const firstTargetComment = await Comment.create({
      author: secondUserId,
      content: "Comment to first reply",
    });
    newComment.targetComment = firstTargetComment._id;
    await newComment.save();
    const newReply = await Reply.create({
      author: firstUserId,
      content: "My first reply",
      comments: [firstTargetComment._id, newComment._id],
    });
    post.replys.push(newReply);
    await post.save();
    console.log("Data imported");
    process.exit();
  } catch (error) {
    console.log("Data import error: ", error);
    process.exit(1);
  }
};

importData();
