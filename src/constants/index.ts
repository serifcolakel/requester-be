import fastify from "fastify";
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

// Fastify Error mapping
fastify.errorCodes.FST_ERR_BAD_STATUS_CODE;
export const fastifyMessages: Record<keyof typeof fastify.errorCodes, string> =
  {
    FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_ARR:
      "Fastify custom ajv options must be an array",
    FST_ERR_AJV_CUSTOM_OPTIONS_OPT_NOT_OBJ:
      "Fastify custom ajv options must be an object",
    FST_ERR_ASYNC_CONSTRAINT: "Fastify async constraints are not supported",
    FST_ERR_BAD_STATUS_CODE: "Fastify bad status code",
    FST_ERR_BAD_TRAILER_NAME: "Fastify bad trailer name",
    FST_ERR_BAD_TRAILER_VALUE: "Fastify bad trailer value",
    FST_ERR_CTP_ALREADY_PRESENT: "Fastify content type parser already present",
    FST_ERR_CTP_BODY_TOO_LARGE: "Fastify content type parser body too large",
    FST_ERR_CTP_EMPTY_JSON_BODY: "Fastify content type parser empty json body",
    FST_ERR_CTP_EMPTY_TYPE: "Fastify content type parser empty type",
    FST_ERR_CTP_INSTANCE_ALREADY_STARTED:
      "Fastify content type parser instance already started",
    FST_ERR_CTP_INVALID_CONTENT_LENGTH:
      "Fastify content type parser invalid content length",
    FST_ERR_CTP_INVALID_MEDIA_TYPE:
      "Fastify content type parser invalid media type",
    FST_ERR_CTP_INVALID_PARSE_TYPE:
      "Fastify content type parser invalid parse type",
    FST_ERR_CTP_INVALID_TYPE: "Fastify content type parser invalid type",
    FST_ERR_CTP_INVALID_HANDLER: "Fastify content type parser invalid handler",
    FST_ERR_BAD_URL: "Fastify bad url",
    FST_ERR_DEC_AFTER_START:
      "Fastify error decorator must be declared before starting the server",
    FST_ERR_DEC_ALREADY_PRESENT: "Fastify error decorator already present",
    FST_ERR_DEC_DEPENDENCY_INVALID_TYPE:
      "Fastify error decorator dependency invalid type",
    FST_ERR_DEC_MISSING_DEPENDENCY:
      "Fastify error decorator missing dependency",
    FST_ERR_DEFAULT_ROUTE_INVALID_TYPE: "Fastify default route invalid type",
    FST_ERR_DUPLICATED_ROUTE: "Fastify duplicated route",
    FST_ERR_FAILED_ERROR_SERIALIZATION: "Fastify failed error serialization",
    FST_ERR_FORCE_CLOSE_CONNECTIONS_IDLE_NOT_AVAILABLE:
      "Fastify force close connections idle not available",
    FST_ERR_HOOK_INVALID_ASYNC_HANDLER: "Fastify hook invalid async handler",
    FST_ERR_HOOK_INVALID_HANDLER: "Fastify hook invalid handler",
    FST_ERR_HOOK_INVALID_TYPE: "Fastify hook invalid type",
    FST_ERR_HOOK_NOT_SUPPORTED: "Fastify hook not supported",
    FST_ERR_HOOK_TIMEOUT: "Fastify hook timeout",
    FST_ERR_HTTP2_INVALID_VERSION: "Fastify http2 invalid version",
    FST_ERR_INIT_OPTS_INVALID: "Fastify init options invalid",
    FST_ERR_INSTANCE_ALREADY_LISTENING: "Fastify instance already listening",
    FST_ERR_INVALID_URL: "Fastify invalid url",
    FST_ERR_LOG_INVALID_DESTINATION: "Fastify log invalid destination",
    FST_ERR_LOG_INVALID_LOGGER: "Fastify log invalid logger",
    FST_ERR_MISSING_CONTENTTYPE_SERIALIZATION_FN:
      "Fastify missing content type serialization function",
    FST_ERR_MISSING_MIDDLEWARE: "Fastify missing middleware",
    FST_ERR_MISSING_SERIALIZATION_FN: "Fastify missing serialization function",
    FST_ERR_NOT_FOUND: "Fastify not found",
    FST_ERR_OPTIONS_NOT_OBJ: "Fastify options not object",
    FST_ERR_PARENT_PLUGIN_BOOTED: "Fastify parent plugin booted",
    FST_ERR_PLUGIN_CALLBACK_NOT_FN: "Fastify plugin callback not function",
    FST_ERR_PLUGIN_NOT_PRESENT_IN_INSTANCE:
      "Fastify plugin not present in instance",
    FST_ERR_PLUGIN_NOT_VALID: "Fastify plugin not valid",
    FST_ERR_PLUGIN_TIMEOUT: "Fastify plugin timeout",
    FST_ERR_PLUGIN_VERSION_MISMATCH: "Fastify plugin version mismatch",
    FST_ERR_QSP_NOT_FN: "Fastify query string parser not function",
    FST_ERR_REOPENED_CLOSE_SERVER: "Fastify reopened close server",
    FST_ERR_REOPENED_SERVER: "Fastify reopened server",
    FST_ERR_REP_ALREADY_SENT: "Fastify reply already sent",
    FST_ERR_REP_INVALID_PAYLOAD_TYPE: "Fastify reply invalid payload type",
    FST_ERR_REP_SENT_VALUE: "Fastify reply sent value",
    FST_ERR_REQ_INVALID_VALIDATION_INVOCATION:
      "Fastify request invalid validation invocation",
    FST_ERR_ROOT_PLG_BOOTED: "Fastify root plugin booted",
    FST_ERR_ROUTE_BODY_LIMIT_OPTION_NOT_INT:
      "Fastify route body limit option not integer",
    FST_ERR_ROUTE_BODY_VALIDATION_SCHEMA_NOT_SUPPORTED:
      "Fastify route body validation schema not supported",
    FST_ERR_ROUTE_DUPLICATED_HANDLER: "Fastify route duplicated handler",
    FST_ERR_ROUTE_HANDLER_NOT_FN: "Fastify route handler not function",
    FST_ERR_ROUTE_METHOD_INVALID: "Fastify route method invalid",
    FST_ERR_ROUTE_METHOD_NOT_SUPPORTED: "Fastify route method not supported",
    FST_ERR_ROUTE_MISSING_HANDLER: "Fastify route missing handler",
    FST_ERR_ROUTE_OPTIONS_NOT_OBJ: "Fastify route options not object",
    FST_ERR_ROUTE_REWRITE_NOT_STR: "Fastify route rewrite not string",
    FST_ERR_SCH_ALREADY_PRESENT: "Fastify schema already present",
    FST_ERR_SCH_CONTENT_MISSING_SCHEMA: "Fastify schema content missing schema",
    FST_ERR_SCH_DUPLICATE: "Fastify schema duplicate",
    FST_ERR_SCH_MISSING_ID: "Fastify schema missing id",
    FST_ERR_SCH_RESPONSE_SCHEMA_NOT_NESTED_2XX:
      "Fastify schema response schema not nested 2xx",
    FST_ERR_SCH_SERIALIZATION_BUILD: "Fastify schema serialization build",
    FST_ERR_SCH_VALIDATION_BUILD: "Fastify schema validation build",
    FST_ERR_SCHEMA_CONTROLLER_BUCKET_OPT_NOT_FN:
      "Fastify schema controller bucket option not function",
    FST_ERR_SCHEMA_ERROR_FORMATTER_NOT_FN:
      "Fastify schema error formatter not function",
    FST_ERR_SEND_INSIDE_ONERR: "Fastify send inside on error",
    FST_ERR_SEND_UNDEFINED_ERR: "Fastify send undefined error",
    FST_ERR_VALIDATION: "Fastify validation",
    FST_ERR_VERSION_CONSTRAINT_NOT_STR: "Fastify version constraint not string",
  };
