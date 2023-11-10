import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  createHeaderHandler,
  deleteHeaderHandler,
  getAllHeadersHandler,
  updateHeaderHandler,
} from "./header.controller";
import { headerSchemasRef } from "./header.schema";
import { verifyToken } from "@middleware/auth";
import {
  HeaderListQuery,
  UpdateHeaderParams,
  CreateHeaderRequest,
  DeleteHeaderRequest,
  UpdateHeaderRequest,
} from "./header.type";

export default function headerRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new Header by collectionId
  server.post(
    "/",
    {
      preHandler: verifyToken<CreateHeaderRequest>,
      schema: {
        body: headerSchemasRef("createHeaderRequest"),
        response: {
          201: headerSchemasRef("createHeaderResponse"),
        },
        description: "Create a new Header",
        tags: ["Header"],
      },
    },
    createHeaderHandler
  );

  // delete Header by id
  server.delete(
    "/:id",
    {
      preHandler: verifyToken<{}, DeleteHeaderRequest>,
      schema: {
        response: {
          200: headerSchemasRef("deleteHeaderResponse"),
        },
        description: "Delete Header",
        tags: ["Header"],
      },
    },
    deleteHeaderHandler
  );

  // update Header by id
  server.put(
    "/:id",
    {
      preHandler: verifyToken<UpdateHeaderRequest, UpdateHeaderParams>,
      schema: {
        body: headerSchemasRef("updateHeaderRequest"),
        response: {
          200: headerSchemasRef("updateHeaderResponse"),
        },
        description: "Update Header",
        tags: ["Header"],
      },
    },
    updateHeaderHandler
  );

  // get Headers by collectionId
  server.post(
    "/all",
    {
      preHandler: verifyToken<HeaderListQuery>,
      schema: {
        response: {
          200: headerSchemasRef("headerListResponse"),
        },
        description: "Get all Headers",
        tags: ["Header"],
      },
    },
    getAllHeadersHandler
  );

  done();
}
