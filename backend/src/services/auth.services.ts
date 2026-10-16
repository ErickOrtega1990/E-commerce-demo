import { createUser, findByEmail } from "../repositories/user.respositories.js";
import {
  type NewUserCreateType,
  type NewUserReqBody,
  type UserLoginReqBody,
} from "../types/auth.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import type { CookieOptions } from "react-router-dom";

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
    role: 0,
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

  const refreshCookieOptions: CookieOptions = {
    expires: new Date(Date.now() + 3600 * 24 * 30),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  const accesCookieOptions: CookieOptions = {
    expires: new Date(Date.now() + 3600 * 24 * 30),
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  };

  const accesToken = signToken<String>(
    { id: storedUser._id, role: storedUser.role, type: "acces" }.toString(),
    3 * 60 * 1000,
  );

  const sessionId =
    storedUser._id + "_" + Math.floor(Math.random() * 100).toString();

  const refresToken = signToken<String>(
    { id: storedUser._id, session: sessionId, type: "refresh" }.toString(),
    3600 * 24 * 30,
  );

  return {
    status: 200,
    accesToken: accesToken,
    refresToken,
    refreshCookieOptions,
    accesCookieOptions,
  };
}
