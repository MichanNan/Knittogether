import mongoose from "mongoose";

const { Schema } = mongoose;
const yarnSchema = new Schema(
  {
    image: { type: String },
    brand: { type: String },
    skein: { type: String },
    type: { type: String },
    gramm: { type: String },
    color: { type: String },
    meter: { type: String },
  },
  { timestamps: true }
);

const Yarn = mongoose.models?.Yarn || mongoose.model("Yarn", yarnSchema);
export default Yarn;
