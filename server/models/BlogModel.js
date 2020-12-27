import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const BlogSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    tag: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },

    createdAt: { default: new Date(), type: Date },
  },
  {
    timeStamps: true,
  }
);

const Blog = mongoose.model("Blog", BlogSchema);
export default Blog;
