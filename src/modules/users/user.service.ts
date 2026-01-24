import { prisma } from "../..";
import { hashPassword } from "../../shared/password";

export const createUser = async (data: {
  name: string;
  email: string;
  password: string;
}) => {
  const hashedPassword = await hashPassword(data.password);

  return prisma.user.create({
    data: {
      ...data,
      password: hashedPassword,
    },
  });
};

export const listUsers = async () => {
  return prisma.user.findMany({
    include: {
      roles: true,
    },
  });
};

export const getUserById = async (id: string) => {
  return prisma.user.findUnique({
    where: { id },
  });
};

export const updateUser = async (
  id: string,
  data: {
    name?: string;
    email?: string;
    password?: string;
  },
) => {
  return prisma.user.update({
    where: { id },
    data,
  });
};

export const updateUserPassword = async (
  userId: string,
  newPassword: string,
) => {
  const hashedPassword = await hashPassword(newPassword);

  return prisma.user.update({
    where: { id: userId },
    data: {
      password: hashedPassword,
    },
  });
};

export const deleteUser = async (id: string) => {
  return prisma.user.delete({
    where: { id },
  });
};
