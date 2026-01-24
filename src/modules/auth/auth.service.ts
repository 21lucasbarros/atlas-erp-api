import { prisma } from "../..";
import { comparePassword } from "../../shared/password";
import { signToken } from "./auth.jwt";

export const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new Error("Credenciais inválidas.");
  }

  const isValid = await comparePassword(password, user.password);

  if (!isValid) {
    throw new Error("Credenciais inválidas.");
  }

  const token = signToken({
    sub: user.id,
    email: user.email,
  });

  const { password: _, ...safeUser } = user;

  return {
    token,
    user: safeUser,
  };
};
