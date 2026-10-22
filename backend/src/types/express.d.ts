import { Request } from "express";

declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: number; type: string };
      session?: { id: string; session: string; type: string; role?: string };
    }
  }
}

export {};
