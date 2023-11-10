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
import authRoutes from "@modules/auth/auth.route";
import { authSchemas } from "@modules/auth/auth.schema";
import { swaggerOptions } from "@configs/swaggerConfig";
import cors from "@fastify/cors";
import { collectionSchemas } from "@modules/collection/collection.schema";
import collectionRoutes from "@modules/collection/collection.route";
import { requestSchemas } from "@modules/request/request.schema";
import requestRoutes from "@modules/request/request.route";
import { getError } from "@utils/error";

server.get("/api/status", async () => {
  return {
    data: {
      version,
    },
    success: true,
    message: "Variables fetched successfully.",
  };
});

server.get("/api/todos", async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/todos");
  const data = await res.json();
  return {
    data,
    success: true,
    message: "Todos fetched successfully.",
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

  for (const schema of authSchemas) {
    server.addSchema(schema);
  }

  for (const schema of collectionSchemas) {
    server.addSchema(schema);
  }

  for (const schema of requestSchemas) {
    server.addSchema(schema);
  }

  server.register(swagger, withRefResolver(swaggerOptions));

  server.register(cors, {
    origin: "*",
    methods: ["GET", "PUT", "POST", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  });

  server.register(fastifySwaggerUi, {
    routePrefix: "/doc",
    staticCSP: true,
  });

  server.setErrorHandler(function (error, request, reply) {
    reply.status(500).send(getError(error));
  });

  server.register(userRoutes, { prefix: "/api/users" });
  server.register(authRoutes, { prefix: "/api/auth" });
  server.register(environmentRoutes, { prefix: "/api/environments" });
  server.register(variableRoutes, { prefix: "/api/variables" });
  server.register(collectionRoutes, { prefix: "/api/collections" });
  server.register(requestRoutes, { prefix: "/api/requests" });

  try {
    await server.listen({
      port: Number(process.env.PORT || 3000),
      host: process.env.HOST || "",
    });
  } catch (err) {
    console.error(err);
    server.log.error(err);
  }
}

start();
