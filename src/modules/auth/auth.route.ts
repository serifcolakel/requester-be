import { FastifyInstance, RouteShorthandOptions } from "fastify";
import { loginHandler, registerUserHandler } from "./auth.controller";
import { authSchemasRef } from "./auth.schema";

export default function authRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new user
  server.post(
    "/register",
    {
      schema: {
        body: authSchemasRef("createUserRequest"),
        response: {
          201: authSchemasRef("createUserResponse"),
        },
        tags: ["Auth"],
      },
    },
    registerUserHandler
  );

  // login a user
  server.post(
    "/login",
    {
      schema: {
        body: authSchemasRef("loginRequest"),
        response: {
          200: authSchemasRef("loginResponse"),
        },
        tags: ["Auth"],
      },
    },
    loginHandler
  );

  done();
}
