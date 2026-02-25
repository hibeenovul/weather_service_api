import { app } from './app.js';
import { env } from './config/env.js';

const start = async () => {
    try {
        await app.listen({
            port: env.PORT,
            host: env.HOST
        });

        console.log(`Server listening on http://${env.HOST}:${env.PORT}`);
        console.log(`Documentation available at http://${env.HOST}:${env.PORT}/documentation`);
    } catch (err) {
        app.log.error(err);
        process.exit(1);
    }
};

const closeGracefully = async (signal: string) => {
    console.log(`Received ${signal}. Closing server...`);
    await app.close();
    process.exit(0);
};

process.on('SIGINT', () => closeGracefully('SIGINT'));
process.on('SIGTERM', () => closeGracefully('SIGTERM'));

start();