import Elysia, { t } from "elysia";
import { createRole, listRoles } from "./role.service";

export const roleRoutes = new Elysia({ prefix: "/roles" })
  .get("/", (async) => listRoles(), {
    detail: {
      tags: ["Roles"],
      summary: "Listas roles",
    },
  })
  .post("/", async ({ body }) => createRole(body), {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
    detail: {
      tag: ["Roles"],
      summary: "Criar role",
    },
  });
