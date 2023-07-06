import dbConnect from "../../db/connect";
import Needle from "../../db/models/Needle";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();
  const session = await getServerSession(request, response, authOptions);
  const userId = session?.user.id;

  if (request.method === "GET") {
    try {
      const needles = await Needle.find({ user: userId }).sort({
        createdAt: -1,
      });
      response.status(200).json(needles);
    } catch (error) {
      console.log(error);
      response.status(404).json("Not Found");
    }
  }

  if (request.method === "POST") {
    try {
      const { data } = request.body;

      await Needle.create({ user: userId, ...data });
      response.status(201).json({ message: "Needle Created" });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Create Failed" });
    }
  }

  if (request.method === "PUT") {
    try {
      const { id } = request.query;
      const newNeedle = { user: userId, ...request.body };
      await Needle.findByIdAndUpdate(id, { $set: newNeedle });
      response.status(201).json({ message: "yarn successfully updated" });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Not Found" });
    }
  }

  if (request.method === "DELETE") {
    try {
      const { id } = request.query;
      await Needle.findByIdAndDelete(id);
      response.status(201).json({ message: "needle successfully deleted" });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Not Found" });
    }
  }
}
