import mongoose from "mongoose";

const CommentSchema = mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    targetComment: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
    createdAt: { default: new Date(), type: Date },
  },
  {
    timeStamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);
export default Comment;
