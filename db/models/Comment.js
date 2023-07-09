import mongoose from "mongoose";
import "./User.js";
import "./Post.js";

const { Schema } = mongoose;

const commentSchema = new Schema(
  {
    user: { type: [Schema.Types.ObjectId], ref: "User" },
    post: { type: [Schema.Types.ObjectId], ref: "Post" },
    text: { type: String },
  },
  {
    timestamps: true,
  }
);

const Comment =
  mongoose.models?.Comment || mongoose.model("Comment", commentSchema);
export default Comment;
