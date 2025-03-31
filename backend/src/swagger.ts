import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const isProd = process.env.NODE_ENV === "production";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prompto API",
      version: "1.0.0",
      description: "Swagger documentation for Prompto project",
    },
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "token",
        },
      },
    },
    security: [
      {
        cookieAuth: [],
      },
    ],
  },
  apis: [
    ...(isProd
      ? ["./dist/docs/**/*.yaml", "./dist/routes/**/*.js"]
      : ["./src/docs/**/*.yaml", "./src/routes/**/*.ts"]),
  ],
};

const swaggerSpec = swaggerJsdoc(options) as {
  paths: Record<string, unknown>;
};

export function setupSwagger(app: Express): void {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
