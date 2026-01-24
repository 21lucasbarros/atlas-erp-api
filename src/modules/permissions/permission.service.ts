import { prisma } from "../..";

export const createPermission = async (data: {
  name: string;
  description?: string;
}) => {
  return prisma.permission.create({ data });
};

export const listPermissions = async () => {
  return prisma.permission.findMany();
};
