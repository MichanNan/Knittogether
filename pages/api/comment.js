import { getServerSession } from "next-auth";
import dbConnect from "../../db/connect";
import Comment from "../../db/models/Comment";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  const userId = session?.user.id;
  const postId = request?.body.postId;

  if (request.method === "GET") {
    let postId = request.query.postId;
    const comments = await Comment.find({ post: postId })
      .populate("user")
      .sort({
        createdAt: -1,
      });

    response.status(201).json(comments);
  }

  if (request.method === "POST") {
    const { text } = request.body;

    await Comment.create({ user: userId, post: postId, text });
    response.status(200).json({ status: "Comment created" });
  }

  if (request.method === "DELETE") {
    try {
      const { id } = request.body;
      await Comment.findByIdAndDelete(id);
      response.status(200).json({ message: "comment deleted" });
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }
}
