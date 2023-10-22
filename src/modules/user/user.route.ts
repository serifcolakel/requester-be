import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { loginHandler, registerUserHandler } from "./user.controller";
import { userSchemasRef } from "./user.schema";
import { getUsersHandler } from "./user.service";
import { verifyToken } from "@middleware/auth";

export default function userRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new user
  server.post(
    "/register",
    {
      schema: {
        body: userSchemasRef("createUserRequest"),
        response: {
          201: userSchemasRef("createUserResponse"),
        },
      },
    },
    registerUserHandler
  );

  // login a user
  server.post(
    "/login",
    {
      schema: {
        body: userSchemasRef("loginRequest"),
        response: {
          200: userSchemasRef("loginResponse"),
        },
      },
    },
    loginHandler
  );

  // get users
  server.get(
    "/get-all",
    {
      preHandler: verifyToken,
    },
    getUsersHandler
  );
  done();
}
