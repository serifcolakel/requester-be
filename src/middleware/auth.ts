import { FastifyReply, FastifyRequest } from "fastify";

export const verifyToken = async <T>(
  request: FastifyRequest<{ Body: T }>,
  reply: FastifyReply,
  next: () => void
) => {
  try {
    await request.jwtVerify();
    next();
  } catch (error) {
    return reply.status(401).send(error);
  }
};
