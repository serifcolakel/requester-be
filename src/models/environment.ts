import * as z from "zod"
import { CompleteUser, RelatedUserModel, CompleteVariable, RelatedVariableModel } from "./index"

export const EnvironmentModel = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string(),
})

export interface CompleteEnvironment extends z.infer<typeof EnvironmentModel> {
  user: CompleteUser
  variables: CompleteVariable[]
}

/**
 * RelatedEnvironmentModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedEnvironmentModel: z.ZodSchema<CompleteEnvironment> = z.lazy(() => EnvironmentModel.extend({
  user: RelatedUserModel,
  variables: RelatedVariableModel.array(),
}))
