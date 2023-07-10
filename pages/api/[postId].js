import dbConnect from "../../db/connect";
import Post from "../../db/models/Post";

export default async function handler(request, response) {
  await dbConnect();

  const { postId } = request.query;

  if (request.method === "GET") {
    const post = await Post.findById(postId).populate("user");

    response.status(200).json(post);
  }
}
