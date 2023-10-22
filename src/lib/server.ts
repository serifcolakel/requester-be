import Fastify from "fastify";

const server = Fastify({
  logger: {
    level: "info",
  },
});

export default server;
