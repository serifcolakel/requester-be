import { z } from "zod";
import {
  ParameterListQuery,
  ParameterListResponse,
  createParameterRequest,
  createParameterResponse,
  deleteParameterResponse,
  updateParameterRequest,
  updateParameterResponse,
} from "./parameter.schema";
import { Params } from "@prisma/client";

export type CreateParameterRequest = z.infer<typeof createParameterRequest>;

export type CreateParameterResponse = z.infer<typeof createParameterResponse>;

export type DeleteParameterRequest = Pick<Params, "id">;

export type DeleteParameterResponse = z.infer<typeof deleteParameterResponse>;

export type UpdateParameterRequest = z.infer<typeof updateParameterRequest>;

export type UpdateParameterParams = Pick<Params, "id">;

export type UpdateParameterResponse = z.infer<typeof updateParameterResponse>;

export type ParameterListQuery = z.infer<typeof ParameterListQuery>;

export type ParameterListResponse = z.infer<typeof ParameterListResponse>;
