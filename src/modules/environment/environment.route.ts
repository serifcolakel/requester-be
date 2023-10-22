import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  createEnvironmentHandler,
  deleteEnvironmentHandler,
  getAllEnvironments,
} from "./environment.controller";
import {
  CreateEnvironmentRequest,
  environmentSchemasRef,
} from "./environment.schema";
import { verifyToken } from "@middleware/auth";

export default function environmentRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new environment
  server.post(
    "/",
    {
      preHandler: verifyToken<CreateEnvironmentRequest>,
      schema: {
        body: environmentSchemasRef("createEnvironmentRequest"),
        response: {
          201: environmentSchemasRef("environmentResponseSchema"),
        },
      },
    },
    createEnvironmentHandler
  );

  // delete environment
  server.delete(
    "/:id",
    {
      preHandler: verifyToken,
    },
    deleteEnvironmentHandler
  );

  // get environments
  server.get(
    "/",
    {
      preHandler: verifyToken,
      schema: {
        response: {
          200: environmentSchemasRef("environmentListSchema"),
        },
      },
    },
    getAllEnvironments
  );

  done();
}
