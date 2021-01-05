import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const initMap = () => {
  const map = new Map();
  map.set("fromIp", {});
  map.set("fromUserId", {});
  return map;
};

const PostSchema = mongoose.Schema(
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
    description: {
      type: String,
      required: true,
    },
    tags: {
      type: [String],
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    readCount: {
      type: Number,
      default: 0,
    },
    readBy: {
      type: Map,
      default: initMap(),
    },
    thumpUpCount: {
      type: Number,
      default: 0,
    },
    createdAt: { default: new Date(), type: Date },
  },
  {
    timeStamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
export default Post;
