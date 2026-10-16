import jwt, { type SignOptions } from "jsonwebtoken";
import "dotenv/config";

export function signToken<T>(data: T, expiresIn: number) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("No JWT secret stored");

  const options: SignOptions = {
    expiresIn: expiresIn,
  };

  const signed = jwt.sign({ sub: data }, secret, options);

  return signed;
}
