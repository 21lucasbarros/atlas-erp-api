import Elysia, { t } from "elysia";
import {
  createPermission,
  deletePermission,
  getPermissionById,
  listPermissions,
  updatePermission,
} from "./permission.service";

export const permissionRoutes = new Elysia({ prefix: "/permissions" })
  .get("/", async () => listPermissions(), {
    detail: {
      tags: ["Permissions"],
      summary: "Listar permissões.",
    },
  })
  .get("/:id", async ({ params }) => getPermissionById(params.id), {
    detail: {
      tags: ["Permission"],
      summary: "Buscar permissão por ID.",
    },
  })
  .post("/", async ({ body }) => createPermission(body), {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
    detail: {
      tags: ["Permissions"],
      summary: "Criar permissão.",
    },
  })
  .put("/:id", async ({ params, body }) => updatePermission(params.id, body), {
    body: t.Partial(
      t.Object({
        name: t.String(),
        description: t.String(),
      }),
    ),
    detail: { tags: ["Permission"], summary: "Editar permissão" },
  })
  .delete("/:id", async ({ params }) => deletePermission(params.id), {
    detail: { tags: ["Permission"], summary: "Remover permissão" },
  });
