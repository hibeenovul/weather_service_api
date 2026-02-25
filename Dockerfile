# STAGE 1: Build the app
FROM node:18-alpine AS builder

WORKDIR /app

# Copy package files first (to cache dependencies)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . .

# Build TypeScript to JavaScript
# (Ensure you have "build": "tsc" in your package.json scripts!)
RUN npm run build

# STAGE 2: Run the app (Production)
FROM node:18-alpine

WORKDIR /app

# Copy built files from the previous stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.env.example ./

# Install ONLY production dependencies (ignores devDependencies like 'vitest')
RUN npm install --production

# Create a non-root user for security (Good practice!)
USER node

# Expose the port
EXPOSE 3000

# Start the server
CMD ["node", "dist/server.js"]