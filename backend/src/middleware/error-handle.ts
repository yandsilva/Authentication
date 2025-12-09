import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/app-error.js";

export function errorHandle(
  err: Error | AppError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error("Error", err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  // Error inesperado / não tratado
  res.status(500).json({
    status: "error",
    message: "Internal Server Error",
  });
}
