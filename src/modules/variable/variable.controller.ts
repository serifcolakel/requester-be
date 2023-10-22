import { FastifyReply, FastifyRequest } from "fastify";
import {
  deleteVariable,
  updateVariable,
  createVariable,
  getAllVariablesByEnvironmentId,
} from "./variable.service";
import {
  CreateVariableRequest,
  CreateVariableResponse,
  DeleteVariableRequest,
  DeleteVariableResponse,
  UpdateVariableParams,
  UpdateVariableRequest,
  UpdateVariableResponse,
  VariableListRequest,
  VariableListResponse,
} from "./variable.type";
import { getError } from "@utils/error";

export async function createVariableHandler(
  request: FastifyRequest<{ Body: CreateVariableRequest }>,
  reply: FastifyReply
): Promise<CreateVariableResponse> {
  const body = request.body;
  try {
    const variable = await createVariable({
      ...body,
    });

    const response: CreateVariableResponse = {
      data: variable,
      message: "Variable created successfully.",
      success: true,
    };

    return reply.code(201).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}
export const deleteVariableHandler = async (
  request: FastifyRequest<{ Params: DeleteVariableRequest }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const variable = await deleteVariable(id);

    const response: DeleteVariableResponse = {
      data: variable,
      message: "Variable deleted successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const updateVariableHandler = async (
  request: FastifyRequest<{
    Body: UpdateVariableRequest;
    Params: UpdateVariableParams;
  }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const variable = await updateVariable(id, request.body);

    const response: UpdateVariableResponse = {
      data: variable,
      message: "Variable updated successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const getAllVariablesHandler = async (
  request: FastifyRequest<{ Body: VariableListRequest }>,
  reply: FastifyReply
): Promise<VariableListResponse> => {
  try {
    const environmentId = request.body.environmentId;
    const variables = await getAllVariablesByEnvironmentId(environmentId);

    const response: VariableListResponse = {
      data: variables.map((variable) => ({
        id: variable.id,
        name: variable.name,
        environmentId: variable.environmentId,
        value: variable.value,
      })),
      message: "Variables fetched successfully.",
      success: true,
    };

    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
