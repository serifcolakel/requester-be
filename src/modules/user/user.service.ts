import { hashPassword } from "@utils/hash";
import db from "@lib/db";
import { CreateUserRequest } from "./user.type";

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

export async function getUsers() {
  return await db.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
    },
  });
}
