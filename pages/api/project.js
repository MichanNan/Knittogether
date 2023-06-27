import dbConnect from "../../db/connect";
import Project from "../../db/models/Project";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const projects = await Project.find().sort({ createdAt: -1 });
    response.status(200).json(projects);
  }

  if (request.method === "POST") {
    const { newProject } = request.body;
    await Project.create(newProject);
    response.status(201).json({ status: "project created" });
  }
  if (request.method === "PUT") {
    const { id } = request.query;
    await Project.findByIdAndUpdate(id, { $set: request.body });
    response.status(201).json({ status: "project successfully updated" });
  }

  if (request.method === "DELETE") {
    const id = request.body;
    await Project.findByIdAndDelete(id);
    response.status(200).json({ status: "project deleted" });
  }
}
