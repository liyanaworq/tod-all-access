import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(); // Important for frontend dev

  // Your test route (optional)
  app.use("/test", (req, res) => {
    res.send("Test route working");
  });

  await app.listen(3000);

  // ✅ Log all registered routes
  const server = app.getHttpAdapter().getInstance();
  const routes: { method: string; path: string }[] = [];

  const router = server._router;
  if (router && router.stack) {
    router.stack.forEach((middleware) => {
      if (middleware.route) {
        const { path } = middleware.route;
        const method = Object.keys(middleware.route.methods)[0].toUpperCase();
        routes.push({ method, path });
      } else if (middleware.name === "router") {
        middleware.handle.stack.forEach((handler) => {
          const route = handler.route;
          if (route) {
            const method = Object.keys(route.methods)[0].toUpperCase();
            routes.push({ method, path: route.path });
          }
        });
      }
    });

    Logger.log("✅ Available Routes:");
    console.table(routes);
  } else {
    Logger.warn(
      "⚠️ No Express router found. Are you using Fastify or missing routes?"
    );
  }

  Logger.log("✅ Available Routes:");
  console.table(routes);
}
bootstrap();
