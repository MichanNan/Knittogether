import dbConnect from "../../db/connect";
import Pattern from "../../db/models/Pattern";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    try {
      const { id } = request.query;
      const pattern = await Pattern.findById(id);
      response.status(200).json({ body: pattern });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Not Found" });
    }
  }

  if (request.method === "POST") {
    try {
      const data = request.body;
      const res = await Pattern.create(data);

      response.status(201).json({ message: "Pattern Created", response: res });
    } catch (error) {
      console.log(error);
      response.status(404).json({ message: "Create Failed" });
    }
  }
}
