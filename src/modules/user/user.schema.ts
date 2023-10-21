import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const userCoreSchema = {
  name: z.string().min(3).max(255),
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email(),
};

const createUserSchema = z.object({
  ...userCoreSchema,
  id: z.number().optional(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password is invalid",
  }),
});

const createUserResponseSchema = z.object({
  ...userCoreSchema,
});

const loginSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email is invalid",
    })
    .email(),
  password: z.string({
    required_error: "Password is required",
    invalid_type_error: "Password is invalid",
  }),
});

const loginResponseSchema = z.object({
  accessToken: z.string(),
});

export type LoginInput = z.infer<typeof loginSchema>;

export type CreateUserInput = z.infer<typeof createUserSchema>;

export const { schemas: userSchemas, $ref: userSchemasRef } = buildJsonSchemas(
  {
    createUserSchema,
    createUserResponseSchema,
    loginSchema,
    loginResponseSchema,
  },
  {
    $id: "user",
  }
);
