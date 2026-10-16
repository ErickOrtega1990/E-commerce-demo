import { type Request, type Response } from "express";
import { loginHandler, NewUserRegister } from "../services/auth.services.js";

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
  if (result.token)
    return res.status(result.status).send({ token: result.token });
};
