import * as z from "zod"
import { CompleteRequest, RelatedRequestModel } from "./index"

export const ResponseModel = z.object({
  id: z.string(),
  body: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  requestId: z.string(),
})

export interface CompleteResponse extends z.infer<typeof ResponseModel> {
  request: CompleteRequest
}

/**
 * RelatedResponseModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedResponseModel: z.ZodSchema<CompleteResponse> = z.lazy(() => ResponseModel.extend({
  request: RelatedRequestModel,
}))
