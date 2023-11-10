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
  let code = "Unknown error";
  if (error instanceof PrismaClientKnownRequestError) {
    message = getPrismaErrorMessage(error);
    code = error.code;
  } else if (error instanceof Error) {
    console.log(error);
    message = error.message;
    code = error.hasOwnProperty("code") ? (error as any).code : error.stack;
  }

  return {
    message,
    data: {
      code,
    },
    success: false,
  };
};
