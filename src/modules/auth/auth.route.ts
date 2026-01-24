import { Elysia, t } from "elysia";
import { login } from "./auth.service";

export const authRoutes = new Elysia({ prefix: "/auth" }).post(
  "/login",
  async ({ body }) => {
    return login(body.email, body.password);
  },
  {
    body: t.Object({
      email: t.String(),
      password: t.String(),
    }),
    detail: {
      tags: ["Auth"],
      summary: "Login do usuário",
      description: "Autentica o suário e retorna um JWT",
    },
  },
);
