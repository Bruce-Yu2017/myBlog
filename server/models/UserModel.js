import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const UserSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    picture: {
      type: Map,
    },
    thumbUpPosts: {
      default: new Map(),
      type: Map,
    },
  },
  {
    timeStamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
export default User;
