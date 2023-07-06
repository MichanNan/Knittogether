import dbConnect from "../../db/connect";
import User from "../../db/models/User";

export default async function handle(request, response) {
  await dbConnect();
  const id = request.query.id;
  const user = await User.findById(id);
  response.status(200).json(user);
}
