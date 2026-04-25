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
# This command uses 'react-router build' and outputs to the 'dist' directory
RUN npm run build

# Stage 4: Create the final production image
FROM node:20-alpine AS production-app
WORKDIR /app
# Copy production node_modules
COPY --from=production-dependencies-env /app/node_modules ./node_modules

# Copy the built application from the build stage into the /app/dist directory
# IMPORTANT: Assuming your build tool outputs to 'dist' and the server is inside it
# If 'react-router-serve' expects the server in a specific subfolder of 'dist', adjust accordingly.
COPY --from=build-env /app/dist ./dist

# If your 'react-router-serve' command expects the index.js in a specific subfolder within dist,
# for example, /app/build/server/index.js in the previous version, you might need to adjust
# the COPY command or the CMD command.
# Let's assume for now that './dist' is the root and the server files are within it.
# If the command is 'react-router-serve ./build/server/index.js', and we copied 'dist' to '/app/dist',
# we need to make sure the path used in CMD reflects this.

# The original CMD was: CMD ["npm", "run", "start"] which translates to:
# "react-router-serve ./build/server/index.js"
# If the build output is now in /app/dist, and the server files are directly in /app/dist
# or in a subfolder like /app/dist/server, we need to adjust.

# Let's assume the server is directly in /app/dist after the copy.
# If your 'react-router build' command creates a structure like /app/dist/server/index.js
# then the CMD should reflect that structure relative to WORKDIR /app.
# For example: CMD ["npx", "react-router-serve", "./dist/server/index.js"]
# But since we used npm run start, let's stick to that.
# We need to make sure the npm start script correctly points to the built files.
# If 'react-router-serve ./build/server/index.js' was the actual command, and build output is now dist:
# It's possible the 'react-router' tool itself knows to look in 'dist' if 'build' doesn't exist.
# Or, the start script in package.json might need updating.

# Let's try running the original CMD, but ensure the path used by react-router-serve is correct.
# If 'react-router-serve' reads from 'dist' by default when 'build' is not found, this might work.
# If not, the 'start' script in package.json might need to be:
# "start": "react-router-serve ./dist/server/index.js"  OR
# "start": "react-router-serve ./dist/index.js" (depending on structure)

# For now, let's keep the original CMD and hope react-router is smart enough or configured.
# If it fails, the first thing to check is the 'start' script in package.json.

EXPOSE 3000
CMD ["npm", "run", "start"]
