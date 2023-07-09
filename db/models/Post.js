import mongoose from "mongoose";
import "./User.js";
import "./Comment.js";

const { Schema } = mongoose;

const PostSchema = new Schema(
  {
    user: { type: [Schema.Types.ObjectId], ref: "User" },
    name: { type: String },
    likesCount: { type: Number, default: 0 },
    image: { type: String },
    comments: {
      type: [Schema.Types.ObjectId],
      ref: "Comment",
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.models?.Post || mongoose.model("Post", PostSchema);
export default Post;
