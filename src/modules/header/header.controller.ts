import { FastifyReply, FastifyRequest } from "fastify";
import {
  createHeader,
  deleteHeader,
  getAllHeadersByRequestId,
  updateHeader,
} from "./header.service";
import {
  CreateHeaderRequest,
  CreateHeaderResponse,
  DeleteHeaderRequest,
  DeleteHeaderResponse,
  HeaderListQuery,
  HeaderListResponse,
  UpdateHeaderParams,
  UpdateHeaderRequest,
  UpdateHeaderResponse,
} from "./header.type";
import { getError } from "@utils/error";

export async function createHeaderHandler(
  request: FastifyRequest<{ Body: CreateHeaderRequest }>,
  reply: FastifyReply
): Promise<CreateHeaderResponse> {
  const body = request.body;
  try {
    const createdHeader = await createHeader({
      ...body,
    });

    const response: CreateHeaderResponse = {
      data: {
        id: createdHeader.id,
        requestId: createdHeader.requestId,
        value: createdHeader.value,
        key: createdHeader.key,
      },
      message: "Header created successfully.",
      success: true,
    };

    return reply.code(201).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}

export const deleteHeaderHandler = async (
  request: FastifyRequest<{ Params: DeleteHeaderRequest }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const header = await deleteHeader({ id });

    const response: DeleteHeaderResponse = {
      data: {
        id: header.id,
        key: header.key,
        requestId: header.requestId,
        value: header.value,
      },
      message: "Header deleted successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const updateHeaderHandler = async (
  request: FastifyRequest<{
    Body: UpdateHeaderRequest;
    Params: UpdateHeaderParams;
  }>,
  reply: FastifyReply
): Promise<UpdateHeaderResponse> => {
  const id = request.params.id;
  const body = request.body;
  try {
    const header = await updateHeader({ id }, body);

    const response: UpdateHeaderResponse = {
      data: {
        id: request.id,
        key: header.key,
        requestId: header.requestId,
        value: header.value,
      },
      message: "Header updated successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const getAllHeadersHandler = async (
  request: FastifyRequest<{ Body: HeaderListQuery }>,
  reply: FastifyReply
): Promise<HeaderListResponse> => {
  const requestId = request.body.requestId;
  try {
    const headers = await getAllHeadersByRequestId({ requestId });

    const response: HeaderListResponse = {
      data: headers.map((header) => ({
        id: header.id,
        key: header.key,
        requestId: header.requestId,
        value: header.value,
      })),
      message: "Headers fetched successfully.",
      success: true,
    };

    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
