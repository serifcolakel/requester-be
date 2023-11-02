import * as z from "zod";
import { CompleteRequest, RelatedRequestModel } from "./index";

export const ParamsModel = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  requestId: z.string(),
});

export interface CompleteParams extends z.infer<typeof ParamsModel> {
  request: CompleteRequest;
}

/**
 * RelatedParamsModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedParamsModel: z.ZodSchema<CompleteParams> = z.lazy(() =>
  ParamsModel.extend({
    request: RelatedRequestModel,
  })
);
