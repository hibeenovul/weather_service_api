import { Type } from '@sinclair/typebox';

export const GetWeatherSchema = {
    description: 'Get weather for a specific city',
    tags: ['Weather'],
    summary: 'Retrieves current weather with caching',

    params: Type.Object({
        city: Type.String({
            description: 'Enter any city name (e.g., London, New York, Tokyo)',
        }),
    }),

    response: {
        200: Type.Object({
            city: Type.String(),
            temperature: Type.Number(),
            description: Type.String(),
            humidity: Type.Number(),
            source: Type.Union([
                Type.Literal('cache'),
                Type.Literal('api')
            ]),
        }),
        500: Type.Object({
            error: Type.String(),
        }),
    },
}; 