import { FastifyReply, FastifyRequest } from "fastify";
import {
  createParameter,
  deleteParameter,
  getAllParameterByRequestId,
  updateParameter,
} from "./parameter.service";
import {
  CreateParameterRequest,
  CreateParameterResponse,
  DeleteParameterRequest,
  DeleteParameterResponse,
  UpdateParameterRequest,
  UpdateParameterParams,
  UpdateParameterResponse,
  ParameterListQuery,
  ParameterListResponse,
} from "./parameter.type";
import { getError } from "@utils/error";

export async function createParameterHandler(
  request: FastifyRequest<{ Body: CreateParameterRequest }>,
  reply: FastifyReply
): Promise<CreateParameterResponse> {
  const body = request.body;
  try {
    const createdParams = await createParameter({
      ...body,
    });

    const response: CreateParameterResponse = {
      data: {
        id: createdParams.id,
        requestId: createdParams.requestId,
        value: createdParams.value,
        key: createdParams.key,
      },
      message: "Parameter created successfully.",
      success: true,
    };

    return reply.code(201).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}

export const deleteParameterHandler = async (
  request: FastifyRequest<{ Params: DeleteParameterRequest }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const Params = await deleteParameter({ id });

    const response: DeleteParameterResponse = {
      data: {
        id: Params.id,
        key: Params.key,
        requestId: Params.requestId,
        value: Params.value,
      },
      message: "Parameter deleted successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const updateParameterHandler = async (
  request: FastifyRequest<{
    Body: UpdateParameterRequest;
    Params: UpdateParameterParams;
  }>,
  reply: FastifyReply
): Promise<UpdateParameterResponse> => {
  const id = request.params.id;
  const body = request.body;
  try {
    const Params = await updateParameter({ id }, body);

    const response: UpdateParameterResponse = {
      data: {
        id: Params.id,
        key: Params.key,
        requestId: Params.requestId,
        value: Params.value,
      },
      message: "Parameter updated successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const getAllParamsetersHandler = async (
  request: FastifyRequest<{ Body: ParameterListQuery }>,
  reply: FastifyReply
): Promise<ParameterListResponse> => {
  const requestId = request.body.requestId;
  try {
    const params = await getAllParameterByRequestId({ requestId });

    const response: ParameterListResponse = {
      data: params.map((param) => ({
        id: param.id,
        key: param.key,
        requestId: param.requestId,
        value: param.value,
      })),
      message: "Parameters fetched successfully.",
      success: true,
    };

    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
