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

export const getPermissionById = async (id: string) => {
  return prisma.permission.findUnique({ where: { id } });
};

export const updatePermission = async (
  id: string,
  data: { name?: string; description?: string },
) => {
  return prisma.permission.update({
    where: { id },
    data,
  });
};

export const deletePermission = async (id: string) => {
  const used = await prisma.rolePermission.findFirst({
    where: { permissionId: id },
  });

  if (used) {
    throw new Error("Permissão está vinculada a uma role.");
  }

  return prisma.permission.delete({ where: { id } });
};
