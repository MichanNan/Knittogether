import mongoose from "mongoose";
import "./User.js";
const { Schema } = mongoose;
const needleSchema = new Schema(
  {
    user: { type: [Schema.Types.ObjectId], ref: "User" },
    size: { type: String },
    length: { type: String },
    amount: { type: String },
  },
  { timestamps: true }
);

const Needle =
  mongoose.models?.Needle || mongoose.model("Needle", needleSchema);
export default Needle;
