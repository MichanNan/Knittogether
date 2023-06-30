import dbConnect from "../../db/connect";
import Project from "../../db/models/Project";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const projects = await Project.find().sort({ createdAt: -1 });
      response.status(200).json(projects);
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }

  if (request.method === "POST") {
    try {
      const { newProject } = request.body;
      await Project.create(newProject);
      response.status(201).json({ message: "project created" });
    } catch (error) {
      response.status(404).json({ message: "Not Found" });
      console.log(error);
    }
  }
  if (request.method === "PUT") {
    try {
      const { id } = request.query;
      await Project.findByIdAndUpdate(id, { $set: request.body });
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
