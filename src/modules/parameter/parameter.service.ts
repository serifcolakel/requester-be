import db from "@lib/db";
import {
  CreateParameterRequest,
  DeleteParameterRequest,
  UpdateParameterRequest,
  ParameterListQuery,
  UpdateParameterParams,
} from "./parameter.type";

export async function createParameter(data: CreateParameterRequest) {
  const parameter = await db.params.create({
    data,
  });

  return parameter;
}

export async function deleteParameter({ id }: DeleteParameterRequest) {
  const Parameter = await db.params.delete({
    where: {
      id,
    },
  });

  return Parameter;
}

export async function updateParameter(
  { id }: UpdateParameterParams,
  data: UpdateParameterRequest
) {
  const Parameter = await db.params.update({
    where: {
      id,
    },
    data,
  });

  return Parameter;
}

export const getAllParameterByRequestId = async ({
  requestId,
}: ParameterListQuery) => {
  const params = await db.params.findMany({
    where: {
      requestId,
    },
  });

  return params;
};
