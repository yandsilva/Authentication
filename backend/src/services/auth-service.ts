import { prisma } from "../../lib/prisma.js";
import { ConflictError, UnauthorizedError } from "../utils/app-error.js";
import { compare, hash } from "bcrypt";
import { signToken } from "../utils/jwt.js";

export const register = async (
  name: string,
  email: string,
  password: string
) => {
  const existingUser = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new ConflictError("Email já em uso");
  }

  const hashedPassword = await hash(password, 10);

  const user = await prisma.users.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
    select: {
      id: true,
      name: true,
      email: true,
      created_at: true,
    },
  });

  const token = signToken({ id: user.id, email: user.email });
  return { user, token };
};

export const loginUser = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new UnauthorizedError("Email ou senha inválidas");
  }

  const isPasswordValid = await compare(password, user.password);

  if (!isPasswordValid) {
    throw new UnauthorizedError("Email ou senha inválidas");
  }

  const token = signToken({ id: user.id, email: user.email });
  return { user: { id: user.id, name: user.name, email: user.email }, token };
};
