# Stage 1: Install development dependencies
FROM node:20-alpine AS development-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Install production dependencies
FROM node:20-alpine AS production-dependencies-env
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev

# Stage 3: Build the React app
FROM node:20-alpine AS build-env
WORKDIR /app
# Copy node_modules from development stage
COPY --from=development-dependencies-env /app/node_modules ./node_modules
# Copy all source code
COPY . .
# Run the build command (outputs to ./build directory)
RUN npm run build

# Stage 4: Create the final production image
FROM node:20-alpine AS production-app
WORKDIR /app

# Copy production node_modules
COPY --from=production-dependencies-env /app/node_modules ./node_modules

# ✅ Copy the built application from the build stage (react-router outputs to 'build')
COPY --from=build-env /app/build ./build

# Copy public assets if any
COPY --from=build-env /app/public ./public

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "run", "start"]