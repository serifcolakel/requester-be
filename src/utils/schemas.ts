import { ZodType, z } from "zod";

export const baseResponseSchema = <TData extends ZodType>(data: TData) =>
  z.object({
    data,
    success: z.boolean(),
    message: z.string(),
    pageSize: z.number().optional(),
    page: z.number().optional(),
    hasNextPage: z.boolean().optional(),
    total: z.number().optional(),
    hasPreviousPage: z.boolean().optional(),
  });
