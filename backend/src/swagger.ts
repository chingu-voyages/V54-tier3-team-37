import fs from "fs";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import {Express} from "express";
import yaml from "js-yaml";
import {fileURLToPath} from "url";
import path from "path";

interface SwaggerComponents {
    components: {
        schemas: Record<string, unknown>;
    };
}

// Convert import.meta.url to __dirname for compatibility with file operations
const __filename: string = fileURLToPath(import.meta.url);
const __dirname: string = path.dirname(__filename);

// Determine if the environment is production
const isProd: boolean = process.env.NODE_ENV === "production";

// Path to the folder containing YAML API documentation files
const docsPath: string = path.resolve(__dirname, "./docs");

// Read and filter all .yaml files in the docs directory
const yamlFiles: string[] = fs.readdirSync(docsPath).filter(file => file.endsWith(".yaml"));

// Combine schemas from all YAML files into one object
const combinedComponents: SwaggerComponents = { components: { schemas: {} } };

for (const file of yamlFiles) {
    const filePath = path.join(docsPath, file);
    const content = yaml.load(fs.readFileSync(filePath, "utf8")) as SwaggerComponents | undefined;

    if (content?.components?.schemas) {
        combinedComponents.components.schemas = {
            ...combinedComponents.components.schemas,
            ...content.components.schemas,
        };
    }
}

// Swagger JSDoc options to configure OpenAPI generation
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
    // Define where Swagger JSDoc should look for route and doc files
    apis: [
        ...(isProd
            ? ["./dist/docs/**/*.yaml", "./dist/routes/**/*.js"]
            : ["./src/docs/**/*.yaml", "./src/routes/**/*.ts"]),
    ],
};

// Generate the Swagger specification based on the defined options
const swaggerSpec = swaggerJsdoc(options) as {
    paths: Record<string, unknown>;
};

/**
 * Sets up Swagger UI at the /api-docs endpoint.
 *
 * @param app - The Express application instance
 */
export function setupSwagger(app: Express): void {
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
