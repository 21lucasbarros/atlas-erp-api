import swagger from "@elysiajs/swagger";
import { Elysia } from "elysia";
import { PrismaClient } from "@prisma/client";
import { userRoutes } from "./modules/users/user.routes";
import { authRoutes } from "./modules/auth/auth.route";
import { permissionRoutes } from "./modules/permissions/permission.routes";
import { roleRoutes } from "./modules/roles/role.routes";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(userRoutes)
  .use(authRoutes)
  .use(permissionRoutes)
  .use(roleRoutes)
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
