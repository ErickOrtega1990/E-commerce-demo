import mongoose, { Schema } from "mongoose";

export const UserSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: String,
});

const User = mongoose.model("User", UserSchema);

export default User;
