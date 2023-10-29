import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { baseResponseSchema } from "@utils/schemas";
import { EnvironmentModel } from "@models";

export const createEnvironmentRequest = EnvironmentModel.pick({
  name: true,
  veriables: true,
});

export const createEnvironmentResponse = baseResponseSchema(
  EnvironmentModel.pick({
    id: true,
    name: true,
  })
);

export const deleteEnvironmentResponse = baseResponseSchema(
  EnvironmentModel.pick({
    id: true,
    name: true,
  })
);

export const updateEnvironmentRequest = EnvironmentModel.pick({
  name: true,
  veriables: true,
});

export const updateEnvironmentResponse = baseResponseSchema(
  EnvironmentModel.pick({
    id: true,
    name: true,
  })
);

export const environmentListResponse = baseResponseSchema(
  z.array(
    EnvironmentModel.pick({
      id: true,
      name: true,
    })
  )
);

export const { schemas: environmentSchemas, $ref: environmentSchemasRef } =
  buildJsonSchemas(
    {
      createEnvironmentResponse,
      createEnvironmentRequest,
      environmentListResponse,
      deleteEnvironmentResponse,
      updateEnvironmentRequest,
      updateEnvironmentResponse,
    },
    {
      $id: "EnvironmentSchemas",
    }
  );
