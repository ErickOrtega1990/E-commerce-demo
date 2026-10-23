import type { Request, Response, NextFunction } from "express";
import jwt, { type JwtPayload } from "jsonwebtoken";
import "dotenv/config";

export const validateAccesToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.access;
  const secret = process.env.JWT_SECRET;

  if (!token) return res.status(401).send({ message: "Error: Acces denied" });
  if (!secret)
    return res.status(500).send({ message: "Internal server error" });

  try {
    const payload = jwt.verify(token, secret) as JwtPayload & {
      id: string;
      role: number;
      type: string;
    };

    req.user = payload;
  } catch (error) {
    return res.status(403).send({ message: "Invalid token" });
  }
  next();
};

export const validateRefreshToken = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.refresh;
  const secret = process.env.JWT_SECRET;

  if (!token) return res.status(401).send({ message: "Error: Acces denied" });
  if (!secret)
    return res.status(500).send({ message: "Internal server error" });

  try {
    const payload = jwt.verify(token, secret) as JwtPayload & {
      id: string;
      session: string;
      type: string;
    };

    req.session = payload;
  } catch (error) {
    return res.status(403).send({ message: "Invalid token" });
  }
  next();
};
