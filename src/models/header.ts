import * as z from "zod";
import { CompleteRequest, RelatedRequestModel } from "./index";

export const HeaderModel = z.object({
  id: z.string(),
  key: z.string(),
  value: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  requestId: z.string(),
});

export interface CompleteHeader extends z.infer<typeof HeaderModel> {
  request: CompleteRequest;
}

/**
 * RelatedHeaderModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedHeaderModel: z.ZodSchema<CompleteHeader> = z.lazy(() =>
  HeaderModel.extend({
    request: RelatedRequestModel,
  })
);
