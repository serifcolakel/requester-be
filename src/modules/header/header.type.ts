import { z } from "zod";
import {
  createHeaderRequest,
  createHeaderResponse,
  deleteHeaderResponse,
  headerListQuery,
  headerListResponse,
  updateHeaderRequest,
  updateHeaderResponse,
} from "./header.schema";
import { Header } from "@prisma/client";

export type CreateHeaderRequest = z.infer<typeof createHeaderRequest>;

export type CreateHeaderResponse = z.infer<typeof createHeaderResponse>;

export type DeleteHeaderRequest = Pick<Header, "id">;

export type DeleteHeaderResponse = z.infer<typeof deleteHeaderResponse>;

export type UpdateHeaderRequest = z.infer<typeof updateHeaderRequest>;

export type UpdateHeaderParams = Pick<Header, "id">;

export type UpdateHeaderResponse = z.infer<typeof updateHeaderResponse>;

export type HeaderListQuery = z.infer<typeof headerListQuery>;

export type HeaderListResponse = z.infer<typeof headerListResponse>;
