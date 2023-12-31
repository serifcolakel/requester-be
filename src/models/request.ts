import * as z from "zod";
import { Method } from "@prisma/client";
import {
  CompleteCollection,
  RelatedCollectionModel,
  CompleteHeader,
  RelatedHeaderModel,
  CompleteParams,
  RelatedParamsModel,
  CompleteResponse,
  RelatedResponseModel,
} from "./index";

export const RequestModel = z.object({
  id: z.string(),
  name: z.string(),
  method: z.nativeEnum(Method),
  url: z.string(),
  body: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  collectionId: z.string(),
});

export interface CompleteRequest extends z.infer<typeof RequestModel> {
  collection: CompleteCollection;
  headers: CompleteHeader[];
  params: CompleteParams[];
  response: CompleteResponse[];
}

/**
 * RelatedRequestModel contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const RelatedRequestModel: z.ZodSchema<CompleteRequest> = z.lazy(() =>
  RequestModel.extend({
    collection: RelatedCollectionModel,
    headers: RelatedHeaderModel.array(),
    params: RelatedParamsModel.array(),
    response: RelatedResponseModel.array(),
  })
);
