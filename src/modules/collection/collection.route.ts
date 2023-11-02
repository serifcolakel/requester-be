import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  createCollectionHandler,
  deleteCollectionHandler,
  getAllCollections,
  updateCollectionHandler,
} from "./collection.controller";
import { collectionSchemasRef } from "./collection.schema";
import { verifyToken } from "@middleware/auth";
import {
  CreateCollectionRequest,
  DeleteCollectionRequest,
  UpdateCollectionRequest,
  UpdateCollectionParams,
} from "./collection.type";

export default function collectionRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new Collection
  server.post(
    "/",
    {
      preHandler: verifyToken<CreateCollectionRequest>,
      schema: {
        body: collectionSchemasRef("createCollectionRequest"),
        response: {
          201: collectionSchemasRef("createCollectionResponse"),
        },
        description: "Create a new Collection",
        tags: ["Collection"],
      },
    },
    createCollectionHandler
  );

  // delete Collection
  server.delete(
    "/:id",
    {
      preHandler: verifyToken<{}, DeleteCollectionRequest>,
      schema: {
        response: {
          200: collectionSchemasRef("deleteCollectionResponse"),
        },
        description: "Delete Collection",
        tags: ["Collection"],
      },
    },
    deleteCollectionHandler
  );

  server.put(
    "/:id",
    {
      preHandler: verifyToken<UpdateCollectionRequest, UpdateCollectionParams>,
      schema: {
        body: collectionSchemasRef("updateCollectionRequest"),
        response: {
          200: collectionSchemasRef("updateCollectionResponse"),
        },
        description: "Update Collection",
        tags: ["Collection"],
      },
    },
    updateCollectionHandler
  );

  // get Collections
  server.get(
    "/",
    {
      preHandler: verifyToken,
      schema: {
        response: {
          200: collectionSchemasRef("collectionListResponse"),
        },
        description: "Get all Collections",
        tags: ["Collection"],
      },
    },
    getAllCollections
  );

  done();
}
