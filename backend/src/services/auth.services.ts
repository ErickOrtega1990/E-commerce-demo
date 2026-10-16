import { createUser, findByEmail } from "../repositories/user.respositories.js";
import {
  type NewUserCreateType,
  type NewUserReqBody,
  type UserLoginReqBody,
} from "../types/auth.types.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";

export async function NewUserRegister(reqBody: NewUserReqBody) {
  const user = await findByEmail(reqBody.email);
  if (user) {
    return { status: 409, message: "Error: User already exists." };
  }

  const salt = await bcrypt.genSalt();
  const hashed = await bcrypt.hash(reqBody.password, salt);

  const newUserData: NewUserCreateType = {
    email: reqBody.email,
    name: reqBody.name,
    password: hashed,
    salt: salt,
  };

  const userCreated = await createUser(newUserData);

  if (userCreated) {
    return { status: 201, message: "User successfully created" };
  } else {
    return { status: 500, message: "Internal error" };
  }
}

export async function loginHandler(reqBody: UserLoginReqBody) {
  const storedUser = await findByEmail(reqBody.email);

  if (!storedUser) return { status: 404, message: "User not found" };
  const isMatch = await bcrypt.compare(reqBody.password, storedUser.password);

  if (!isMatch) return { status: 401, message: "Invalid credentials" };
  const signed = signToken(storedUser._id.toString());

  return { status: 200, token: signed };
}
