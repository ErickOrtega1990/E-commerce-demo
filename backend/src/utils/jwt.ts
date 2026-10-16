import jwt, { type SignOptions } from "jsonwebtoken";
import "dotenv/config";

export function signToken(id: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error("No JWT secret stored");

  const options: SignOptions = {
    expiresIn: "5m",
  };

  const signed = jwt.sign({ sub: id }, secret, options);

  return signed;
}
