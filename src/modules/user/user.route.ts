import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { getUsersHandler } from "./user.controller";
import { userSchemasRef } from "./user.schema";
import { verifyToken } from "@middleware/auth";

export default function userRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // get users
  server.get(
    "/get-all",
    {
      preHandler: verifyToken,
      schema: {
        response: {
          200: userSchemasRef("userListResponse"),
        },
        tags: ["User"],
      },
    },
    getUsersHandler
  );
  done();
}
