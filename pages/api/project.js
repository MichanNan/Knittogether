import dbConnect from "../../db/connect";
import Project from "../../db/models/Project";

import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]";

export default async function handler(request, response) {
  await dbConnect();

  const session = await getServerSession(request, response, authOptions);
  const userId = session?.user.id;

  if (request.method === "GET") {
    try {
      const projects = await Project.find({ user: userId }).sort({
        createdAt: -1,
      });
      response.status(200).json(projects);
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }

  if (request.method === "POST") {
    try {
      const { newProject } = request.body;
      await Project.create({ user: userId, ...newProject });
      response.status(201).json({ message: "project created" });
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }
  if (request.method === "PUT") {
    try {
      const { id } = request.query;

      const newProject = { user: userId, ...request.body };
      await Project.findByIdAndUpdate(id, { $set: newProject });
      response.status(201).json({ message: "project successfully updated" });
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }

  if (request.method === "DELETE") {
    try {
      const id = request.body;
      await Project.findByIdAndDelete(id);
      response.status(200).json({ message: "project deleted" });
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }
}
