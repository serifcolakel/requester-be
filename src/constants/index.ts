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
