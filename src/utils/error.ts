import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { getPrismaErrorMessage } from "./handlers";
import { TError } from "./types";

export const getError = (error: unknown): TError => {
  if (!error) {
    return {
      message: "Unknown error",
      data: {
        code: "Unknown error",
      },
      success: false,
    };
  }

  let message = "";
  if (error instanceof PrismaClientKnownRequestError) {
    message = getPrismaErrorMessage(error);
  } else if (error instanceof Error) {
    message = error.message;
  }

  return {
    message,
    data: {
      code:
        error instanceof PrismaClientKnownRequestError
          ? error.code
          : "Unknown error",
    },
    success: false,
  };
};
