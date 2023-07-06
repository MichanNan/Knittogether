import dbConnect from "../../db/connect";
import Yarn from "../../db/models/Yarn";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  const userId = session?.user.id;

  if (request.method === "GET") {
    try {
      const yarns = await Yarn.find({ user: userId }).sort({ createdAt: -1 });
      response.status(200).json(yarns);
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Not Found" });
    }
  }

  if (request.method === "POST") {
    try {
      const data = request.body;

      await Yarn.create({ user: userId, ...data });
      response.status(201).json({ message: "Yarn Created" });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Create Failed" });
    }
  }

  if (request.method === "PUT") {
    try {
      const { id } = request.query;
      const newYarn = { user: userId, ...request.body };
      await Yarn.findByIdAndUpdate(id, { $set: newYarn });
      response.status(201).json({ message: "yarn successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(404).json("Not Found");
    }
  }

  if (request.method === "DELETE") {
    try {
      const { id } = request.query;
      await Yarn.findByIdAndDelete(id);
      response.status(201).json({ message: "yarn successfully deleted" });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Not Found" });
    }
  }
}
