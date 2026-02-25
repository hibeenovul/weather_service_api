import fastify from "fastify";
import cors from '@fastify/cors';
import swagger from '@fastify/swagger';
import fastifySwaggerUi from "@fastify/swagger-ui";
import redis from '@fastify/redis';
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { env } from './config/env.js';
import { weatherRoutes } from "./routes/weatherRoutes.js";

const app = fastify({
    logger: {
        transport: {
            target: 'pino-pretty',
            options: {
                translateTime: 'HH:MM:ss Z',
                ignore: 'pid,hostname'
            },
        },
    },
}).withTypeProvider<TypeBoxTypeProvider>();

/*app.register(cors, {
    orgin: '*',
});*/

app.register(swagger, {
    openapi: {
        info: {
            title: 'Professional Weather API',
            description: 'High-performance waether API with Redis caching',
            version: '1.0.0',
        },
        servers: [{ url: `http://${env.HOST}:${env.PORT}`}],
    },
});

app.register(fastifySwaggerUi, {
    routePrefix: '/documentation',
});

app.register(redis, {
    url: env.REDIS_URL,
});

app.register(weatherRoutes, { prefix: '/api/weather' });

app.get('/health', async () => {
    return { status: 'ok', timeStamp: new Date().toISOString() };
});

export { app };