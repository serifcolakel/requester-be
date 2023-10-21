import server from "./lib/server";
import environmentRoutes from "./modules/environment/environment.route";
import { environmentSchemas } from "./modules/environment/environment.schema";
import userRoutes from "./modules/user/user.route";
import { userSchemas } from "./modules/user/user.schema";

server.get("/api/status", async (request) => {
  const { headers, method, url } = request;
  console.log({
    headers,
    method,
    url,
  });
  return {
    status: "ok",
    message: "Hello World",
  };
});

async function start() {
  server.register(userRoutes, { prefix: "/api/users" });
  server.register(environmentRoutes, { prefix: "/api/environments" });

  for (const schema of userSchemas) {
    server.addSchema(schema);
  }

  for (const schema of environmentSchemas) {
    server.addSchema(schema);
  }

  try {
    await server.listen({
      port: 3000,
      host: "0.0.0.0",
    });
  } catch (err) {
    console.error(err);
    server.log.error(err);
    process.exit(1);
  }
}

start();
