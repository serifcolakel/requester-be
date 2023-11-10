import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { baseResponseSchema } from "@utils/schemas";
import { ParamsModel } from "@models";

export const createParameterRequest = ParamsModel.pick({
  key: true,
  value: true,
  requestId: true,
});

export const createParameterResponse = baseResponseSchema(
  ParamsModel.pick({
    id: true,
    key: true,
    value: true,
    requestId: true,
  })
);

export const deleteParameterResponse = baseResponseSchema(
  ParamsModel.pick({
    id: true,
    key: true,
    value: true,
    requestId: true,
  })
);

export const updateParameterRequest = ParamsModel.pick({
  key: true,
  value: true,
  requestId: true,
});

export const updateParameterResponse = baseResponseSchema(
  ParamsModel.pick({
    id: true,
    key: true,
    value: true,
    requestId: true,
  })
);

export const ParameterListQuery = ParamsModel.pick({
  requestId: true,
});

export const ParameterListResponse = baseResponseSchema(
  z.array(
    ParamsModel.pick({
      id: true,
      key: true,
      value: true,
      requestId: true,
    })
  )
);

export const { schemas: ParamsSchemas, $ref: ParamsSchemasRef } =
  buildJsonSchemas(
    {
      createParameterRequest,
      createParameterResponse,
      deleteParameterResponse,
      updateParameterRequest,
      updateParameterResponse,
      ParameterListQuery,
      ParameterListResponse,
    },
    {
      $id: "ParamsSchemas",
    }
  );
