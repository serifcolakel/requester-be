import db from "@lib/db";
import { CreateVariableRequest, UpdateVariableRequest } from "./variable.type";
import { Variable } from "@prisma/client";

export async function createVariable(data: CreateVariableRequest) {
  const variable = await db.variable.create({
    data,
  });

  return variable;
}

export async function deleteVariable(id: Variable["id"]) {
  const variable = await db.variable.delete({
    where: {
      id,
    },
  });

  return variable;
}

export async function updateVariable(
  id: Variable["id"],
  data: UpdateVariableRequest
) {
  const variable = await db.variable.update({
    where: {
      id,
    },
    data,
  });

  return variable;
}

export const getAllVariablesByEnvironmentId = async (
  environmentId: Variable["environmentId"]
) => {
  const variables = await db.variable.findMany({
    where: {
      environmentId,
    },
    orderBy: {
      updatedAt: "desc",
    },
  });

  return variables;
};
