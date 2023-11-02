import { FastifyReply, FastifyRequest } from "fastify";
import { User } from "@prisma/client";
import {
  createCollection,
  deleteCollection,
  updateCollection,
  getAllCollectionByUserId,
} from "./collection.service";
import {
  CollectionListResponse,
  CreateCollectionRequest,
  CreateCollectionResponse,
  DeleteCollectionRequest,
  DeleteCollectionResponse,
  UpdateCollectionParams,
  UpdateCollectionRequest,
  UpdateCollectionResponse,
} from "./collection.type";
import { getError } from "@utils/error";

export async function createCollectionHandler(
  request: FastifyRequest<{ Body: CreateCollectionRequest }>,
  reply: FastifyReply
): Promise<CreateCollectionResponse> {
  const body = request.body;
  try {
    const user: User = await request.jwtVerify();
    console.log({ body, user });
    const collection = await createCollection({
      name: body.name,
      userId: user.id,
    });

    const response: CreateCollectionResponse = {
      data: {
        id: collection.id,
        name: collection.name,
      },
      message: "Collection created successfully.",
      success: true,
    };

    return reply.code(201).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
}
export const deleteCollectionHandler = async (
  request: FastifyRequest<{ Params: DeleteCollectionRequest }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const user: User = await request.jwtVerify();
    const collection = await deleteCollection(id, user.id);

    const response: DeleteCollectionResponse = {
      data: {
        id: collection.id,
        name: collection.name,
      },
      message: "Collection deleted successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const updateCollectionHandler = async (
  request: FastifyRequest<{
    Body: UpdateCollectionRequest;
    Params: UpdateCollectionParams;
  }>,
  reply: FastifyReply
) => {
  const id = request.params.id;
  try {
    const user: User = await request.jwtVerify();
    const collection = await updateCollection(id, user.id, request.body);

    const response: UpdateCollectionResponse = {
      data: {
        id: collection.id,
        name: collection.name,
      },
      message: "Collection updated successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};

export const getAllCollections = async (
  request: FastifyRequest,
  reply: FastifyReply
): Promise<CollectionListResponse> => {
  try {
    const user: User = await request.jwtVerify();
    const collections = await getAllCollectionByUserId(user.id);

    const response: CollectionListResponse = {
      data: collections.map((e) => ({
        id: e.id,
        name: e.name,
      })),
      message: "Collections fetched successfully.",
      success: true,
    };

    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
