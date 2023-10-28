import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteRequest, RelatedRequestModel } from "./index"

export const CollectionModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export interface CompleteCollection extends z.infer<typeof CollectionModel> {
  user: CompleteUser
  requests: CompleteRequest[]
}

/**
 * RelatedCollectionModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedCollectionModel: z.ZodSchema<CompleteCollection> = z.lazy(() => CollectionModel.extend({
  user: RelatedUserModel,
  requests: RelatedRequestModel.array(),
}))
