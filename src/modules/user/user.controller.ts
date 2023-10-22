import { FastifyReply, FastifyRequest } from "fastify";
import { createUser, getUserByEmail } from "./user.service";
import { CreateUserRequest, LoginRequest } from "./user.schema";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { verifyPassword } from "@utils/hash";
import server from "@lib/server";

export async function registerUserHandler(
  request: FastifyRequest<{ Body: CreateUserRequest }>,
  reply: FastifyReply
) {
  const body = request.body;

  try {
    const user = await createUser(body);

    return reply.code(201).send(user);
  } catch (error) {
    const err = error as PrismaClientKnownRequestError;
    let message = "";

    if (err.code === "P2002") {
      message = `User with ${
        Array.isArray(err.meta?.target) ? err.meta?.target?.join(",") : ""
      } already exists.`;
    }
    return reply.code(500).send({
      message,
      code: err.code || "Unknown error",
      success: false,
    });
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
      return reply.code(404).send({ message: "User not found" });
    }

    const isPasswordValid = verifyPassword(
      body.password!,
      user.password,
      user.salt
    );

    if (!isPasswordValid) {
      return reply.code(400).send({ message: "Invalid password" });
    }

    const { password, salt, ...rest } = user;

    return {
      accessToken: server.jwt.sign(rest),
    };
  } catch (error) {
    console.error(error);

    return reply.code(500).send(error);
  }
}
