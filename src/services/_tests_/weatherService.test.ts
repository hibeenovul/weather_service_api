
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FastifyInstance } from 'fastify';
import { WeatherService } from '../weatherService.js';


const { mockRequest } = vi.hoisted(() => {
  return { mockRequest: vi.fn() };
});


vi.mock('undici', () => ({
  request: mockRequest,
}));


const mockRedis = {
  get: vi.fn(),
  set: vi.fn(),
} as unknown as FastifyInstance['redis'];

describe('WeatherService', () => {
  let weatherService: WeatherService;

  beforeEach(() => {
    vi.clearAllMocks();
    weatherService = new WeatherService(mockRedis);
  });

  it('should return cached data if available (Cache Hit)', async () => {

    const cachedData = JSON.stringify({
      city: 'Lagos',
      temperature: 30,
      description: 'Sunny',
      humidity: 50,
      source: 'api',
    });
    

    vi.mocked(mockRedis.get).mockResolvedValue(cachedData);

    const result = await weatherService.getWeather('Lagos');

    expect(result.source).toBe('cache');
    expect(result.temperature).toBe(30);
    expect(mockRedis.get).toHaveBeenCalledWith('weather:lagos'); 
    expect(mockRequest).not.toHaveBeenCalled();
  });

  it('should fetch from API if cache is empty (Cache Miss)', async () => {
    
    vi.mocked(mockRedis.get).mockResolvedValue(null);

    mockRequest.mockResolvedValue({
      statusCode: 200,
      body: {
        json: async () => ({
          address: 'Lagos',
          currentConditions: {
            temp: 25,
            conditions: 'Rainy',
            humidity: 80,
          },
        }),
      },
    });


    const result = await weatherService.getWeather('Lagos');

    expect(result.source).toBe('api');
    expect(result.temperature).toBe(25);
    expect(mockRequest).toHaveBeenCalled(); 
    expect(mockRedis.set).toHaveBeenCalled(); 
  });
});