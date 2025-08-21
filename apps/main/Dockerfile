FROM node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy EVERYTHING first - this ensures all package.json files are available
COPY . .

# Install dependencies
RUN pnpm install --strict-peer-dependencies=false

# Build only what's needed for the main app
# This will automatically build dependencies first
RUN pnpm run build --filter=./apps/main

# Production stage
FROM node:20-alpine AS production

RUN npm install -g pnpm

WORKDIR /app

# Copy only the main app
COPY --from=builder /app/apps/main/package.json ./
COPY --from=builder /app/apps/main/.next ./.next
COPY --from=builder /app/apps/main/public ./public
COPY --from=builder /app/apps/main/next.config.js ./

# Copy node_modules (includes all dependencies)
COPY --from=builder /app/node_modules ./node_modules

# Install production dependencies
RUN pnpm install --production --strict-peer-dependencies=false

EXPOSE 3000
CMD ["pnpm", "start"]