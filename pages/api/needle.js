import dbConnect from "../../db/connect";
import Needle from "../../db/models/Needle";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const needles = await Needle.find().sort({ createdAt: -1 });
      response.status(200).json(needles);
    } catch (error) {
      console.log(error);
      response.status(404).json("Not Found");
    }
  }

  if (request.method === "POST") {
    try {
      const data = request.body;
      await Needle.create(data);
      response.status(201).json({ message: "Needle Created" });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Create Failed" });
    }
  }

  if (request.method === "PUT") {
    try {
      const { id } = request.query;
      await Needle.findByIdAndUpdate(id, { $set: request.body });
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
