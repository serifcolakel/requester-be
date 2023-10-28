import { JWT } from "@fastify/jwt";
import Fastify from "fastify";

const server = Fastify({});

// cors error fix
server.options("*", async (request, reply) => {
  reply.header("Access-Control-Allow-Origin", "*");
  reply.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  reply.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  reply.send();
});

declare module "fastify" {
  interface FastifyRequest {
    jwt: JWT;
  }
}

export default server;
