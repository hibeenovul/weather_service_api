import { FastifyInstance } from "fastify";
import { request } from "undici";
import { env } from '../config/env.js';
import { WeatherData, VisualCrossingResponse } from "../types/weatherType.js";

export class WeatherService {
    private redis: FastifyInstance['redis'];

    constructor(redis: FastifyInstance['redis']) {
        this.redis = redis;
    }

    async getWeather(city: string): Promise<WeatherData> {
        const cacheKey = `weather:${city.toLowerCase()}`;
        const cachedData = await this.redis.get(cacheKey);

        if (cachedData) {
            console.log(`Cache Hit for ${city}`);
            return { ...JSON.parse(cachedData), source: 'cache'};
        }

        console.log (` Cache Miss for ${city}. Fetching from API...`);
        const apiUrl = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${env.WEATHER_API_KEY}&contentTypes=json`;

        try {
            const { statusCode, body } = await request(apiUrl);
            if (statusCode !== 200) {
                throw new Error(`API Error: ${statusCode}`);
            }

            const apiResponse = (await body.json()) as VisualCrossingResponse;
            const cleanData: WeatherData = {
                city: apiResponse.address,
                temperature: apiResponse.currentConditions.temp,
                description: apiResponse.currentConditions.conditions,
                humidity: apiResponse.currentConditions.humidity,
                source: 'api',
            };

            await this.redis.set(cacheKey, JSON.stringify(cleanData), 'EX', 43200);
            return cleanData;
        }   catch (error) {
            console.error(error);
            throw new Error('Failed to fetch weather data')
        }
    }    
}