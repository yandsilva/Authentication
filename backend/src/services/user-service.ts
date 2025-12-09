import { prisma } from "../../lib/prisma.js";
import { NotFoundError } from "../utils/app-error.js";

export const getUserById = async (id: string) => {
  const user = await prisma.users.findUnique({
    where: { id },
    select: { id: true },
  });

  if (!user) {
    throw new NotFoundError("Usuário não encontrado");
  }

  return user;
};

export const listUsers = async (take = 10, skip = 0) => {
  const users = await prisma.users.findMany({
    take,
    skip,
    select: { id: true, name: true, email: true, created_at: true },
  });
  return users;
};
