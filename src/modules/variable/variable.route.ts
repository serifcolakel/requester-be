import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  createVariableHandler,
  deleteVariableHandler,
  getAllVariablesHandler,
  updateVariableHandler,
} from "./variable.controller";
import { variableSchemasRef } from "./variable.schema";
import { verifyToken } from "@middleware/auth";
import {
  CreateVariableRequest,
  DeleteVariableRequest,
  UpdateVariableParams,
  UpdateVariableRequest,
  VariableListRequest,
} from "./variable.type";

export default function variableRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new variable
  server.post(
    "/",
    {
      preHandler: verifyToken<CreateVariableRequest>,
      schema: {
        body: variableSchemasRef("createVariableRequest"),
        response: {
          201: variableSchemasRef("createVariableResponse"),
        },
        description: "Create a new variable",
        tags: ["Variable"],
      },
    },
    createVariableHandler
  );

  // delete variable
  server.delete(
    "/:id",
    {
      preHandler: verifyToken<{}, DeleteVariableRequest>,
      schema: {
        response: {
          200: variableSchemasRef("deleteVariableResponse"),
        },
        description: "Delete variable",
        tags: ["Variable"],
      },
    },
    deleteVariableHandler
  );

  server.put(
    "/:id",
    {
      preHandler: verifyToken<UpdateVariableRequest, UpdateVariableParams>,
      schema: {
        body: variableSchemasRef("updateVariableRequest"),
        response: {
          200: variableSchemasRef("updateVariableResponse"),
        },
        description: "Update variable",
        tags: ["Variable"],
      },
    },
    updateVariableHandler
  );

  // get variables
  server.post(
    "/all",
    {
      preHandler: verifyToken<VariableListRequest>,
      schema: {
        body: variableSchemasRef("variableListRequest"),
        response: {
          200: variableSchemasRef("variableListResponse"),
        },
        description: "Get all variable",
        tags: ["Variable"],
      },
    },
    getAllVariablesHandler
  );

  done();
}
