import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, getUserByEmail } from "./auth.service";
import { verifyPassword } from "@utils/hash";
import server from "@lib/server";
import {
  CreateUserRequest,
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
} from "./auth.type";
import { getError } from "@utils/error";

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserRequest }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    const response: CreateUserResponse = {
      data: {
        name: user.name,
        email: user.email,
      },
      message: "User created successfully.",
      success: true,
    };

    return reply.code(201).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}

export async function loginHandler(
  request: FastifyRequest<{ Body: LoginRequest }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await getUserByEmail(body.email);

    if (!user) {
      return reply
        .code(404)
        .send(
          getError(new Error("Invalid email or password. Please try again."))
        );
    }

    const isPasswordValid = verifyPassword(
      body.password!,
      user.password,
      user.salt
    );

    if (!isPasswordValid) {
      return reply
        .code(400)
        .send(getError(new Error("Invalid password. Please try again.")));
    }

    const { password, salt, ...rest } = user;

    const response: LoginResponse = {
      message: "Login successful.",
      data: {
        accessToken: server.jwt.sign(rest),
        user: {
          email: user.email,
          name: user.name,
        },
      },
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}
