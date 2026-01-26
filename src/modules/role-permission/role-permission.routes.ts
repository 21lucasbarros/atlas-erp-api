import Elysia from "elysia";
import {
  addPermissionToRole,
  removePermissionFromRole,
} from "./role-permission.service";

export const rolePermissionRoutes = new Elysia({
  prefix: "/roles/:roleId/permissions",
})
  .post(
    "/:permissionId",
    async ({ params }) =>
      addPermissionToRole(params.roleId, params.permissionId),
    {
      detail: {
        tags: ["Roles"],
        summary: "Vincular permissão à role.",
      },
    },
  )
  .delete(
    "/:permissionId",
    async ({ params }) =>
      removePermissionFromRole(params.roleId, params.permissionId),
    {
      detail: {
        tags: ["Roles"],
        summary: "Remover permissão da role.",
      },
    },
  );
