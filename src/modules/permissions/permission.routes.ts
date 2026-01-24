import Elysia, { t } from "elysia";
import { createPermission, listPermissions } from "./permission.service";

export const permissionRoutes = new Elysia({ prefix: "/permissions" })
  .get("/", async () => listPermissions(), {
    detail: {
      tags: ["Permissions"],
      summary: "Listar permissões",
    },
  })
  .post("/", async ({ body }) => createPermission(body), {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
    detail: {
      tags: ["Permissions"],
      summary: "Criar permissão",
    },
  });
