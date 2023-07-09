import { getServerSession } from "next-auth";
import dbConnect from "../../db/connect";
import { authOptions } from "./auth/[...nextauth]";
import Like from "../../db/models/Like";
import Post from "../../db/models/Post";

async function updateLikesCount(id) {
  const post = await Post.findById(id);
  if (!post) {
    return;
  }
  post.likesCount = await Like.countDocuments({ post: id });
  await post.save();
}

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  console.log(request.body);
  const postId = request.body.postId;
  const userId = session?.user.id;

  if (request.method === "GET") {
    const like = await Like.find({ user: userId });

    response.status(201).json(like);
  }
  if (request.method === "POST") {
    const existing = await Like.findOne({ user: userId, post: postId });

    if (existing) {
      await Like.deleteOne(existing);
      updateLikesCount(postId);
      response.status(202).json("deleted");
    } else {
      const like = await Like.create({
        user: userId,
        post: postId,
      });
      updateLikesCount(postId);
      response.status(200).json(like);
    }
  }
}
