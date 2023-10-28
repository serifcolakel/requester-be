import { UserModel } from "@models";
import { baseResponseSchema } from "@utils/schemas";
import { buildJsonSchemas } from "fastify-zod";
import { z } from "zod";

export const userListResponse = baseResponseSchema(
  z.array(UserModel.pick({ id: true, name: true, email: true }))
);

export const { schemas: userSchemas, $ref: userSchemasRef } = buildJsonSchemas(
  {
    userListResponse,
  },
  {
    $id: "UserSchemas",
  }
);
