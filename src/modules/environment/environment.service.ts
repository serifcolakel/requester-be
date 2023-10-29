import db from "@lib/db";
import {
  CreateEnvironmentRequest,
  UpdateEnvironmentRequest,
} from "./environment.type";
import { Environment, User } from "@prisma/client";

export async function createEnvironment(data: CreateEnvironmentRequest) {
  const environment = await db.environment.create({
    data,
  });

  return environment;
}

export async function deleteEnvironment(
  id: Environment["id"],
  userId: User["id"]
) {
  const environment = await db.$transaction(async (prisma) => {
    await prisma.variable.deleteMany({
      where: {
        environmentId: id,
      },
    });

    const deletedEnvironment = await prisma.environment.delete({
      where: {
        id,
        userId,
      },
    });

    return deletedEnvironment;
  });

  return environment;
}

export async function updateEnvironment(
  id: Environment["id"],
  userId: User["id"],
  data: UpdateEnvironmentRequest
) {
  const environment = await db.environment.update({
    where: {
      id,
      userId,
    },
    data,
  });

  return environment;
}

export const getAllEnvironmentsByUserId = async (userId: User["id"]) => {
  const environments = await db.environment.findMany({
    where: {
      userId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return environments;
};
