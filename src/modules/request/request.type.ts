import { z } from "zod";
import {
  createRequestBody,
  createRequestResponse,
  deleteRequestResponse,
  requestListQuery,
  requestListResponse,
  updateRequestBody,
  updateRequestResponse,
} from "./request.schema";
import { Request } from "@prisma/client";

export type CreateRequestBody = z.infer<typeof createRequestBody>;

export type CreateRequestResponse = z.infer<typeof createRequestResponse>;
export type DeleteRequestRequest = Pick<Request, "id">;

export type DeleteRequestResponse = z.infer<typeof deleteRequestResponse>;

export type UpdateRequestBody = z.infer<typeof updateRequestBody>;

export type UpdateRequestParams = Pick<Request, "id">;

export type UpdateRequestResponse = z.infer<typeof updateRequestResponse>;

export type RequestListQuery = z.infer<typeof requestListQuery>;

export type RequestListResponse = z.infer<typeof requestListResponse>;
