import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";
import { baseResponseSchema } from "../../utils/schemas";
import { User } from "@prisma/client";

const createEnvironmentRequest = z.object({
  name: z.string().min(1).max(255),
  veriables: z
    .array(
      z.object({
        name: z.string().min(1).max(255),
        value: z.string().min(1).max(255),
      })
    )
    .optional(),
});

export type CreateEnvironmentRequest = z.infer<
  typeof createEnvironmentRequest
> & {
  userId: User["id"];
};

const environmentResponseSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(255),
  userId: z.number().int(),
});

// list response, udpate delete create response

const variableSchema = z.object({
  name: z.string().min(1).max(255),
  value: z.string().min(1).max(255),
  environmentId: z.number().int(),
});

const variableResponseSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1).max(255),
  value: z.string().min(1).max(255),
  environmentId: z.number().int(),
});

const environmentListSchema = baseResponseSchema(
  z.array(environmentResponseSchema)
);

export type GetAllEnvironmentsResponse = z.infer<typeof environmentListSchema>;

const environmentSchema = baseResponseSchema(environmentResponseSchema);

export type TGetSingleEnvironmentsResponse = z.infer<typeof environmentSchema>;

export type EnvironmentResponse = z.infer<typeof environmentResponseSchema>;

export const { schemas: environmentSchemas, $ref: environmentSchemasRef } =
  buildJsonSchemas(
    {
      environmentSchema,
      environmentResponseSchema,
      variableSchema,
      variableResponseSchema,
      environmentListSchema,
      createEnvironmentRequest,
    },
    {
      $id: "environment",
    }
  );
