import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import {Express} from 'express';

const isProd = process.env.NODE_ENV === 'production';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Prompto API',
            version: '1.0.0',
            description: 'Swagger documentation for Prompto project',
        },
    },
    apis: isProd ? ['./dist/routes/**/*.js'] : ['./src/routes/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options) as {
    paths: Record<string, unknown>;
};

export function setupSwagger(app: Express): void {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
