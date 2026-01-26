import Elysia from "elysia";
import { addRoleToUser, removeRoleFromUser } from "./user-role.service";

export const userRoleRoutes = new Elysia({
  prefix: "/users/:userId/roles",
})
  .post(
    "/:roleId",
    async ({ params }) => addRoleToUser(params.userId, params.roleId),
    {
      detail: {
        tags: ["User"],
        summary: "Vincular um role à um user.",
      },
    },
  )
  .delete("/:roleId", async ({ params }) => {
    (removeRoleFromUser(params.userId, params.roleId),
      {
        detail: {
          tags: ["Roles"],
          summary: "Remover um role à um user.",
        },
      });
  });
