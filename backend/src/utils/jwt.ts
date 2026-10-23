import jwt, { type SignOptions } from "jsonwebtoken";
import "dotenv/config";

export function signToken<T extends object>(data: T, expiresIn: number) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("No JWT secret stored");
  const signed = jwt.sign(data, secret, {
    expiresIn: expiresIn,
  });

  return signed;
}
