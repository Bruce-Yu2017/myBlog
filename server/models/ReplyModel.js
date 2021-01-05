import mongoose from "mongoose";

const ReplySchema = mongoose.Schema(
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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
    createdAt: { default: new Date(), type: Date },
  },
  {
    timeStamps: true,
  }
);

const Reply = mongoose.model("Reply", ReplySchema);
export default Reply;
