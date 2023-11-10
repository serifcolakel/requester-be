import db from "@lib/db";
import {
  CreateHeaderRequest,
  DeleteHeaderRequest,
  UpdateHeaderRequest,
  UpdateHeaderParams,
  HeaderListQuery,
} from "./header.type";

export async function createHeader(data: CreateHeaderRequest) {
  const header = await db.header.create({
    data,
  });

  return header;
}

export async function deleteHeader({ id }: DeleteHeaderRequest) {
  const header = await db.header.delete({
    where: {
      id,
    },
  });

  return header;
}

export async function updateHeader(
  { id }: UpdateHeaderParams,
  data: UpdateHeaderRequest
) {
  const header = await db.header.update({
    where: {
      id,
    },
    data,
  });

  return header;
}

export const getAllHeadersByRequestId = async ({
  requestId,
}: HeaderListQuery) => {
  const headers = await db.header.findMany({
    where: {
      requestId,
    },
  });

  return headers;
};
