import db from "@lib/db";
import {
  CreateRequestBody,
  DeleteRequestRequest,
  UpdateRequestBody,
  UpdateRequestParams,
} from "./request.type";
import { Request } from "@prisma/client";

export async function createRequest(data: CreateRequestBody) {
  const request = await db.request.create({
    data: {
      name: data.name,
      method: data.method,
      url: data.url,
      collectionId: data.collectionId,
      body: data.body,
    },
  });

  return request;
}

export async function deleteRequest({ id }: DeleteRequestRequest) {
  const request = await db.$transaction(async (prisma) => {
    const requests = await prisma.request.findUnique({
      where: {
        id,
      },
      select: {
        params: true,
        headers: true,
        response: true,
      },
    });

    if (!requests) {
      throw new Error("Request not found");
    }

    const paramsIds = requests.params.map((param) => param.id);
    if (paramsIds.length > 0) {
      await prisma.params.deleteMany({
        where: {
          id: {
            in: paramsIds,
          },
        },
      });
    }
    const headersIds = requests.headers.map((header) => header.id);
    if (headersIds.length > 0) {
      await prisma.header.deleteMany({
        where: {
          id: {
            in: headersIds,
          },
        },
      });
    }
    const responsesIds = requests.response.map((response) => response.id);
    if (responsesIds.length > 0) {
      await prisma.response.deleteMany({
        where: {
          id: {
            in: responsesIds,
          },
        },
      });
    }

    const deletedRequest = await prisma.request.delete({
      where: {
        id,
      },
    });

    return deletedRequest;
  });

  return request;
}

export async function updateRequest(
  { id }: UpdateRequestParams,
  data: UpdateRequestBody
) {
  const request = await db.request.update({
    where: {
      id,
    },
    data,
  });

  return request;
}

export const getAllRequestsByCollectionId = async (
  collectionId: Request["collectionId"]
) => {
  const requests = await db.request.findMany({
    where: {
      collectionId,
    },
    include: {
      params: true,
      headers: true,
      response: true,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return requests;
};
