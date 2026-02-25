export interface WeatherData {
    city: string;
    temperature: number;
    description: string;
    humidity: number;
    source: 'cache' | 'api';
}

export interface VisualCrossingResponse {
    address: string;
    currentConditions: {
        temp: number;
        conditions: string;
        humidity: number;
    };
}

export interface WeatherParams {
    city: string;
}