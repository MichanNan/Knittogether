import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: String,
  password: String,
});

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});
const User = mongoose.models?.User || mongoose.model("User", UserSchema);

export default User;
