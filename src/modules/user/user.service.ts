import db from "../../lib/db";
import { hashPassword } from "../../utils/hash";
import { CreateUserInput } from "./user.schema";

export async function createUser(data: CreateUserInput) {
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
