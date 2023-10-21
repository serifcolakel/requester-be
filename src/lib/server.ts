import Fastify from "fastify";
import fjwt from "@fastify/jwt";

const server = Fastify();

server.register(fjwt, {
  secret: "supersecret",
});

export default server;
