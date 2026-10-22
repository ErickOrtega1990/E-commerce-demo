import { type Request, type Response } from "express";
import {
  loginHandler,
  NewUserRegister,
  sessionRefreshHandler,
} from "../services/auth.services.js";

type Status = {
  status: number;
  message: string;
};

export const register = async (req: Request, res: Response) => {
  const result: Status = await NewUserRegister(req.body);
  res.status(result.status).send(result.message);
};

export const login = async (req: Request, res: Response) => {
  const result = await loginHandler(req.body);
  if (result.message)
    return res.status(result.status).send({ error: result.message });

  if (result.accessToken)
    return res
      .cookie("refresh", result.refresToken, result.refreshCookieOptions)
      .cookie("access", result.accessToken, result.accessCookieOptions)
      .status(result.status)
      .send({ message: "succeded" });
};

export const logout = (req: Request, res: Response) => {
  const opts = {
    httpOnly: true,
    sameSite: true as const,
    secure: true,
  };

  res.clearCookie("access", opts);
  res.clearCookie("refresh", opts);

  res.status(200).json({ message: "Logged out" });
};

export const refreshSession = (req: Request, res: Response) => {
  const id = req.session?.id;
  const role = req.session?.role;

  const { status, accessToken, accessCookieOptions } = sessionRefreshHandler(
    id,
    role,
  );

  return res
    .status(status)
    .cookie("access", accessToken, accessCookieOptions)
    .send();
};
