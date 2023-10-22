import fastifyJwt from "@fastify/jwt";
import fastifyEnv from "@fastify/env";
import environmentRoutes from "@modules/environment/environment.route";
import { fastifyEnvOptions } from "@constants";
import userRoutes from "@modules/user/user.route";
import { userSchemas } from "@modules/user/user.schema";
import server from "@lib/server";
import { environmentSchemas } from "@modules/environment/environment.schema";

server.get("/api/status", async () => {
  return {
    status: "ok",
    message: "Hello World",
  };
});

async function start() {
  server.register(fastifyEnv, fastifyEnvOptions);
  await server.after();

  server.register(userRoutes, { prefix: "/api/users" });
  server.register(environmentRoutes, { prefix: "/api/environments" });
  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET_KEY!,
  });

  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  for (const schema of environmentSchemas) {
    server.addSchema(schema);
  }

  try {
    await server.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
}

start();
