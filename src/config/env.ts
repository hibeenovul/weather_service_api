import 'dotenv-safe/config';
import { Type, Static } from '@sinclair/typebox';
import { TypeCompiler } from '@sinclair/typebox/compiler'

const EnvSchema = Type.Object({
    PORT: Type.Number({ default: 3000 }),
    HOST: Type.String({ default: '0.0.0.0' }),
    NODE_ENV: Type.Union([
        Type.Literal('development'),
        Type.Literal('production'),
        Type.Literal('test'),
    ], { default: 'development' }),
    REDIS_URL: Type.String(),
    WEATHER_API_KEY: Type.String({ minLength: 1 }),
});

export type EnvConfig = Static<typeof EnvSchema>;

const validator = TypeCompiler.Compile(EnvSchema);

const rawConfig = {
    ...process.env,
    PORT: Number(process.env.PORT),
};

const isValid = validator.Check(rawConfig);

if (!isValid) {
    console.error('Invalid environment configuration:');
    console.error(JSON.stringify([...validator.Errors(rawConfig)], null, 2));
    process.exit(1);
}

export const env = rawConfig as EnvConfig;