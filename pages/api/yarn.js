import dbConnect from "../../db/connect";
import Yarn from "../../db/models/Yarn";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const yarns = await Yarn.find().sort({ createdAt: -1 });
      response.status(200).json(yarns);
    } catch (error) {
      response.status(404).json("Not Found");
    }
  }
}
