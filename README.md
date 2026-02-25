# Fastify Weather API with Redis Caching

![Node.js](https://img.shields.io/badge/Node.js-18.x-green?logo=node.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Fastify](https://img.shields.io/badge/Fastify-Black?logo=fastify)
![Redis](https://img.shields.io/badge/Redis-DC382D?logo=redis)
![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)

> A high-performance, containerized REST API that provides real-time weather data. Built with an integrated Redis caching layer to minimize latency and third-party API costs, ensuring sub-millisecond response times for repeated queries.

---

## 🚀 Key Features

* **Sub-Millisecond Caching:** Implements Redis to cache weather data with a 12-hour TTL, drastically reducing external API calls and response times.
* **High-Performance Core:** Built on **Fastify** and uses **Undici** for native, ultra-fast HTTP requests to external services.
* **Strict Type Safety & Validation:** End-to-end type safety using TypeScript, with **TypeBox** handling strict runtime schema validation for requests and responses.
* **Interactive Documentation:** Auto-generated OpenAPI (Swagger) documentation available directly from the server.
* **Production Ready:** Fully containerized using a multi-stage Docker build for consistent deployment across any environment.
* **Test-Driven:** Business logic is covered by unit tests using **Vitest** with fully mocked external dependencies.

---

## 🛠 Tech Stack

* **Language:** TypeScript / Node.js
* **Framework:** Fastify
* **Database/Cache:** Redis
* **Validation:** TypeBox
* **HTTP Client:** Undici
* **Testing:** Vitest
* **Infrastructure:** Docker & Docker Compose
* **External API:** Visual Crossing Weather API

---

## 💻 Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

* Node.js (v18+)
* npm
* Docker & Docker Compose (to run the Redis instance)

### Local Development Setup

**Clone the repository:**
   ```bash
   git clone [https://github.com/your-username/weather-service-api.git](https://github.com/your-username/weather-service-api.git)

cd 
weather-service-api

Install dependencies:

Bash

npm install

Configure Environment Variables:
Create a .env file in the root directory based on .env.example
Bash cp .env.example .env
Required Variables:Code snippetPORT=3000
HOST=0.0.0.0
NODE_ENV=development
REDIS_URL=redis://localhost:6379
WEATHER_API_KEY=your_visual_crossing_api_key_here
(Get a free API key from Visual Crossing)Start the Redis Cache:Spin up the containerized Redis database in the background:Bashdocker-compose up -d redis_cache

Run the Development Server:Bashnpm run dev

The API will now be running at http://localhost:3000.📡 API DocumentationInteractive Swagger documentation is automatically generated and accessible when the server is running.Swagger UI: http://localhost:3000/documentationCore EndpointMethodEndpointDescriptionPath ParameterGET/api/weather/:cityGet current weather for a specific citycity (string)Example RequestBashcurl -X GET "http://localhost:3000/api/weather/Lagos" \
     -H "Accept: application/json"
Example Response (200 OK)Notice the "source" field, which indicates whether the data came from the external api or the local cache.JSON{
  "city": "Lagos",
  "temperature": 29,
  "description": "Partially cloudy",
  "humidity": 79.1,
  "source": "cache" 
}

🐳 Docker Production BuildTo run the entire stack (Node.js App + Redis) in isolated production containers:Build and start the services:Bashdocker-compose up --build -d

The API is now running natively inside Docker, fully detached from your local Node environment.🧪 TestingThe caching logic and services are thoroughly tested using vitest to ensure external APIs are not called unnecessarily when valid cache data exists.Run the test suite

Bash:

npm run test


