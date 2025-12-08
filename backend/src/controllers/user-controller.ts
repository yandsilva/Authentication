import { Request, Response } from "express";
import { UsersServices } from "../services/user-service.js";

export class UsersController {
  async register(req: Request, res: Response) {
    const { name, email, password } = req.body;

    const usersServices = new UsersServices();
    const response = await usersServices.register({
      name,
      email,
      password,
    });

    return res.json({
      success: true,
      message: "Usuario Criado com Sucesso",
      response,
    });
  }
}
