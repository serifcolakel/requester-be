import db from "@lib/db";
import { CreateEnvironmentRequest } from "./environment.type";
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
  const environment = await db.environment.delete({
    where: {
      id,
      userId,
    },
    include: {
      variables: true,
    },
  });

  return environment;
}

export async function updateEnvironment(
  id: Environment["id"],
  userId: User["id"],
  data: CreateEnvironmentRequest
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
  });

  return environments;
};
