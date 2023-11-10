import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  createRequestHandler,
  deleteRequestHandler,
  getAllRequestsHandler,
  updateRequestHandler,
} from "./request.controller";
import { requestSchemasRef } from "./request.schema";
import { verifyToken } from "@middleware/auth";
import {
  CreateRequestBody,
  DeleteRequestRequest,
  UpdateRequestParams,
  UpdateRequestBody,
  RequestListQuery,
} from "./request.type";

export default function requestRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new Request by collectionId
  server.post(
    "/",
    {
      preHandler: verifyToken<CreateRequestBody>,
      schema: {
        body: requestSchemasRef("createRequestBody"),
        response: {
          201: requestSchemasRef("createRequestResponse"),
        },
        description: "Create a new Request",
        tags: ["Request"],
      },
    },
    createRequestHandler
  );

  // delete Request by id
  server.delete(
    "/:id",
    {
      preHandler: verifyToken<{}, DeleteRequestRequest>,
      schema: {
        response: {
          200: requestSchemasRef("deleteRequestResponse"),
        },
        description: "Delete Request",
        tags: ["Request"],
      },
    },
    deleteRequestHandler
  );

  // update Request by id
  server.put(
    "/:id",
    {
      preHandler: verifyToken<UpdateRequestBody, UpdateRequestParams>,
      schema: {
        body: requestSchemasRef("updateRequestBody"),
        response: {
          200: requestSchemasRef("updateRequestResponse"),
        },
        description: "Update Request",
        tags: ["Request"],
      },
    },
    updateRequestHandler
  );

  // get Requests by collectionId
  server.post(
    "/all",
    {
      preHandler: verifyToken<RequestListQuery>,
      schema: {
        response: {
          200: requestSchemasRef("requestListResponse"),
        },
        description: "Get all Requests",
        tags: ["Request"],
      },
    },
    getAllRequestsHandler
  );

  done();
}
