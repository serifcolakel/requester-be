import { UserModel } from "@models";
import { baseResponseSchema } from "@utils/schemas";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const createUserRequest = UserModel.pick({
  email: true,
  name: true,
  password: true,
});

export const createUserResponse = baseResponseSchema(
  UserModel.pick({ name: true, email: true })
);

export const loginRequest = UserModel.pick({ email: true, password: true });

export const loginResponse = baseResponseSchema(
  z.object({
    accessToken: z.string(),
  })
);

export const userListResponse = baseResponseSchema(
  z.array(UserModel.pick({ id: true, name: true, email: true }))
);

export const { schemas: userSchemas, $ref: userSchemasRef } = buildJsonSchemas(
  {
    createUserRequest,
    createUserResponse,
    loginRequest,
    loginResponse,
    userListResponse,
  },
  {
    $id: "UserSchemas",
  }
);
