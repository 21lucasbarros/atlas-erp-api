import { prisma } from "../..";

export const addRoleToUser = async (userId: string, roleId: string) => {
  return prisma.userRole.create({
    data: { userId, roleId },
  });
};

export const removeRoleFromUser = async (userId: string, roleId: string) => {
  return prisma.userRole.delete({
    where: {
      userId_roleId: {
        userId,
        roleId,
      },
    },
  });
};
