import { z } from "zod";
import {
  createVariableRequest,
  createVariableResponse,
  deleteVariableRequest,
  deleteVariableResponse,
  updateVariableRequest,
  updateVariableResponse,
  variableListRequest,
  variableListResponse,
} from "./variable.schema";
import { CompleteEnvironment, CompleteVariable } from "@models";

export type CreateVariableRequest = z.infer<typeof createVariableRequest> & {
  environmentId: CompleteEnvironment["id"];
};

export type CreateVariableResponse = z.infer<typeof createVariableResponse>;

export type DeleteVariableRequest = z.infer<typeof deleteVariableRequest>;

export type DeleteVariableResponse = z.infer<typeof deleteVariableResponse>;

export type UpdateVariableParams = Pick<CompleteVariable, "id">;

export type UpdateVariableRequest = z.infer<typeof updateVariableRequest> & {
  environmentId: CompleteEnvironment["id"];
};

export type UpdateVariableResponse = z.infer<typeof updateVariableResponse>;

export type VariableListRequest = z.infer<typeof variableListRequest>;
export type VariableListResponse = z.infer<typeof variableListResponse>;
