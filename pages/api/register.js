import User from "../../db/models/User";
import dbConnect from "../../db/connect";

export default async function handler(request, response) {
  if (request.method === "POST") {
    await dbConnect();
    const { name, email, password } = request.body;

    const checkExisting = await User.findOne({ email });
    if (checkExisting)
      return response.status(422).json({ message: "User Already Exists...!" });

    const user = await User.create({ name, email, password });

    response.status(201).json({ user });
  }
}
