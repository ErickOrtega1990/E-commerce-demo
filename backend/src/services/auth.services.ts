import { createUser, findByEmail } from "../repositories/user.respositories.js";
import {
  type NewUserCreateType,
  type NewUserReqBody,
  type UserLoginReqBody,
} from "../types/auth.d.js";
import bcrypt from "bcrypt";
import { signToken } from "../utils/jwt.js";
import type { CookieOptions } from "react-router-dom";

const refreshCookieOptions: CookieOptions = {
  maxAge: 7 * 24 * 60 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

const accessCookieOptions: CookieOptions = {
  maxAge: 1 * 60 * 1000,
  httpOnly: true,
  secure: true,
  sameSite: "strict",
};

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
  const accessToken = signToken(
    { id: storedUser._id, role: storedUser.role, type: "acces" },
    5 * 60,
  );

  const sessionId =
    storedUser._id + "_" + Math.floor(Math.random() * 100).toString();

  const refresToken = signToken(
    {
      id: storedUser._id,
      role: storedUser.role,
      session: sessionId,
      type: "refresh",
    },
    3600 * 24 * 7,
  );

  return {
    status: 200,
    accessToken,
    refresToken,
    refreshCookieOptions,
    accessCookieOptions,
  };
}

export const sessionRefreshHandler = (
  id: string | undefined,
  role: string | undefined,
) => {
  const accessToken = signToken({ id: id, role: role, type: "access" }, 5 * 60);

  return {
    status: 200,
    accessToken: accessToken,
    accessCookieOptions,
  };
};
