import * as z from "zod"
import { CompleteRequest, RelatedRequestModel } from "./index"

export const QueryModel = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  requestId: z.string(),
})

export interface CompleteQuery extends z.infer<typeof QueryModel> {
  request: CompleteRequest
}

/**
 * RelatedQueryModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedQueryModel: z.ZodSchema<CompleteQuery> = z.lazy(() => QueryModel.extend({
  request: RelatedRequestModel,
}))
