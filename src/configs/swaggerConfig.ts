import { FastifyDynamicSwaggerOptions } from "@fastify/swagger";
import { version } from "../../package.json";

export const swaggerOptions: FastifyDynamicSwaggerOptions = {
  swagger: {
    info: {
      title: "Requester API",
      description:
        "Building a blazing fast REST API with Node.js, PostgreSQL, Fastify and Swagger",
      version,
    },
    host: "localhost:3000",
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    securityDefinitions: {
      Bearer: {
        type: "apiKey",
        name: "Authorization",
        in: "header",
        description:
          'JWT Authorization header using the Bearer scheme. Example: "Bearer {token}"',
      },
    },
    security: [{ Bearer: [] }],
  },
};
