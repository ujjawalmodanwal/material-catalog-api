# Use official Node.js runtime as parent image
FROM node:22-slim AS base
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Build the application
COPY . .
RUN npm run build

# Use a lighter production image
FROM node:22-slim AS runner
WORKDIR /app
COPY --from=base /app/package*.json ./
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/dist ./dist

# Expose the port
EXPOSE 3000

# Start the application
CMD ["node", "dist/index.js"]
