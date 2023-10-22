import fastifyJwt from "@fastify/jwt";
import fastifyEnv from "@fastify/env";
import environmentRoutes from "@modules/environment/environment.route";
import { fastifyEnvOptions } from "@constants";
import userRoutes from "@modules/user/user.route";
import { userSchemas } from "@modules/user/user.schema";
import swagger from "@fastify/swagger";
import { withRefResolver } from "fastify-zod";
import server from "@lib/server";
import { environmentSchemas } from "@modules/environment/environment.schema";
import { version } from "../package.json";
import fastifySwaggerUi from "@fastify/swagger-ui";
import variableRoutes from "@modules/variable/variable.route";
import { variableSchemas } from "@modules/variable/variable.schema";

server.get("/api/status", async () => {
  return {
    status: "ok",
    message: "Hello World",
  };
});

async function start() {
  server.register(fastifyEnv, fastifyEnvOptions);
  await server.after();

  server.addHook("preHandler", (req: any, _res, next) => {
    req.jwt = server.jwt;
    return next();
  });

  server.register(fastifyJwt, {
    secret: process.env.JWT_SECRET_KEY!,
  });

  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  for (const schema of environmentSchemas) {
    server.addSchema(schema);
  }

  for (const schema of variableSchemas) {
    server.addSchema(schema);
  }

  server.register(
    swagger,
    withRefResolver({
      swagger: {
        info: {
          title: "Requester API",
          description:
            "Building a blazing fast REST API with Node.js, PostgreSQL, Fastify and Swagger",
          version,
        },
        host: "localhost:3000",
        schemes: ["http"],
        consumes: ["application/json"],
        produces: ["application/json"],
        securityDefinitions: {
          Bearer: {
            type: "apiKey",
            name: "Authorization",
            in: "header",
            description:
              'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}"',
          },
        },
        security: [{ Bearer: [] }],
      },
    })
  );

  server.register(fastifySwaggerUi, {
    routePrefix: "/doc",
    staticCSP: true,
  });

  server.register(userRoutes, { prefix: "/api/users" });
  server.register(environmentRoutes, { prefix: "/api/environments" });
  server.register(variableRoutes, { prefix: "/api/variables" });

  try {
    await server.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    console.error(err);
    server.log.error(err);
    if (process.env.TS_NODE_DEV !== "true") {
      process.exit(1);
    }
  }
}

start();
