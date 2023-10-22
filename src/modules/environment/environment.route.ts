import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  createEnvironmentHandler,
  deleteEnvironmentHandler,
  getAllEnvironments,
  updateEnvironmentHandler,
} from "./environment.controller";
import { environmentSchemasRef } from "./environment.schema";
import { verifyToken } from "@middleware/auth";
import {
  CreateEnvironmentRequest,
  DeleteEnvironmentRequest,
  UpdateEnvironmentRequest,
  UpdateEnvironmentParams,
} from "./environment.type";

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
          201: environmentSchemasRef("createEnvironmentResponse"),
        },
        description: "Create a new environment",
        tags: ["Environment"],
      },
    },
    createEnvironmentHandler
  );

  // delete environment
  server.delete(
    "/:id",
    {
      preHandler: verifyToken<{}, DeleteEnvironmentRequest>,
      schema: {
        response: {
          200: environmentSchemasRef("deleteEnvironmentResponse"),
        },
        description: "Delete environment",
        tags: ["Environment"],
      },
    },
    deleteEnvironmentHandler
  );

  server.put(
    "/:id",
    {
      preHandler: verifyToken<
        UpdateEnvironmentRequest,
        UpdateEnvironmentParams
      >,
      schema: {
        body: environmentSchemasRef("updateEnvironmentRequest"),
        response: {
          200: environmentSchemasRef("updateEnvironmentResponse"),
        },
        description: "Update environment",
        tags: ["Environment"],
      },
    },
    updateEnvironmentHandler
  );

  // get environments
  server.get(
    "/",
    {
      preHandler: verifyToken,
      schema: {
        response: {
          200: environmentSchemasRef("environmentListResponse"),
        },
        description: "Get all environments",
        tags: ["Environment"],
      },
    },
    getAllEnvironments
  );

  done();
}
