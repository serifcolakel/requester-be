import * as z from "zod"
import { CompleteEnvironment, RelatedEnvironmentModel, CompleteCollection, RelatedCollectionModel } from "./index"

export const UserModel = z.object({
  id: z.string(),
  email: z.string(),
  name: z.string().nullish(),
  password: z.string(),
  salt: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteUser extends z.infer<typeof UserModel> {
  environments: CompleteEnvironment[]
  Collection: CompleteCollection[]
}

/**
 * RelatedUserModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedUserModel: z.ZodSchema<CompleteUser> = z.lazy(() => UserModel.extend({
  environments: RelatedEnvironmentModel.array(),
  Collection: RelatedCollectionModel.array(),
}))
