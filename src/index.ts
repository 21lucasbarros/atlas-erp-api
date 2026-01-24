import { Elysia } from "elysia";
import { userRoutes } from "./modules/users/user.routes";
import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };
export const prisma = globalForPrisma.prisma || new PrismaClient();

const app = new Elysia()
  .get("/", () => "Hello Elysia")
  .use(userRoutes)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
