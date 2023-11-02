import { z } from "zod";
import {
  createCollectionRequest,
  collectionListResponse,
  createCollectionResponse,
  deleteCollectionResponse,
  updateCollectionRequest,
  updateCollectionResponse,
} from "./collection.schema";
import { Collection } from "@prisma/client";

export type CreateCollectionRequest = z.infer<typeof createCollectionRequest> &
  Pick<Collection, "userId">;

export type CreateCollectionResponse = z.infer<typeof createCollectionResponse>;

export type DeleteCollectionRequest = Pick<Collection, "id">;

export type DeleteCollectionResponse = z.infer<typeof deleteCollectionResponse>;

export type UpdateCollectionParams = Pick<Collection, "id">;

export type UpdateCollectionRequest = z.infer<typeof updateCollectionRequest>;

export type UpdateCollectionResponse = z.infer<typeof updateCollectionResponse>;

export type CollectionListResponse = z.infer<typeof collectionListResponse>;
