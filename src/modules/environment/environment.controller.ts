import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "@prisma/client";
import {
  createEnvironment,
  deleteEnvironment,
  getAllEnvironmentsByUserId,
  updateEnvironment,
} from "./environment.service";
import {
  CreateEnvironmentRequest,
  CreateEnvironmentResponse,
  DeleteEnvironmentRequest,
  DeleteEnvironmentResponse,
  EnvironmentListResponse,
  UpdateEnvironmentParams,
  UpdateEnvironmentRequest,
} from "./environment.type";
import { getError } from "@utils/error";

export async function createEnvironmentHandler(
  request: FastifyRequest<{ Body: CreateEnvironmentRequest }>,
  reply: FastifyReply
): Promise<CreateEnvironmentResponse> {
  const body = request.body;
  try {
    const user: User = await request.jwtVerify();
    console.log({ body, user });
    const environment = await createEnvironment({
      ...body,
      userId: user.id,
    });

    const response: CreateEnvironmentResponse = {
      data: {
        id: environment.id,
        name: environment.name,
        userId: environment.userId,
      },
      message: "Environment created successfully.",
      success: true,
    };

    return reply.code(201).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}
export const deleteEnvironmentHandler = async (
  request: FastifyRequest<{ Params: DeleteEnvironmentRequest }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const user: User = await request.jwtVerify();
    const environment = await deleteEnvironment(id, user.id);

    const response: DeleteEnvironmentResponse = {
      data: {
        id: environment.id,
        name: environment.name,
        userId: environment.userId,
      },
      message: "Environment deleted successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const updateEnvironmentHandler = async (
  request: FastifyRequest<{
    Body: UpdateEnvironmentRequest;
    Params: UpdateEnvironmentParams;
  }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const user: User = await request.jwtVerify();
    const environment = await updateEnvironment(id, user.id, request.body);

    const response: DeleteEnvironmentResponse = {
      data: {
        id: environment.id,
        name: environment.name,
        userId: environment.userId,
      },
      message: "Environment updated successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const getAllEnvironments = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<EnvironmentListResponse> => {
  try {
    const user: User = await request.jwtVerify();
    const environments = await getAllEnvironmentsByUserId(user.id);

    const response: EnvironmentListResponse = {
      data: environments.map((e) => ({
        id: e.id,
        name: e.name,
      })),
      message: "Environments fetched successfully.",
      success: true,
    };

    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
