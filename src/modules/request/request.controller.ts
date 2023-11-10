import { FastifyReply, FastifyRequest } from "fastify";
import {
  createRequest,
  deleteRequest,
  getAllRequestsByCollectionId,
  updateRequest,
} from "./request.service";
import {
  CreateRequestBody,
  CreateRequestResponse,
  DeleteRequestRequest,
  DeleteRequestResponse,
  RequestListQuery,
  RequestListResponse,
  UpdateRequestBody,
  UpdateRequestParams,
  UpdateRequestResponse,
} from "./request.type";
import { getError } from "@utils/error";

export async function createRequestHandler(
  request: FastifyRequest<{ Body: CreateRequestBody }>,
  reply: FastifyReply
): Promise<CreateRequestResponse> {
  const body = request.body;
  try {
    const createdRequest = await createRequest({
      ...body,
    });

    const response: CreateRequestResponse = {
      data: {
        id: createdRequest.id,
        name: createdRequest.name,
        collectionId: createdRequest.collectionId,
        method: createdRequest.method,
        url: createdRequest.url,
        body: createdRequest.body,
      },
      message: "Request created successfully.",
      success: true,
    };

    return reply.code(201).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}

export const deleteRequestHandler = async (
  request: FastifyRequest<{ Params: DeleteRequestRequest }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const request = await deleteRequest({ id });

    const response: DeleteRequestResponse = {
      data: {
        id: request.id,
        name: request.name,
        collectionId: request.collectionId,
        method: request.method,
        url: request.url,
      },
      message: "Request deleted successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const updateRequestHandler = async (
  request: FastifyRequest<{
    Body: UpdateRequestBody;
    Params: UpdateRequestParams;
  }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  const body = request.body;
  try {
    const request = await updateRequest({ id }, body);

    const response: UpdateRequestResponse = {
      data: {
        id: request.id,
        name: request.name,
        collectionId: request.collectionId,
        method: request.method,
        url: request.url,
        body: request.body,
      },
      message: "Request updated successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const getAllRequestsHandler = async (
  request: FastifyRequest<{ Body: RequestListQuery }>,
  reply: FastifyReply
): Promise<RequestListResponse> => {
  const collectionId = request.body.collectionId;
  try {
    const requests = await getAllRequestsByCollectionId(collectionId);

    const response: RequestListResponse = {
      data: requests.map((e) => ({
        id: e.id,
        name: e.name,
        collectionId: e.collectionId,
        method: e.method,
        url: e.url,
        body: e.body,
      })),
      message: "Requests fetched successfully.",
      success: true,
    };

    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
