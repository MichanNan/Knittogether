import mongoose from "mongoose";

const { Schema } = mongoose;
const detailSchema = new Schema({
  recipient: String,
  size: String,
  gauge: String,
  needleSize: String,
  start: String,
  end: String,
});
const yarnSchema = new Schema({
  brand: { type: String },
  skein: { type: String },
  type: { type: String },
  gramm: { type: String },
  color: { type: String },
  meter: { type: String },
});

const projectSchema = new Schema(
  {
    name: String,
    status: String,
    happiness: String,
    image: String,
    details: [detailSchema],
    pattern: String,
    yarn: [yarnSchema],
    note: String,
  },
  {
    timestamps: true,
  }
);

const Project =
  mongoose.models?.Project || mongoose.model("Project", projectSchema);
export default Project;
