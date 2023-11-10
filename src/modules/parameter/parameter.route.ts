import { FastifyInstance, RouteShorthandOptions } from "fastify";
import {
  createParameterHandler,
  deleteParameterHandler,
  getAllParamsetersHandler,
  updateParameterHandler,
} from "./parameter.controller";
import { ParamsSchemasRef } from "./parameter.schema";
import { verifyToken } from "@middleware/auth";
import {
  CreateParameterRequest,
  DeleteParameterRequest,
  UpdateParameterRequest,
  ParameterListQuery,
  UpdateParameterParams,
} from "./parameter.type";

export default function paramsRoutes(
  server: FastifyInstance,
  _options: RouteShorthandOptions,
  done: () => void
) {
  // Create a new Params by requestId
  server.post(
    "/",
    {
      preHandler: verifyToken<CreateParameterRequest>,
      schema: {
        body: ParamsSchemasRef("createParameterRequest"),
        response: {
          201: ParamsSchemasRef("createParameterResponse"),
        },
        description: "Create a new Parameter",
        tags: ["Parameter"],
      },
    },
    createParameterHandler
  );

  // delete Params by id
  server.delete(
    "/:id",
    {
      preHandler: verifyToken<{}, DeleteParameterRequest>,
      schema: {
        response: {
          200: ParamsSchemasRef("deleteParameterResponse"),
        },
        description: "Delete Parameter",
        tags: ["Parameter"],
      },
    },
    deleteParameterHandler
  );

  // update Params by id
  server.put(
    "/:id",
    {
      preHandler: verifyToken<UpdateParameterRequest, UpdateParameterParams>,
      schema: {
        body: ParamsSchemasRef("updateParameterRequest"),
        response: {
          200: ParamsSchemasRef("updateParameterResponse"),
        },
        description: "Update Parameter",
        tags: ["Parameter"],
      },
    },
    updateParameterHandler
  );

  // get Params by requestId
  server.post(
    "/all",
    {
      preHandler: verifyToken<ParameterListQuery>,
      schema: {
        response: {
          200: ParamsSchemasRef("ParameterListResponse"),
        },
        description: "Get all Parameters",
        tags: ["Parameter"],
      },
    },
    getAllParamsetersHandler
  );

  done();
}
