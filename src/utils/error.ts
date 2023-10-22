import { PRISMA_REPLACER_VALUE, codes, messages } from "@constants";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

export type TError = {
  message: string;
  data: {
    code: string;
  };
  success: boolean;
};

const getKeyByCode = (code: string): keyof typeof codes =>
  Object.keys(codes).find(
    (key) => codes[key as keyof typeof codes] === code
  ) as keyof typeof codes;

const getErrorReplacer = (error: PrismaClientKnownRequestError): string => {
  const replacer = Array.isArray(error.meta?.target)
    ? error.meta?.target?.join(",") || ""
    : (error.meta?.target as string);
  return replacer;
};

const getErrorPrismaErrorMessage = (
  error: PrismaClientKnownRequestError
): string => {
  const key = getKeyByCode(error.code);
  const replacer = getErrorReplacer(error);

  return messages[key].includes(PRISMA_REPLACER_VALUE)
    ? messages[key].replace(PRISMA_REPLACER_VALUE, replacer)
    : messages[key];
};

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
    message = getErrorPrismaErrorMessage(error);
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
