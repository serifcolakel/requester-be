import { FastifyReply, FastifyRequest, RouteHandlerMethod } from "fastify";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { User } from "@prisma/client";
import { createEnvironment } from "./environment.service";
import {
  CreateEnvironmentRequest,
  GetAllEnvironmentsResponse,
} from "./environment.schema";
import db from "@lib/db";

export async function createEnvironmentHandler(
  request: FastifyRequest<{ Body: CreateEnvironmentRequest }>,
  reply: FastifyReply
) {
  const body = request.body as CreateEnvironmentRequest;

  try {
    const user: User = await request.jwtVerify();

    console.log({ body, user });
    const environment = await createEnvironment({
      ...body,
      userId: user.id,
    });

    return reply.code(201).send({
      id: environment.id,
      name: environment.name,
      userId: environment.userId,
    });
  } catch (error) {
    const err = error as PrismaClientKnownRequestError;
    let message = "";

    if (err.code === "P2002") {
      message = `Environment with ${
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
export const deleteEnvironmentHandler: RouteHandlerMethod = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  const { id } = request.params as { id: string };
  console.log(id);
  try {
    // const environment = await deleteEnvironment(id);

    return reply.code(200).send([]);
  } catch (error) {
    const err = error as PrismaClientKnownRequestError;
    let message = "";

    if (err.code === "P2002") {
      message = `Environment with ${
        Array.isArray(err.meta?.target) ? err.meta?.target?.join(",") : ""
      } already exists.`;
    }
    return reply.code(500).send({
      message,
      code: err.code || "Unknown error",
      success: false,
    });
  }
};

export const getAllEnvironments = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const user: User = await request.jwtVerify();
    const env = await db.environment.findMany({
      where: {
        userId: user.id,
      },
    });

    const data: GetAllEnvironmentsResponse = {
      data: env.map((e) => ({
        id: e.id,
        name: e.name,
        userId: e.userId,
      })),
      message: "Success",
      success: true,
    };

    return reply.code(200).send(data);
  } catch (error) {
    const err = error as PrismaClientKnownRequestError;
    let message = "";

    if (err.code === "P2002") {
      message = `Environment with ${
        Array.isArray(err.meta?.target) ? err.meta?.target?.join(",") : ""
      } already exists.`;
    }
    return reply.code(500).send({
      message,
      code: err.code || "Unknown error",
      success: false,
    });
  }
};
