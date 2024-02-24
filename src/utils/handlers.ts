import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PRISMA_REPLACER_VALUE, codes, messages } from "@constants";

/**
 * @description Get the key from the constants file based on the error code
 * @param code The error code from Prisma
 * @returns The key from the constants file
 */
export const getKeyByCode = (code: string): keyof typeof codes =>
  Object.keys(codes).find(
    (key) => codes[key as keyof typeof codes] === code
  ) as keyof typeof codes;

/**
 * @description Get the replacer value for the error message
 * @param error The error object from Prisma
 * @returns The replacer value for the error message
 */
export const getErrorReplacer = (
  error: PrismaClientKnownRequestError
): string => {
  const replacer = Array.isArray(error.meta?.target)
    ? error.meta?.target?.join(",") || ""
    : (error.meta?.target as string);
  return replacer;
};

/**
 * @description Get the error message from the constants file based on the error code
 * @param error The error object from Prisma
 * @returns The error message from the constants file
 */
export const getPrismaErrorMessage = (
  error: PrismaClientKnownRequestError
): string => {
  const key = getKeyByCode(error.code);
  const replacer = getErrorReplacer(error);

  return messages[key]?.includes(PRISMA_REPLACER_VALUE)
    ? messages[key]?.replace(PRISMA_REPLACER_VALUE, replacer)
    : messages[key];
};
