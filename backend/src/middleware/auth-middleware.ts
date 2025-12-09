import { Request, Response, NextFunction } from "express";
import { UnauthorizedError } from "../utils/app-error.js";
import { verifyToken } from "../utils/jwt.js";

export interface AuthRequest extends Request {
  user?: { id: string; email?: string; [key: string]: any };
}

export const authenticate = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const cookieName = process.env.COOKIE_NAME || "token";
    const token = req.cookies?.[cookieName];

    if (!token) {
      throw new UnauthorizedError("Token ausente");
    }

    const payload = verifyToken(token) as any;
    req.user = payload;
    next();
  } catch (error) {
    throw new UnauthorizedError("Token inválido ou expirado");
  }
};
