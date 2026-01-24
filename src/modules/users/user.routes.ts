import Elysia, { t } from "elysia";
import {
  createUser,
  deleteUser,
  getUserById,
  listUsers,
  updateUser,
} from "./user.service";

export const userRoutes = new Elysia({ prefix: "/users" })
  .get("/", async () => {
    return listUsers();
  })
  .post(
    "/",
    async ({ body }) => {
      return createUser(body);
    },
    {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String(),
      }),
      detail: {
        tags: ["Users"],
        summary: "Criar usuário",
      },
    },
  )
  .get("/:id", async ({ params }) => {
    return getUserById(params.id);
  })
  .put(
    "/:id",
    async ({ params, body }) => {
      return updateUser(params.id, body);
    },
    {
      body: t.Partial(
        t.Object({
          name: t.String(),
          email: t.String(),
          password: t.String(),
        }),
      ),
    },
  )
  .delete("/:id", async ({ params }) => {
    return deleteUser(params.id);
  });
