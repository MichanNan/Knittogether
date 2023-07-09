import mongoose from "mongoose";
import "./Post.js";
import "./User.js";

const { Schema } = mongoose;

const LikeSchema = new Schema(
  {
    user: { type: [Schema.Types.ObjectId], ref: "User" },
    post: { type: [Schema.Types.ObjectId], ref: "Post" },
  },
  {
    timestamps: true,
  }
);

const Like = mongoose.models?.Like || mongoose.model("Like", LikeSchema);
export default Like;
