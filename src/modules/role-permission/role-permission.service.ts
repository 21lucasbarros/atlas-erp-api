import { prisma } from "../..";

export const addPermissionToRole = async (
  roleId: string,
  permissionId: string,
) => {
  return prisma.rolePermission.create({ data: { roleId, permissionId } });
};

export const removePermissionFromRole = async (
  roleId: string,
  permissionId: string,
) => {
  prisma.rolePermission.delete({
    where: {
      roleId_permissionId: {
        roleId,
        permissionId,
      },
    },
  });
};
