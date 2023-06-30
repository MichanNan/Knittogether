import mongoose from "mongoose";

const { Schema } = mongoose;
const needleSchema = new Schema(
  {
    size: { type: String },
    length: { type: String },
    amount: { type: String },
  },
  { timestamps: true }
);

const Needle =
  mongoose.models?.Needle || mongoose.model("Needle", needleSchema);
export default Needle;
