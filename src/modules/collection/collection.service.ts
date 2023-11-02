import db from "@lib/db";
import {
  CreateCollectionRequest,
  UpdateCollectionRequest,
} from "./collection.type";
import { Collection, User } from "@prisma/client";

export async function createCollection(data: CreateCollectionRequest) {
  const collection = await db.collection.create({
    data,
  });

  return collection;
}

export async function deleteCollection(
  id: Collection["id"],
  userId: User["id"]
) {
  const collection = await db.$transaction(async (prisma) => {
    const collectionRequests = await prisma.collection.findUnique({
      where: {
        id,
      },
      select: {
        requests: true,
      },
    });

    const requestIds = collectionRequests?.requests.map(
      (request) => request.id
    );

    if (!requestIds) {
      throw new Error("Request ids not found");
    }

    await prisma.params.deleteMany({
      where: {
        requestId: {
          in: requestIds,
        },
      },
    });

    await prisma.header.deleteMany({
      where: {
        requestId: {
          in: requestIds,
        },
      },
    });

    await prisma.response.deleteMany({
      where: {
        requestId: {
          in: requestIds,
        },
      },
    });

    const deletedCollection = await prisma.collection.delete({
      where: {
        id,
        userId,
      },
    });

    return deletedCollection;
  });

  return collection;
}

export async function updateCollection(
  id: Collection["id"],
  userId: User["id"],
  data: UpdateCollectionRequest
) {
  console.log({
    id,
    userId,
    data,
  });
  const collection = await db.collection.update({
    where: {
      id,
      userId,
    },
    data,
  });

  return collection;
}

export const getAllCollectionByUserId = async (userId: User["id"]) => {
  const collections = await db.collection.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return collections;
};
