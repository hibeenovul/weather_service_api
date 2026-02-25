import { FastifyRequest, FastifyReply } from 'fastify';
import { WeatherService } from '../services/weatherService.js';
import { WeatherParams } from '../types/weatherType.js';

export class WeatherController {
    private weatherService: WeatherService;

    constructor(weatherService: WeatherService) {
        this.weatherService = weatherService;
    }

    getWeather = async (
        request: FastifyRequest<{ Params: WeatherParams}>,
        reply: FastifyReply
    ) => {
        const { city } = request.params;

        if (!city) {
            return reply.code(400).send({ error: 'City is required' });
        }

        try {
            const weatherData = await this.weatherService.getWeather(city);
            return reply.code(200).send(weatherData);
        } catch (error) {
            request.log.error(error);
            return reply.code(500).send({ error: 'Failed to retrieve weather data'});
        }
    };
}