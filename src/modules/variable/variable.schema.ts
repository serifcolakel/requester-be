import { buildJsonSchemas } from "fastify-zod";
import { baseResponseSchema } from "@utils/schemas";
import { VariableModel } from "@models";
import { z } from "zod";

export const createVariableRequest = VariableModel.pick({
  name: true,
  value: true,
  environmentId: true,
});

export const createVariableResponse = baseResponseSchema(
  VariableModel.pick({
    id: true,
    name: true,
    value: true,
    environmentId: true,
  })
);

export const deleteVariableRequest = VariableModel.pick({
  id: true,
});

export const deleteVariableResponse = baseResponseSchema(
  VariableModel.pick({
    id: true,
    name: true,
    value: true,
    environmentId: true,
  })
);

export const updateVariableRequest = VariableModel.pick({
  name: true,
  value: true,
});

export const updateVariableResponse = baseResponseSchema(
  VariableModel.pick({
    id: true,
    name: true,
    value: true,
    environmentId: true,
  })
);

export const variableListRequest = VariableModel.pick({
  environmentId: true,
});

export const variableListResponse = baseResponseSchema(
  z.array(
    VariableModel.pick({
      id: true,
      name: true,
      value: true,
      environmentId: true,
    })
  )
);

export const { schemas: variableSchemas, $ref: variableSchemasRef } =
  buildJsonSchemas(
    {
      createVariableResponse,
      createVariableRequest,
      deleteVariableResponse,
      updateVariableRequest,
      updateVariableResponse,
      variableListRequest,
      variableListResponse,
    },
    {
      $id: "VariableSchemas",
    }
  );
