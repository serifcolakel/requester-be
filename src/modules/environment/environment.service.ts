import db from "@lib/db";
import { CreateEnvironmentRequest } from "./environment.schema";

export async function createEnvironment(data: CreateEnvironmentRequest) {
  const environment = await db.environment.create({
    data,
  });

  return environment;
}

export async function getUserByEmail(email: string) {
  return await db.user.findUnique({
    where: {
      email,
    },
  });
}

export async function getUsersHandler() {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
