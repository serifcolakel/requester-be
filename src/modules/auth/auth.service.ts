import { hashPassword } from "@utils/hash";
import db from "@lib/db";
import { CreateUserRequest } from "./auth.type";

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
