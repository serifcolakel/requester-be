import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { baseResponseSchema } from "@utils/schemas";
import { CollectionModel } from "@models";

export const createCollectionRequest = CollectionModel.pick({
  name: true,
});

export const createCollectionResponse = baseResponseSchema(
  CollectionModel.pick({
    id: true,
    name: true,
  })
);

export const deleteCollectionResponse = baseResponseSchema(
  CollectionModel.pick({
    id: true,
    name: true,
  })
);

export const updateCollectionRequest = CollectionModel.pick({
  name: true,
});

export const updateCollectionResponse = baseResponseSchema(
  CollectionModel.pick({
    id: true,
    name: true,
  })
);

export const collectionListResponse = baseResponseSchema(
  z.array(
    CollectionModel.pick({
      id: true,
      name: true,
    })
  )
);

export const { schemas: collectionSchemas, $ref: collectionSchemasRef } =
  buildJsonSchemas(
    {
      createCollectionResponse,
      createCollectionRequest,
      collectionListResponse,
      deleteCollectionResponse,
      updateCollectionRequest,
      updateCollectionResponse,
    },
    {
      $id: "CollectionSchemas",
    }
  );
