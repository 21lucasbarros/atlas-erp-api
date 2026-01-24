import Elysia, { t } from "elysia";
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
  updateUserPassword,
} from "./user.service";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => listUsers(), {
    detail: {
      tags: ["Users"],
      summary: "Listar usuários",
      description: "Retorna todos os usuários do sistema",
    },
  })
  .post("/", async ({ body }) => createUser(body), {
    body: t.Object({
      name: t.String(),
      email: t.String({ format: "email" }),
      password: t.String({ minLength: 6 }),
    }),
    detail: {
      tags: ["Users"],
      summary: "Criar usuário",
      description: "Cria um novo usuário no sistema",
    },
  })
  .get("/:id", async ({ params }) => getUserById(params.id), {
    detail: {
      tags: ["Users"],
      summary: "Buscar usuário",
      description: "Busca um usuário pelo ID",
    },
  })
  .put("/:id", async ({ params, body }) => updateUser(params.id, body), {
    body: t.Partial(
      t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
      }),
    ),
    detail: {
      tags: ["Users"],
      summary: "Atualizar usuário",
      description: "Atualiza os dados de um usuário",
    },
  })
  .patch(
    "/:id/password",
    async ({ params, body }) => updateUserPassword(params.id, body.password),
    {
      body: t.Object({
        password: t.String({ minLength: 6 }),
      }),
      detail: {
        tags: ["Users"],
        summary: "Atualizar senha",
        description: "Atualiza a senha do usuário",
      },
    },
  )
  .delete("/:id", async ({ params }) => deleteUser(params.id), {
    detail: {
      tags: ["Users"],
      summary: "Remover usuário",
      description: "Remove um usuário do sistema",
    },
  });
