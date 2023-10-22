import * as z from "zod"
import { CompleteEnvironment, RelatedEnvironmentModel } from "./index"

export const VariableModel = z.object({
  id: z.string(),
  name: z.string(),
  value: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  environmentId: z.string(),
})

export interface CompleteVariable extends z.infer<typeof VariableModel> {
  environment: CompleteEnvironment
}

/**
 * RelatedVariableModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedVariableModel: z.ZodSchema<CompleteVariable> = z.lazy(() => VariableModel.extend({
  environment: RelatedEnvironmentModel,
}))
