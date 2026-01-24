import { prisma } from "../..";

export const createRole = async (data: {
  name: string;
  description?: string;
}) => {
  return prisma.role.create({ data });
};

export const listRoles = async () => {
  return prisma.role.findMany({
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });
};
