import { FastifyReply, FastifyRequest } from "fastify";
import { getUsers } from "./user.service";
import { UserListResponse } from "./user.type";
import { getError } from "@utils/error";

export const getUsersHandler = async (
  request: FastifyRequest,
  reply: FastifyReply
) => {
  try {
    const users = await getUsers();
    const response: UserListResponse = {
      data: users.map((user) => ({
        id: user.id,
        name: user.name,
        email: user.email,
      })),
      message: "Users fetched successfully.",
      success: true,
    };
    return reply.code(200).send(response);
  } catch (error) {
    return reply.code(500).send(getError(error));
  }
};
