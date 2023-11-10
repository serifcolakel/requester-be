import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { baseResponseSchema } from "@utils/schemas";
import { HeaderModel } from "@models";

export const createHeaderRequest = HeaderModel.pick({
  key: true,
  value: true,
  requestId: true,
});

export const createHeaderResponse = baseResponseSchema(
  HeaderModel.pick({
    id: true,
    key: true,
    value: true,
    requestId: true,
  })
);

export const deleteHeaderResponse = baseResponseSchema(
  HeaderModel.pick({
    id: true,
    key: true,
    value: true,
    requestId: true,
  })
);

export const updateHeaderRequest = HeaderModel.pick({
  key: true,
  value: true,
  requestId: true,
});

export const updateHeaderResponse = baseResponseSchema(
  HeaderModel.pick({
    id: true,
    key: true,
    value: true,
    requestId: true,
  })
);

export const headerListQuery = HeaderModel.pick({
  requestId: true,
});

export const headerListResponse = baseResponseSchema(
  z.array(
    HeaderModel.pick({
      id: true,
      key: true,
      value: true,
      requestId: true,
    })
  )
);

export const { schemas: headerSchemas, $ref: headerSchemasRef } =
  buildJsonSchemas(
    {
      createHeaderRequest,
      createHeaderResponse,
      deleteHeaderResponse,
      updateHeaderRequest,
      updateHeaderResponse,
      headerListQuery,
      headerListResponse,
    },
    {
      $id: "HeaderSchemas",
    }
  );
