import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, getUserByEmail, getUsers } from "./user.service";
import { verifyPassword } from "@utils/hash";
import server from "@lib/server";
import {
  CreateUserRequest,
  CreateUserResponse,
  LoginRequest,
  LoginResponse,
  UserListResponse,
} from "./user.type";
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
        .send(getError(new Error("User not found. Please register.")));
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
      },
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}

export const getUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getUsers();
    const response: UserListResponse = {
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
      message: "Users fetched successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
