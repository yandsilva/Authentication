import { prisma } from "../../lib/prisma.js";
import { RegisterUserProps } from "../types/user-types.js";

export class UsersServices {
  async register({ name, email, password }: RegisterUserProps) {
    const existingUser = await prisma.users.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      throw new Error("Usuario Já existe");
    }

    const user = await prisma.users.create({
      data: {
        name,
        email,
        password,
      },
    });

    return user;
  }
}
