import { z } from "zod";

const schema = {
  type: "object",
  required: ["JWT_SECRET_KEY"],
  properties: {
    JWT_SECRET_KEY: {
      type: "string",
      default: "secret",
    },
  },
};

export const fastifyEnvOptions = {
  confKey: "config",
  schema,
  dotenv: true,
  data: process.env,
};

export const PRISMA_REPLACER_VALUE = "{{PRISMA_REPLACER_VALUE}}";

/**
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference#error-codes
 */
export const codes = {
  // common errors
  authenticationFailed: "P1000",
  cannotReachDatabaseServer: "P1001",
  databaseServerTimedOut: "P1002",
  databaseDoesNotExistAtPath: "P1003",
  operationTimedOut: "P1008",
  databaseAlreadyExists: "P1009",
  databaseUserDeniedAccess: "P1010",
  failedToOpenTLSConnection: "P1011",
  problemWithPrismaSchemaEvaluation: "P1012",
  invalidDatabaseString: "P1013",
  underlyingKindForModelDoesNotExist: "P1014",
  prismaSchemaUsingFeaturesNotSupportedByCurrentDatabaseVersion: "P1015",
  invalidRawQueryParameterCount: "P1016",
  databaseServerClosedTheConnection: "P1017",

  // prisma-client-query-engine errors
  valueExceedsColumnLength: `P2000`,
  whereConditionRecordIsMissing: `P2001`,
  uniqueConstraintFailed: "P2002",
  recordRequiredButNotFound: "P2025",

  // prisma-migrate-migration-engine errors
  databaseCreateFailed: "P3000",

  // prisma-db-pull-introspection-engine errors
  failedToCreatePrisaSchemaFile: "P4000",
  introspectedDatabaseWasEmpty: "P4001",
  inconsistentSchema: "P4002",

  // dataProxy
  dataProxyUnauthorized: "P5007",
} as const;

export const messages: Record<keyof typeof codes, string> = {
  // common errors
  authenticationFailed: "Authentication failed against database server.",
  cannotReachDatabaseServer: "Cannot reach database server.",
  databaseServerTimedOut: "Database server timed out.",
  databaseDoesNotExistAtPath: "Database does not exist at path.",
  operationTimedOut: "Operation timed out.",
  databaseAlreadyExists: "Database already exists.",
  databaseUserDeniedAccess: "Database user denied access.",
  failedToOpenTLSConnection: "Failed to open TLS connection.",
  problemWithPrismaSchemaEvaluation: "Problem with Prisma schema evaluation.",
  invalidDatabaseString: "Invalid database string.",
  underlyingKindForModelDoesNotExist:
    "Underlying kind for model does not exist.",
  prismaSchemaUsingFeaturesNotSupportedByCurrentDatabaseVersion:
    "Prisma schema using features not supported by current database version.",
  invalidRawQueryParameterCount: "Invalid raw query parameter count.",
  databaseServerClosedTheConnection: "Database server closed the connection.",

  // prisma-client-query-engine errors
  valueExceedsColumnLength: `Value exceeds column length.`,
  whereConditionRecordIsMissing: `Where condition record is missing.`,
  uniqueConstraintFailed: `Unique constraint failed on the ${PRISMA_REPLACER_VALUE} constraint.`,
  recordRequiredButNotFound: "Record required but not found.",

  // prisma-migrate-migration-engine errors
  databaseCreateFailed: "Database create failed.",

  // prisma-db-pull-introspection-engine errors
  failedToCreatePrisaSchemaFile: "Failed to create Prisma schema file.",
  introspectedDatabaseWasEmpty: "Introspected database was empty.",
  inconsistentSchema: "Inconsistent schema.",

  // dataProxy
  dataProxyUnauthorized: "Data proxy unauthorized.",
} as const;

/**
 * @see https://www.prisma.io/docs/reference/api-reference/error-reference
 */
export const ErrorCodes = z.nativeEnum(codes);

export type ErrorCodes = z.infer<typeof ErrorCodes>;

export const ErrorMessages = z.nativeEnum(messages);

export type ErrorMessages = z.infer<typeof ErrorMessages>;
