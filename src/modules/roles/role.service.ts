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

export const getRoleById = async (id: string) => {
  return prisma.role.findUnique({
    where: { id },
    include: {
      permissions: {
        include: { permission: true },
      },
    },
  });
};

export const updateRole = async (
  id: string,
  data: { name?: string; description?: string },
) => {
  return prisma.role.update({
    where: { id },
    data,
  });
};

export const deleteRole = async (id: string) => {
  const used = await prisma.userRole.findFirst({
    where: { roleId: id },
  });

  if (used) {
    throw new Error("Role está vinculada a usuários.");
  }

  return prisma.role.delete({ where: { id } });
};
