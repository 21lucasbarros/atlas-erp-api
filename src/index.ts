import { Elysia } from "elysia";
import { userRoutes } from "./modules/users/user.routes";
import { PrismaClient } from "@prisma/client";
import { authRoutes } from "./modules/auth/auth.route";
import swagger from "@elysiajs/swagger";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(userRoutes)
  .use(authRoutes)
  .use(
    swagger({
      documentation: {
        info: {
          title: "Atlas-ERP-API",
          version: "1.0.0",
          description: "Documentação da API do Atlas-ERP da VPO Tech.",
        },
      },
    }),
  )
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
