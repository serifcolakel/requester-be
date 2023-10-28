import * as z from "zod"
import { CompleteRequest, RelatedRequestModel } from "./index"

export const PreRequestModel = z.object({
  id: z.string(),
  script: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  requestId: z.string(),
})

export interface CompletePreRequest extends z.infer<typeof PreRequestModel> {
  request: CompleteRequest
}

/**
 * RelatedPreRequestModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedPreRequestModel: z.ZodSchema<CompletePreRequest> = z.lazy(() => PreRequestModel.extend({
  request: RelatedRequestModel,
}))
