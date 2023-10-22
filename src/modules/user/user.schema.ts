import { UserModel } from "@models";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

const createUserRequest = UserModel.pick({
  email: true,
  name: true,
  password: true,
});
const createUserResponse = UserModel.pick({ name: true, email: true });
export type CreateUserRequest = z.infer<typeof createUserRequest>;
export type CreateUserResponse = z.infer<typeof createUserResponse>;

const loginRequest = UserModel.pick({ email: true, password: true });
const loginResponse = z.object({
  accessToken: z.string(),
});
export type LoginRequest = z.infer<typeof loginRequest>;
export type LoginResponse = z.infer<typeof loginResponse>;

export const { schemas: userSchemas, $ref: userSchemasRef } = buildJsonSchemas(
  {
    createUserRequest,
    createUserResponse,
    loginRequest,
    loginResponse,
  },
  {
    $id: "user",
  }
);
