import { hashPassword } from "@utils/hash";
import { CreateUserRequest } from "./user.schema";
import db from "@lib/db";

export async function createUser(data: CreateUserRequest) {
  const { password, ...rest } = data;

  const { salt, hash } = hashPassword(password);

  const user = await db.user.create({
    data: {
      ...rest,
      password: hash,
      salt,
    },
  });

  return user;
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
