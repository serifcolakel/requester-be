import { z } from "zod";
import {
  createEnvironmentRequest,
  createEnvironmentResponse,
  deleteEnvironmentResponse,
  environmentListResponse,
  updateEnvironmentRequest,
} from "./environment.schema";
import { User } from "@prisma/client";
import { CompleteEnvironment } from "@models";

export type CreateEnvironmentRequest = z.infer<
  typeof createEnvironmentRequest
> & {
  userId: User["id"];
};

export type CreateEnvironmentResponse = z.infer<
  typeof createEnvironmentResponse
>;

export type DeleteEnvironmentRequest = Pick<User, "id">;

export type UpdateEnvironmentParams = Pick<CompleteEnvironment, "id">;
export type UpdateEnvironmentRequest = z.infer<
  typeof updateEnvironmentRequest
> & {
  userId: User["id"];
};

export type DeleteEnvironmentResponse = z.infer<
  typeof deleteEnvironmentResponse
>;

export type EnvironmentListResponse = z.infer<typeof environmentListResponse>;
