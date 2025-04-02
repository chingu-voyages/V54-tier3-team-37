import fs from "fs";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";
import yaml from "js-yaml";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const isProd = process.env.NODE_ENV === "production";

const docsPath = path.resolve(__dirname, "./docs");
const yamlFiles = fs.readdirSync(docsPath).filter(file => file.endsWith(".yaml"));


let combinedComponents: any = { components: { schemas: {} } };

for (const file of yamlFiles) {
  const filePath = path.join(docsPath, file);
  const content = yaml.load(fs.readFileSync(filePath, "utf8")) as any;

  if (content?.components?.schemas) {
    combinedComponents.components.schemas = {
      ...combinedComponents.components.schemas,
      ...content.components.schemas,
    };
  }
}

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Prompto API",
      version: "1.0.0",
      description: "Swagger documentation for Prompto project",
    },
    components: {
      ...combinedComponents.components,
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
