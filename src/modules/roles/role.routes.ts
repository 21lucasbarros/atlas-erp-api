import Elysia, { t } from "elysia";
import {
  createRole,
  deleteRole,
  getRoleById,
  listRoles,
  updateRole,
} from "./role.service";

export const roleRoutes = new Elysia({ prefix: "/roles" })
  .get("/", (async) => listRoles(), {
    detail: {
      tags: ["Roles"],
      summary: "Listas roles.",
    },
  })
  .get("/:id", async ({ params }) => getRoleById(params.id), {
    detail: {
      tags: ["Roles"],
      summary: "Buscar role por ID.",
    },
  })
  .post("/", async ({ body }) => createRole(body), {
    body: t.Object({
      name: t.String(),
      description: t.Optional(t.String()),
    }),
    detail: {
      tag: ["Roles"],
      summary: "Criar role.",
    },
  })
  .put("/:id", async ({ params, body }) => updateRole(params.id, body), {
    body: t.Partial(
      t.Object({
        name: t.String(),
        description: t.String(),
      }),
    ),
    detail: { tags: ["Roles"], summary: "Editar role." },
  })
  .delete("/:id", async ({ params }) => deleteRole(params.id), {
    detail: { tags: ["Roles"], summary: "Remover role." },
  });
