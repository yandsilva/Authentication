import { Request, Response, NextFunction } from "express";
import { AuthRequest } from "../middleware/auth-middleware.js";
import * as userService from "../services/user-service.js";

export const me = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!.id;
    const user = await userService.getUserById(userId);
    res.json({ user });
  } catch (error) {
    next(error);
  }
};

export const list = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const take = Number(req.query.take || 10);
    const skip = Number(req.query.skip || 0);
    const users = await userService.listUsers(take, skip);
    res.json({ users });
  } catch (error) {
    next(error);
  }
};
