import mongoose from "mongoose";

const { Schema } = mongoose;
const patternSchema = new Schema(
  {
    patternName: { type: String },
    fileBase64String: { type: String },
    chunks: { type: Array },
    totalChunks: { type: String },
    ChunkNumber: { type: String },
  },
  { timestamps: true }
);

const Pattern =
  mongoose.models?.Pattern || mongoose.model("Pattern", patternSchema);
export default Pattern;
