import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { baseResponseSchema } from "@utils/schemas";
import { HeaderModel, ParamsModel, RequestModel, ResponseModel } from "@models";

export const createRequestBody = RequestModel.pick({
  name: true,
  url: true,
  method: true,
  collectionId: true,
  body: true,
});

export const createRequestResponse = baseResponseSchema(
  RequestModel.pick({
    id: true,
    name: true,
    url: true,
    method: true,
    collectionId: true,
    body: true,
  })
);

export const deleteRequestResponse = baseResponseSchema(
  RequestModel.pick({
    id: true,
    name: true,
    url: true,
    method: true,
    collectionId: true,
  })
);

export const updateRequestBody = RequestModel.pick({
  name: true,
  url: true,
  method: true,
  collectionId: true,
  body: true,
});

export const updateRequestResponse = baseResponseSchema(
  RequestModel.pick({
    id: true,
    name: true,
    url: true,
    method: true,
    collectionId: true,
    body: true,
  })
);

export const requestListQuery = RequestModel.pick({
  collectionId: true,
});

export const requestListResponse = baseResponseSchema(
  z.array(
    RequestModel.pick({
      id: true,
      name: true,
      url: true,
      method: true,
      collectionId: true,
      body: true,
    }).extend({
      params: z.array(
        ParamsModel.pick({
          key: true,
          value: true,
          id: true,
        })
      ),

      header: z.array(
        HeaderModel.pick({
          key: true,
          value: true,
          id: true,
        })
      ),
      response: z.array(
        ResponseModel.pick({
          key: true,
          value: true,
          id: true,
        })
      ),
    })
  )
);

export const { schemas: requestSchemas, $ref: requestSchemasRef } =
  buildJsonSchemas(
    {
      createRequestResponse,
      createRequestBody,
      requestListQuery,
      requestListResponse,
      deleteRequestResponse,
      updateRequestBody,
      updateRequestResponse,
    },
    {
      $id: "RequestSchemas",
    }
  );
