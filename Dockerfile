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

# Stage 3: Build the React app using the custom tool
FROM node:20-alpine AS build-env
WORKDIR /app
# Copy node_modules from development stage for build tools
COPY --from=development-dependencies-env /app/node_modules ./node_modules
# Copy all source code
COPY . .
# Run the build command defined in package.json
# This command uses 'react-router build'
RUN npm run build

# Stage 4: Create the final production image
FROM node:20-alpine AS production-app
WORKDIR /app
# Copy production node_modules
COPY --from=production-dependencies-env /app/node_modules ./node_modules

# Copy the built server and assets from the build stage
# The 'react-router build' command likely outputs to a 'build' directory.
# We need to copy both the server entry point and any client-side assets.
COPY --from=build-env /app/build ./build

# Expose the port that the react-router-serve uses (default is often 3000 or inferred)
# You might need to find out which port react-router-serve uses, or configure it.
EXPOSE 3000

# Command to run the application using react-router-serve
# This command starts the server to serve the built application.
CMD ["npm", "run", "start"]
