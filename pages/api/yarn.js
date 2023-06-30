import dbConnect from "../../db/connect";
import Yarn from "../../db/models/Yarn";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const yarns = await Yarn.find().sort({ createdAt: -1 });
      response.status(200).json(yarns);
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Not Found" });
    }
  }

  if (request.method === "POST") {
    try {
      const data = request.body;
      await Yarn.create(data);
      response.status(201).json({ message: "Yarn Created" });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Create Failed" });
    }
  }

  if (request.method === "PUT") {
    try {
      const { id } = request.query;
      await Yarn.findByIdAndUpdate(id, { $set: request.body });
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
