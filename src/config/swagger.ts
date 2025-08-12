// src/config/swaggerOptions.ts
import dotenv from 'dotenv';
import swaggerJSDoc, { Options } from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

dotenv.config();

const swaggerOptions: Options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Collection Management API Documentation',
            version: '1.0.0',
            description: 'API documentation for your Node.js application',
        },
        servers: [
            {
                url: process.env.SWAGGER_SERVER_URL,
                description: process.env.SWAGGER_SERVER_DESC,
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

export { swaggerUi, swaggerSpec };
