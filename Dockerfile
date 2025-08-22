FROM --platform=linux/amd64 node:20-alpine AS builder

RUN npm install -g pnpm

WORKDIR /app

# Copy package files for better layer caching
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/main/package.json ./apps/main/package.json
# Copy other workspace package.json files if you have dependencies
COPY packages/ ./packages/

RUN pnpm install --frozen-lockfile --strict-peer-dependencies=false

# Copy source code
COPY . .

# Build the application
RUN pnpm run build --filter=./apps/main

# Production stage
FROM --platform=linux/amd64 node:20-alpine AS production

# Install pnpm in production stage
RUN npm install -g pnpm

WORKDIR /app

# Copy ALL necessary workspace files
COPY --from=builder /app/package.json ./
COPY --from=builder /app/pnpm-lock.yaml ./
COPY --from=builder /app/pnpm-workspace.yaml ./
COPY --from=builder /app/apps/main/package.json ./
COPY --from=builder /app/apps/main/.next ./.next
COPY --from=builder /app/apps/main/public ./public
COPY --from=builder /app/apps/main/next.config.mjs ./
# Copy other workspace packages if needed
COPY --from=builder /app/packages/ ./packages/

# Install production dependencies
RUN pnpm install --production --strict-peer-dependencies=false

EXPOSE 3000
CMD ["pnpm", "start"]
