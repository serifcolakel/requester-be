import { FastifyJWT } from "@fastify/jwt";
import { getError } from "@utils/error";
import { FastifyReply, FastifyRequest } from "fastify";

export const verifyToken = async <TBody extends FastifyJWT, TParams = {}>(
  request: FastifyRequest<{ Body: TBody; Params: TParams }>,
  reply: FastifyReply,
  next: () => void
) => {
  try {
    await request.jwtVerify();
    next();
  } catch (error) {
    return reply
      .status(401)
      .send(getError(new Error("Unauthorized. Please login to continue.")));
  }
};
