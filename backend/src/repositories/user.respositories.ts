import User from "../models/User.js";
import { type NewUserCreateType } from "../types/auth.d.js";

export async function findByEmail(email: string) {
  try {
    const user = await User.findOne({ email: email });
    return user;
  } catch {
    throw new Error('Error finding user at "findByEmail"');
  }
}

export async function createUser(body: NewUserCreateType) {
  try {
    const newUser = new User(body);
    const result = await newUser.save();
    return result;
  } catch {
    throw new Error('Error creating new user at "createUser"');
  }
}
