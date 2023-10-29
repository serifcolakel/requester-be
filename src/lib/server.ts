import { JWT } from "@fastify/jwt";
import Fastify from "fastify";

const server = Fastify({
  logger: true,
  ignoreTrailingSlash: true,
});

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}

export default server;
