import { FastifyInstance } from "fastify";
import { WeatherController } from "../controllers/weatherController.js";
import { WeatherService } from "../services/weatherService.js";
import { GetWeatherSchema } from "../schema/weatherSchema.js";

export async function weatherRoutes(app: FastifyInstance) {
    const weatherService = new WeatherService(app.redis);
    const weatherController = new WeatherController(weatherService);

    app.get('/:city',{ schema: GetWeatherSchema }, weatherController.getWeather);
}