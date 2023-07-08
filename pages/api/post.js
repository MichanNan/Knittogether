import { getServerSession } from "next-auth";
import dbConnect from "../../db/connect";
import Post from "../../db/models/Post";
import { authOptions } from "../api/auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  const userId = session?.user.id;

  if (request.method === "GET") {
    const posts = await Post.find().populate("user").sort({ createdAt: -1 });

    response.status(200).json(posts);
  }
  if (request.method === "POST") {
    const { postName, postImage } = request.body;
    await Post.create({
      user: userId,
      name: postName,
      image: postImage,
    });
    response.status(200).json({ message: "post created" });
  }

  if (request.method === "DELETE") {
    try {
      const { id } = request.body;

      await Post.findByIdAndDelete(id);
      response.status(200).json({ message: "post deleted" });
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }
}
